<template>
  <div>
    <el-button type="primary" @click="startVideo">开始捕获视频信息</el-button>
    <el-button @click="stopVideo">停止捕获视频信息</el-button>
    <el-button @click="exitRoom">退出</el-button>

    <div>
      <div class="localvideo">
        <video ref="localVideo" autoplay style="width: 400px; height: 300px; border: 1px solid black;"></video>

        <div  class="allmessage">

          <div class="chatbox">
            <ul class="left-item"></ul>
            <div id="receiveBox" class="right-item"></div>
          </div>

          <div class="messagebox">
            <el-input
                v-model="messageInput"
                placeholder="请输入消息"
                :disabled="!isInRoom"
                @keyup.enter="sendMessage"
                style="width: 300px"
            ></el-input>
            <el-button :disabled="!isInRoom" @click="sendMessage">发送</el-button>
          </div>

          <div class="joinRoom">
            <el-input v-model="roomID" placeholder="输入您要加入的聊天室ID" style="width: 200px;"></el-input>
            <el-input v-model="roomPassword" placeholder="请输入房间密码" style="width: 200px;"></el-input>
            <el-button @click="joinRoom">进入房间</el-button>
          </div>

        </div>
      </div>

      <div ref="videoBox" style="width: 400px; height: 300px; border: 1px solid black;"></div>





    </div>




  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { ElMessage } from 'element-plus';

    const user = Math.round(Math.random() * 1000) + "";
    const socket = ref(null);
    const socketRead = ref(false);
    const localStream = ref(null);
    const isInRoom = ref(false);
    const roomID = ref("");
    const roomPassword = ref("");
    const messageInput = ref("");
    const inRoomID = ref(null);
    const peerMap = ref(new Map());
    const peopleList = ref([]);
    const localVideo = ref(null);
    const videoBox = ref(null);

    const pcConfig = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    onMounted(() => {
      setupWebSocket();
    });

    onBeforeUnmount(() => {
      if (socket.value) {
        socket.value.close();
      }
    });

const setupWebSocket = () => {
  try {
    socket.value = new WebSocket("ws://192.168.189.193:8080/community/RoomServer/" + user);

    // 处理连接成功
    socket.value.onopen = () => {
      console.log("连接到服务器成功");
      socketRead.value = true;
    };

    // 处理连接关闭
    socket.value.onclose = (e) => {
      console.log("连接关闭: " + e.code);
      socketRead.value = false;
      stopVideo();
      ElMessage.error("WebSocket 连接关闭，请检查服务器是否正常运行");
    };

    // 处理 WebSocket 消息
    socket.value.onmessage = (res) => {
      const evt = JSON.parse(res.data);
      handleSocketMessage(evt);
    };

    // 处理连接错误
    socket.value.onerror = (error) => {
      console.error("WebSocket 连接错误: ", error);
      ElMessage.error("WebSocket 连接失败，请检查服务器状态");
    };
  } catch (error) {
    console.error("WebSocket 初始化失败: ", error);
    ElMessage.error("WebSocket 初始化失败，请稍后再试");
  }
};


