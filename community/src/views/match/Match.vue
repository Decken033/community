<template>
  <div>

    <div class="top">
      <el-button type="primary" @click="startVideo">开始捕获视频信息</el-button>
      <el-button type="danger" @click="stopVideo">停止捕获视频信息</el-button>
      <el-button type="primary" @click="connect">建立连接</el-button>
      <el-button type="danger" @click="hangUp">挂断</el-button>
    </div>

    <br />
    <div>
      <el-main class="mainvideo">
        <video
            id="local-video"
            autoplay
            style="width: 500px; height: 350px; border: 1px solid black"
            ref="localVideo"
        ></video>
        <video
            id="remote-video"
            autoplay
            style="width: 500px; height: 350px; border: 1px solid black"
            ref="remoteVideo"
        ></video>
      </el-main>

      <div class="bottom">
        <div class="chatbox">
          <ul class="left-item"></ul>
          <div id="receiveBox" class="right-item" ref="receiveBox"></div>
        </div>

        <div class="messagebox">
          <el-input
              v-model="message"
              placeholder="请输入消息"
              :disabled="!isConnected"
              ref="messageInputBox"
              size="large"
              style="width: 300px"
          ></el-input>
          <el-button
              type="success"
              :disabled="!isConnected"
              @click="sendMessage"
              size="large"
          >
            发送
          </el-button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

