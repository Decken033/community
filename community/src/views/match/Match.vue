<template>
  <el-container>

    <el-header class="top">
      <el-button type="primary" @click="startVideo">{{translations.startvideo}}</el-button>
      <el-button type="danger" @click="stopVideo">{{translations.endvideo}}</el-button>
      <el-button type="primary" @click="connect">{{translations.match}}</el-button>
      <el-button type="danger" @click="hangUp">{{translations.stop}}</el-button>
      <el-button type="small" @click="navigateToHome">{{translations.back}}</el-button>
      <div>
        <el-select v-model="selectedLanguage" @change="changeLanguage" placeholder="Select Language" class="selectbar">
          <el-option label="English" value="en"></el-option>
          <el-option label="中文" value="zh"></el-option>
          <el-option label="Español" value="sp"></el-option>
        </el-select>
      </div>
    </el-header>
      <el-main class="mainvideo">
          <video
              id="local-video"
              autoplay

              class="video-item"
              ref="localVideo"
          ></video>
          <video
              id="remote-video"
              autoplay

              class="video-item"
              ref="remoteVideo"
          ></video>

      </el-main>

      <el-footer class="bottom">
        <div class="chatbox">
          <ul class="left-item"></ul>
          <div id="receiveBox" class="right-item" ref="receiveBox"></div>
        </div>

        <div class="messagebox">
          <el-input
              v-model="message"
              :placeholder="translations.enterplease.value"
              :disabled="!isConnected"
              ref="messageInputBox"
              size="large"
              style="width: 300px"
          ></el-input>
          <el-button
              type="success"
              :disabled="!isConnected"
              @click="sendMessage"
              size="large">
            {{translations.send}}
          </el-button>
        </div>

      </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import {ref, onMounted, transformVNodeArgs} from 'vue';
import {ElMessage} from 'element-plus';
import router from "@/router";
// import ParticlesBackground from '@/components/ParticlesBackground.vue';
const navigateToHome = () => {
  router.push('/');
};

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
  navigator.webkitGetUserMedia({video: true, audio: true},
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
  const pc_config = {"iceServers": []};
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






//搜索调用
const searchQuery = ref('');
const search = () => {
  console.log('Search query:', searchQuery.value);
  if (searchQuery.value.trim()) {
    // 使用 router.push 进行路由导航
    router.push({name: 'search', query: {keyword: searchQuery.value}});
  }
};
//多语言支持
import {useCommonTranslations} from '@/lang/i18nhelper';
import {useI18n} from 'vue-i18n';
const translations = useCommonTranslations();
const {t, locale} = useI18n({useScope: "global"});
const selectedLanguage = ref('zh');
const changeLanguage = () => {
  locale.value = selectedLanguage.value
}
</script>

<style scoped>

@import "@/css/views/match.css";
</style>