const handleSocketMessage = (evt) => {
      if (evt.myType === "join") {
        if (evt.success === "success") {
          isInRoom.value = true;
          inRoomID.value = evt.roomID;
          peopleList.value = evt.peopleList;

          messageInput.value = ""; // Enable chat input
          peopleList.value.forEach((person) => {
            if (person !== user) {
              sendOffer(person);
            }
          });
        } else {
          ElMessage.error(`加入房间失败: ${evt.successMessage}`);
        }
      } else if (evt.myType === "message" && isInRoom.value) {
        onMessage(evt.messageMsg);
      } else if (evt.myType === 'offer' && isInRoom.value) {
        console.log("接收到offer...");
        setOffer(evt);
        sendAnswer(evt);
      } else if (evt.myType === 'answer' && isInRoom.value) {
        console.log("接收到answer...");
        setAnswer(evt);
      } else if (evt.myType === 'candidate' && isInRoom.value) {
        console.log("接收到ICE候选者...");
        onCandidate(evt);
      } else if(evt.myType === 'exit'){
        console.log("退出房間");
        console.log(evt.myID);
        peerMap.value.delete(getID(user,evt.myID));
        videoBox.value.removeChild(document.getElementById("video-"+getID(user,evt.myID)));
      }

    };


    // onMounted 确保 localVideo 元素已挂载，可以访问
    onMounted(() => {
      if (localVideo.value) {
        console.log("localVideo 元素已挂载，可以使用", localVideo.value);
      } else {
        console.error("localVideo 元素未挂载");
      }
    });


    const startVideo = () => {

      if (!localVideo.value) {
        console.error("localVideo 元素未挂载");
        return;
      }
      // 检查是否支持 mediaDevices 和 getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        ElMessage.error("浏览器不支持摄像头访问，请更新您的浏览器或切换到支持 WebRTC 的浏览器。");
        console.error("浏览器不支持 getUserMedia API");
        return;
      }

      navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            localStream.value = stream;
            localVideo.value.srcObject = stream;
          })
          .catch((err) => {
            console.error("无法访问摄像头，错误信息: ", err);
            // 输出更详细的错误信息
            if (err.name === "NotAllowedError") {
              ElMessage.error("摄像头访问被拒绝，请允许浏览器访问摄像头。");
            } else if (err.name === "NotFoundError") {
              ElMessage.error("未找到摄像头设备。");
            } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
              ElMessage.error("摄像头正在被其他应用程序占用。");
            } else if (err.name === "OverconstrainedError") {
              ElMessage.error(`未找到符合要求的设备：${err.constraint}`);
            } else {
              ElMessage.error(`无法访问摄像头，错误: ${err.name}`);
            }
          });
    };


    const stopVideo = () => {
      if (localStream.value) {
        localStream.value.getTracks().forEach((track) => track.stop());
        localVideo.value.srcObject = null;
      }
    };

const sendMessage = () => {
  if (!isInRoom.value) {
    ElMessage.warning("请先加入房间");
    return;
  }

  // 检查 WebSocket 连接状态
  if (!socket.value || !socketRead.value) {
    ElMessage.error("WebSocket 未连接，无法发送消息");
    return;
  }

  const message = {
    myType: "message",
    roomID: inRoomID.value,
    messageMsg: `${user}: ${messageInput.value}`,
    myID: user,
  };

  // 发送消息
  socket.value.send(JSON.stringify(message));
  messageInput.value = ""; // Clear the input
};


const onMessage = (message) => {
      const receiveBox = document.getElementById("receiveBox");
      const el = document.createElement("p");
      el.textContent = message;
      receiveBox.appendChild(el);
    };

const joinRoom = () => {
  if (isInRoom.value) {
    ElMessage.warning("你已经在房间中了");
    return;
  }

  if (!localStream.value) {
    ElMessage.warning("请先捕获本地视频流");
    return;
  }

  // 检查 WebSocket 是否已连接
  if (!socket.value || !socketRead.value) {
    ElMessage.error("WebSocket 未连接，无法加入房间");
    return;
  }

  const data = {
    myType: "join",
    roomID: roomID.value,
    password: roomPassword.value,
    myID: user,
  };

  // 发送加入房间请求
  socket.value.send(JSON.stringify(data));
};


