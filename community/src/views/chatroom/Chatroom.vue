<template>


  <div id="app">
    <el-container>
      <el-header>
        <el-button type="primary" @click="startVideo">开始捕获视频信息</el-button>
        <el-button type="danger" @click="stopVideo">停止捕获视频信息</el-button>
        <el-button type="warning" @click="exitRoom">退出</el-button>
      </el-header>

      <el-main>
        <el-row>
          <el-col :span="12">
            <video id="local-video" autoplay style="width: 100%; height: 180px; border: 1px solid black;"></video>
          </el-col>
          <el-col :span="12">
            <video id="remote-video" autoplay style="width: 100%; height: 180px; border: 1px solid black;"></video>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div id="videoBox" style="width: 100%; height: 180px; border: 1px solid black;"></div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-input
                placeholder="请输入消息"
                v-model="messageInput"
                :disabled="!isInRoom"
                @keyup.enter="sendMessage"
            ></el-input>
            <el-button type="primary" :disabled="!isInRoom" @click="sendMessage">发送</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-input placeholder="房间ID" v-model="roomID"></el-input>
          </el-col>
          <el-col :span="12">
            <el-input placeholder="密码" v-model="roomPassword"></el-input>
          </el-col>
          <el-col :span="24">
            <el-button type="success" @click="joinRoom">进入房间</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <div id="receiveBox" class="right-item">{{ chatMessages }}</div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>

  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';

const localVideo = ref(null);
const remoteVideo = ref(null);
const localStream = ref(null);
const socket = ref(null);
const isInRoom = ref(false);
const roomID = ref("");
const roomPassword = ref("");
const messageInput = ref("");
const chatMessages = ref([]);
const user = Math.round(Math.random() * 1000) + "";

const startVideo = () => {
  navigator.mediaDevices.getUserMedia({video: true, audio: true})
      .then((stream) => {
        localStream.value = stream;
        localVideo.value.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
};

const stopVideo = () => {
  if (localStream.value) {
    localStream.value.getTracks().forEach(track => track.stop());
    localVideo.value.srcObject = null;
  }
};

const sendMessage = () => {
  if (isInRoom.value && messageInput.value.trim() !== "") {
    const message = `${user}: ${messageInput.value}`;
    chatMessages.value.push(message);
    messageInput.value = "";
    socket.value.send(JSON.stringify({
      myType: "message",
      roomID: roomID.value,
      messageMsg: message,
      myID: user
    }));
  }
};

const joinRoom = () => {
  if (isInRoom.value) {
    alert("你已经在房间中了");
    return;
  }
  const data = {
    myType: "join",
    roomID: roomID.value,
    password: roomPassword.value,
    myID: user
  };
  socket.value.send(JSON.stringify(data));
};

const exitRoom = () => {
  if (isInRoom.value) {
    const data = {
      myType: "exit",
      roomID: roomID.value,
      myID: user
    };
    socket.value.send(JSON.stringify(data));
    isInRoom.value = false;
  } else {
    alert("你还未加入聊天室");
  }
};

onMounted(() => {
  localVideo.value = document.getElementById("local-video");
  remoteVideo.value = document.getElementById("remote-video");
  socket.value = new WebSocket(`ws://127.0.0.1:8080/RoomServer/${user}`);

  socket.value.onopen = () => {
    console.log("连接到服务器成功");
  };

  socket.value.onmessage = (res) => {
    const evt = JSON.parse(res.data);
    if (evt.myType === "message") {
      chatMessages.value.push(evt.messageMsg);
    }
  };

  socket.value.onclose = () => {
    console.log("与服务器的连接关闭");
  };

  socket.value.onerror = (error) => {
    console.error("WebSocket连接错误:", error);
    alert("WebSocket连接失败，请检查服务器配置。");
  };


})
</script>

<style>


</style>