export default {
  setup() {
    const localVideo = ref(null);
    const remoteVideo = ref(null);
    const receiveBox = ref(null);
    const messageInputBox = ref(null);
    const message = ref('');
    const socket = ref(null);
    let localStream = null;
    let peerConnection = null;
    let sendChannel = null;
    let peerStarted = false;
    let hasTarget = false;
    let isConnected = ref(false);

    const mediaConstraints = {
      'mandatory': {
        'OfferToReceiveAudio': false,
        'OfferToReceiveVideo': true
      }
    };

    const user = Math.round(Math.random() * 1000) + "";

    onMounted(() => {
      socket.value = new WebSocket("ws://127.0.0.1:8080/msgServer/" + user);
      socket.value.onopen = () => {
        console.log("成功连接到服务器...");
        isConnected.value = true;
      };

      socket.value.onclose = (e) => {
        console.log('与服务器连接关闭: ' + e.code);
        isConnected.value = false;
      };

      socket.value.onmessage = (res) => {
        const evt = JSON.parse(res.data);
        if (evt.type === 'offer' && peerStarted) {
          peerConnection = null;
          onOffer(evt);
        } else if (evt.type === 'answer' && peerStarted) {
          onAnswer(evt);
        } else if (evt.type === 'candidate' && peerStarted) {
          onCandidate(evt);
        } else if (evt.type === 'bye' && peerStarted) {
          stop();
        }
      };
    });

    const startVideo = () => {
      navigator.webkitGetUserMedia({ video: true, audio: true },
          (stream) => {
            localStream = stream;
            localVideo.value.srcObject = stream;
            localVideo.value.play();
            localVideo.value.volume = 0.2;
          },
          (error) => {
            console.error('发生了一个错误: [错误代码：' + error.code + ']');
            ElMessage.error('发生了一个错误: ' + error.message);
          }
      );
    };

    const stopVideo = () => {
      localVideo.value.srcObject = null;
      localStream.getTracks().forEach(track => track.stop());
    };

    const prepareNewConnection = () => {
      const pc_config = { "iceServers": [] };
      let peer = null;
      try {
        peer = new webkitRTCPeerConnection(pc_config);
      } catch (e) {
        console.log("建立连接失败，错误：" + e.message);
        return null;
      }

      peer.onicecandidate = (evt) => {
        if (evt.candidate) {
          sendCandidate({
            type: "candidate",
            sdpMLineIndex: evt.candidate.sdpMLineIndex,
            sdpMid: evt.candidate.sdpMid,
            candidate: evt.candidate.candidate
          });
        }
      };

      peer.addStream(localStream);

      peer.addEventListener("addstream", onRemoteStreamAdded, false);
      peer.addEventListener("removestream", onRemoteStreamRemoved, false);

      sendChannel = peer.createDataChannel("sendChannel");
      sendChannel.onopen = () => {
        messageInputBox.value.disabled = false;
        messageInputBox.value.focus();
      };
      sendChannel.onclose = disconnectPeers;
      sendChannel.onerror = console.error;

      peer.ondatachannel = (event) => {
        const receiveChannel = event.channel;
        receiveChannel.onmessage = (event) => {
          const el = document.createElement("p");
          const txtNode = document.createTextNode(event.data);
          el.appendChild(txtNode);
          receiveBox.value.appendChild(el);
        };
        receiveChannel.onclose = disconnectPeers;
        receiveChannel.onerror = console.error;
      };

      return peer;
    };

    const sendOffer = () => {
      console.log("sendOffer");
      peerConnection = prepareNewConnection();
      peerConnection.createOffer(
          (sessionDescription) => {
            peerConnection.setLocalDescription(sessionDescription);
            sendSDP(sessionDescription);
          },
          () => console.log("创建Offer失败"),
          mediaConstraints
      );
    };

    const onOffer = (evt) => {
      console.log("onoffer");
      if (peerConnection) {
        console.error('peerConnection已存在!');
        return;
      }
      peerConnection = prepareNewConnection();
      peerConnection.setRemoteDescription(new RTCSessionDescription(evt));
      sendAnswer(evt);
      hasTarget = true;
    };

    const sendAnswer = (evt) => {
      console.log("sendanswer");
      peerConnection.createAnswer(
          (sessionDescription) => {
            peerConnection.setLocalDescription(sessionDescription);
            sendSDP(sessionDescription);
          },
          () => console.log("创建Answer失败"),
          mediaConstraints
      );
    };

    const onAnswer = (evt) => {
      peerConnection.setRemoteDescription(new RTCSessionDescription(evt));
    };

    const onCandidate = (evt) => {
      console.log("oncandidate");
      const candidate = new RTCIceCandidate({
        sdpMLineIndex: evt.sdpMLineIndex,
        sdpMid: evt.sdpMid,
        candidate: evt.candidate
      });
      peerConnection.addIceCandidate(candidate);
    };

    const sendSDP = (sdp) => {
      const text = JSON.stringify(sdp);
      console.log("sendsdp" + text);
      socket.value.send(text);
    };

    const sendCandidate = (candidate) => {
      console.log("sendcandidate");
      const text = JSON.stringify(candidate);
      socket.value.send(text);
    };

    const onRemoteStreamAdded = (event) => {
      remoteVideo.value.srcObject = event.stream;
    };

    const onRemoteStreamRemoved = () => {
      remoteVideo.value.srcObject = null;
    };

    const connect = () => {
      if (hasTarget) {
        alert("已经建立连接.");
        return;
      }
      if (localStream && isConnected.value) {
        socket.value.send("准备连接");
        peerStarted = true;
        sendOffer();
      } else if (!localStream) {
        alert("请首先捕获本地视频数据.");
      } else {
        console.log(isConnected.value);
        alert("未连接到服务器");
      }
    };

    const hangUp = () => {
      stop();
    };

    const stop = () => {
      socket.value.send("退出连接");
      peerConnection.close();
      peerConnection = null;
      peerStarted = false;
      hasTarget = false;
    };

    const sendMessage = () => {
      const messageContent = user + ": " + message.value;
      sendChannel.send(messageContent);
      const el = document.createElement("p");
      const txtNode = document.createTextNode(messageContent);
      el.appendChild(txtNode);
      receiveBox.value.appendChild(el);
      message.value = "";
    };

    const disconnectPeers = () => {
      if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
        peerStarted = false;
      }
    };

    return {
      localVideo,
      remoteVideo,
      receiveBox,
      messageInputBox,
      message,
      startVideo,
      stopVideo,
      connect,
      hangUp,
      sendMessage,
      isConnected
    };
  }
};
</script>

<style scoped>

.mainvideo{
  display: flex;
  justify-content: center;
  align-items: center;
}

.top{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.bottom{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}


.chatbox {
  margin-top: 10px;
}

.messagebox {
  margin-top: 10px;
}

.left-item,
.right-item {
  list-style: none;
  padding: 0;
}

.left-item li,
.right-item li {
  padding: 5px 0;
}

.buttonright {
  margin-left: 10px;
}
</style>