const exitRoom = () => {
      if (isInRoom.value) {
        const data = {
          myType: "exit",
          roomID: inRoomID.value,
          myID: user,
        };
        socket.value.send(JSON.stringify(data));
        isInRoom.value = false;
        peerMap.value.clear();
        resetRoom();
      } else {
        ElMessage.warning("你还未加入聊天室");
      }
    };

    const sendOffer = (targetID) => {
      const peerConnection = prepareNewConnection(targetID);
      peerConnection.createOffer()
          .then((sessionDescription) => {
            peerConnection.setLocalDescription(sessionDescription);
            const offerMsg = {
              myType: "offer",
              roomID: inRoomID.value,
              myID: user,
              targetID,
              offerMsg: sessionDescription,
            };
            socket.value.send(JSON.stringify(offerMsg));
          })
          .catch((err) => {
            console.log("创建Offer失败", err);
          });
      peerMap.value.set(getID(user, targetID), peerConnection);
    };

    const sendAnswer = (evt) => {
      const peerid = getID(user, evt.myID);
      if (!peerMap.value.has(peerid)) {
        return;
      }
      const peerConnection = peerMap.value.get(peerid);
      peerConnection.createAnswer()
          .then((sessionDescription) => {
            peerConnection.setLocalDescription(sessionDescription);
            const answerMsg = {
              myType: "answer",
              roomID: inRoomID.value,
              myID: user,
              targetID: evt.myID,
              answerMsg: sessionDescription,
            };
            socket.value.send(JSON.stringify(answerMsg));
          })
          .catch((err) => {
            console.log("创建Answer失败", err);
          });
    };

    const onCandidate = (evt) => {
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: evt.sdpMLineIndex,
        sdpMid: evt.sdpMid,
        candidate: evt.candidate,
      });
      const peerid = getID(evt.targetID, evt.myID);
      if (peerMap.value.has(peerid)) {
        peerMap.value.get(peerid).addIceCandidate(candidate);
      }
    };

    const prepareNewConnection = (targetID) => {
      const peerConnection = new RTCPeerConnection(pcConfig);
      peerConnection.onicecandidate = (evt) => {
        if (evt.candidate) {
          const candidateMsg = {
            myType: "candidate",
            myID: user,
            targetID,
            sdpMLineIndex: evt.candidate.sdpMLineIndex,
            sdpMid: evt.candidate.sdpMid,
            candidate: evt.candidate.candidate,
          };
          socket.value.send(JSON.stringify(candidateMsg));
        }
      };
      peerConnection.addStream(localStream.value);
      peerConnection.onaddstream = (event) => {
        const video = document.createElement('video');
        video.autoplay = true;
        video.srcObject = event.stream;
        video.id = "video-" + getID(user, targetID);


        videoBox.value.appendChild(video);



      };
      peerConnection.onremovestream = (event) => {
        videoBox.value.innerHTML = '';
      };
      return peerConnection;
    };

    const setOffer = (evt) => {
      const peerConnection = prepareNewConnection(evt.myID);
      peerConnection.setRemoteDescription(new RTCSessionDescription(evt.offerMsg));
      peerMap.value.set(getID(evt.targetID, evt.myID), peerConnection);
    };

    const setAnswer = (evt) => {
      const peerid = getID(evt.targetID, evt.myID);
      if (peerMap.value.has(peerid)) {
        peerMap.value.get(peerid).setRemoteDescription(new RTCSessionDescription(evt.answerMsg));
      }
    };

    const getID = (ID1, ID2) => `${ID1}-${ID2}`;

    const resetRoom = () => {
      document.getElementById("receiveBox").innerHTML = '';
      videoBox.value.innerHTML = '';
    };

</script>

<style>

.localvideo{
  width: 100%;
  height: 300px;

}


.chatbox {
  margin-top: 10px;

}

.messagebox {
  //margin-top: 20px;
  margin-bottom: 10px;
  justify-content: space-between;
}

.joinRoom {
  //margin-top: 20px;
  justify-content: space-between;
}

.allmessage{
  justify-content: space-between;
  margin-left: 800px;
  margin-top:10px;
}


.videoBox{
  display:grid;
  grid-tempate-columns:repeat(auto-fill,minmax(240px,1fr));
  grid-gap:10px;
  justify-content: center;
}
</style>
