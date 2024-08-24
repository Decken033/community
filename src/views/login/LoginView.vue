<template>
  <div>

  </div>

  <el-container>
    <!-- 头部 -->

    <!-- 侧边栏 -->
    <el-aside >
      <div>
        <!-- <canvas></canvas> -->
        <!-- <h3>ParticleSidebar</h3>
        <h3>ParticleSidebar</h3>
        <h3>ParticleSidebar</h3>
        <h3>ParticleSidebar</h3>
        <ParticleSidebar /> -->
        <component :is="ParticleSidebar" />
      </div>
    </el-aside>

    <!-- 内容 -->
    <el-main>
      <div class="container pl-5 pr-5 pt-3 pb-3 mt-3 mb-3">
        <h3 class="text-center text-info border-bottom pb-3">登录</h3>
        <el-form :model="form" :rules="rules" ref="loginForm" label-width="100px" >
          <el-form-item label="账号" prop="username">
            <el-input v-model="form.username" placeholder="请输入您的账号"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" placeholder="请输入您的密码"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row :gutter="20">
              <el-col :span="14">
                <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="10">
                <img :src="kaptchaSrc" id="kaptcha" style="width: 250px; height: 40px;" />
                <a href="javascript:void(0);" @click="refreshKaptcha">刷新验证码</a>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
            <a href="forget.html" class="text-danger float-right">忘记密码?</a>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { useCommonTranslations } from '@/lang/i18nhelper';

import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
// import ParticleSidebar from '@/codepen/ParticleSidebar.vue';
import { defineAsyncComponent } from 'vue';



export default {
  setup() {

    // 定义异步组件particlesidebar
    const isLoaded = ref(false);
    const ParticleSidebar = defineAsyncComponent(() =>
      import('@/codepen/ParticleSidebar.vue').then((component) => {
        isLoaded.value = true;
        return component;
      })
    );

    const form = ref({
      username: '',
      password: '',
      code: '',
      rememberMe: false,
    });

    const kaptchaSrc = ref('/kaptcha');
    const translations = useCommonTranslations();

    const { t, locale } = useI18n({ useScope: "global" });
    const selectedLanguage = ref('zh');
    const changeLanguage = () => {
      locale.value = selectedLanguage.value;
    };

    const rules = {
      username: [
        { required: true, message: t('message.enterUsername'), trigger: 'blur' },
      ],
      password: [
        { required: true, message: t('message.enterPassword'), trigger: 'blur' },
        { min: 8, message: t('message.passwordLength'), trigger: 'blur' },
      ],
      code: [
        { required: true, message: t('message.enterCode'), trigger: 'blur' },
      ],
    };


    const loginForm = ref(null);

    const refreshKaptcha = () => {
      kaptchaSrc.value = `/kaptcha?${new Date().getTime()}`;
    };

    const handleSubmit = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          postData();
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    };

    const postData = () => {
      axios
        .post('/login', form.value)
        .then((response) => {
          console.log("登录成功");
          ElMessage.success(t('message.loginSuccess'));
        })
        .catch((error) => {
          console.error('登录失败:', error);
          ElMessage.error(t('message.loginFailed'));
        });
    };

    return {
      form,
      rules,
      kaptchaSrc,
      loginForm,
      refreshKaptcha,
      handleSubmit,
      translations,
      selectedLanguage,
      changeLanguage,

      ParticleSidebar,
    };
  },
};
// ....................................................................................................................................................

// const canvas = ref(null);


// onMounted(() => {
//   const gl = canvas.value.getContext('webgl');

//   if (gl) {
//     canvas.value.width = window.innerWidth;
//     canvas.value.height = window.innerHeight;
//     gl.viewport(0, 0, canvas.value.width, canvas.value.height);

//     // 你现有的 WebGL 初始化和动画代码都放在这里
//     const vertexShaderSource = `
//       attribute vec2 a_position;
//       attribute float a_hue;
//       attribute float a_saturation;
//       varying float v_hue;
//       varying float v_saturation;
//       void main() {
//           gl_PointSize = 2.0;
//           gl_Position = vec4(a_position, 0.0, 1.0);
//           v_hue = a_hue;
//           v_saturation = a_saturation;
//       }
//     `;

//     // 剩下的 WebGL 初始化代码
//     // ...
//     // Configurable parameters
// const config = {
//   particleCount: 5000,
//   textArray: ["Design.", "Code.", "Coffee."],
//   mouseRadius: 0.1,
//   particleSize: 2,
//   forceMultiplier: 0.001,
//   returnSpeed: 0.005,
//   velocityDamping: 0.95,
//   colorMultiplier: 40000,
//   saturationMultiplier: 1000,
//   textChangeInterval: 10000,
//   rotationForceMultiplier: 0.5
// };

// let currentTextIndex = 0;
// let nextTextTimeout;
// let textCoordinates = [];

// const mouse = {
//   x: -500,
//   y: -500,
//   radius: config.mouseRadius
// };

// const particles = [];
// for (let i = 0; i < config.particleCount; i++) {
//   particles.push({ x: 0, y: 0, baseX: 0, baseY: 0, vx: 0, vy: 0 });
// }

// // const vertexShaderSource = `
// //     attribute vec2 a_position;
// //     attribute float a_hue;
// //     attribute float a_saturation;
// //     varying float v_hue;
// //     varying float v_saturation;
// //     void main() {
// //         gl_PointSize = ${config.particleSize.toFixed(1)};
// //         gl_Position = vec4(a_position, 0.0, 1.0);
// //         v_hue = a_hue;
// //         v_saturation = a_saturation;
// //     }
// // `;

// const fragmentShaderSource = `
//     precision mediump float;
//     varying float v_hue;
//     varying float v_saturation;
//     void main() {
//         float c = v_hue * 6.0;
//         float x = 1.0 - abs(mod(c, 2.0) - 1.0);
//         vec3 color;
//         if (c < 1.0) color = vec3(1.0, x, 0.0);
//         else if (c < 2.0) color = vec3(x, 1.0, 0.0);
//         else if (c < 3.0) color = vec3(0.0, 1.0, x);
//         else if (c < 4.0) color = vec3(0.0, x, 1.0);
//         else if (c < 5.0) color = vec3(x, 0.0, 1.0);
//         else color = vec3(1.0, 0.0, x);
//         vec3 finalColor = mix(vec3(1.0), color, v_saturation);
//         gl_FragColor = vec4(finalColor, 1.0);
//     }
// `;

// function createShader(gl, type, source) {
//   const shader = gl.createShader(type);
//   gl.shaderSource(shader, source);
//   gl.compileShader(shader);
//   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
//     console.error(gl.getShaderInfoLog(shader));
//     gl.deleteShader(shader);
//     return null;
//   }
//   return shader;
// }

// function createProgram(gl, vertexShader, fragmentShader) {
//   const program = gl.createProgram();
//   gl.attachShader(program, vertexShader);
//   gl.attachShader(program, fragmentShader);
//   gl.linkProgram(program);
//   if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
//     console.error(gl.getProgramInfoLog(program));
//     gl.deleteProgram(program);
//     return null;
//   }
//   return program;
// }

// const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
// const fragmentShader = createShader(
//   gl,
//   gl.FRAGMENT_SHADER,
//   fragmentShaderSource
// );
// const program = createProgram(gl, vertexShader, fragmentShader);

// const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
// const hueAttributeLocation = gl.getAttribLocation(program, "a_hue");
// const saturationAttributeLocation = gl.getAttribLocation(
//   program,
//   "a_saturation"
// );

// const positionBuffer = gl.createBuffer();
// const hueBuffer = gl.createBuffer();
// const saturationBuffer = gl.createBuffer();

// const positions = new Float32Array(config.particleCount * 2);
// const hues = new Float32Array(config.particleCount);
// const saturations = new Float32Array(config.particleCount);

// function getTextCoordinates(text) {
//   const ctx = document.createElement("canvas").getContext("2d");
//   ctx.canvas.width = canvas.width;
//   ctx.canvas.height = canvas.height;
//   const fontSize = Math.min(canvas.width / 6, canvas.height / 6);
//   ctx.font = `900 ${fontSize}px Arial`;
//   ctx.fillStyle = "white";
//   ctx.textAlign = "center";
//   ctx.textBaseline = "middle";
//   ctx.fillText(text, canvas.width / 2, canvas.height / 2);
//   const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
//   const coordinates = [];
//   for (let y = 0; y < canvas.height; y += 4) {
//     for (let x = 0; x < canvas.width; x += 4) {
//       const index = (y * canvas.width + x) * 4;
//       if (imageData[index + 3] > 128) {
//         coordinates.push({
//           x: (x / canvas.width) * 2 - 1,
//           y: (y / canvas.height) * -2 + 1
//         });
//       }
//     }
//   }
//   return coordinates;
// }

// function createParticles() {
//   textCoordinates = getTextCoordinates(config.textArray[currentTextIndex]);
//   for (let i = 0; i < config.particleCount; i++) {
//     const randomIndex = Math.floor(Math.random() * textCoordinates.length);
//     const { x, y } = textCoordinates[randomIndex];
//     particles[i].x = particles[i].baseX = x;
//     particles[i].y = particles[i].baseY = y;
//   }
// }
// function updateParticles() {
//   for (let i = 0; i < config.particleCount; i++) {
//     const particle = particles[i];
//     const dx = mouse.x - particle.x;
//     const dy = mouse.y - particle.y;
//     const distance = Math.sqrt(dx * dx + dy * dy);
//     const forceDirectionX = dx / distance;
//     const forceDirectionY = dy / distance;
//     const maxDistance = mouse.radius;
//     const force = (maxDistance - distance) / maxDistance;
//     const directionX = forceDirectionX * force * config.forceMultiplier;
//     const directionY = forceDirectionY * force * config.forceMultiplier;

//     const angle = Math.atan2(dy, dx);

//     const rotationForceX = Math.sin(
//       -Math.cos(angle * -1) *
//       Math.sin(config.rotationForceMultiplier * Math.cos(force)) *
//       Math.sin(distance * distance) *
//       Math.sin(angle * distance)
//     );

//     const rotationForceY = Math.sin(
//       Math.cos(angle * 1) *
//       Math.sin(config.rotationForceMultiplier * Math.sin(force)) *
//       Math.sin(distance * distance) *
//       Math.cos(angle * distance)
//     );

//     if (distance < mouse.radius) {
//       particle.vx -= directionX + rotationForceX;
//       particle.vy -= directionY + rotationForceY;
//     } else {
//       particle.vx += (particle.baseX - particle.x) * config.returnSpeed;
//       particle.vy += (particle.baseY - particle.y) * config.returnSpeed;
//     }

//     particle.x += particle.vx;
//     particle.y += particle.vy;
//     particle.vx *= config.velocityDamping;
//     particle.vy *= config.velocityDamping;

//     const speed = Math.sqrt(
//       particle.vx * particle.vx + particle.vy * particle.vy
//     );
//     const hue = (speed * config.colorMultiplier) % 360;

//     hues[i] = hue / 360;
//     saturations[i] = Math.min(speed * config.saturationMultiplier, 1);
//     positions[i * 2] = particle.x;
//     positions[i * 2 + 1] = particle.y;
//   }
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
//   gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, hues, gl.DYNAMIC_DRAW);
//   gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, saturations, gl.DYNAMIC_DRAW);
// }

// function animate() {
//   updateParticles();

//   gl.clear(gl.COLOR_BUFFER_BIT);
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//   gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
//   gl.enableVertexAttribArray(positionAttributeLocation);
//   gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
//   gl.vertexAttribPointer(hueAttributeLocation, 1, gl.FLOAT, false, 0, 0);
//   gl.enableVertexAttribArray(hueAttributeLocation);
//   gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
//   gl.vertexAttribPointer(saturationAttributeLocation, 1, gl.FLOAT, false, 0, 0);
//   gl.enableVertexAttribArray(saturationAttributeLocation);
//   gl.useProgram(program);
//   gl.drawArrays(gl.POINTS, 0, config.particleCount);
//   requestAnimationFrame(animate);
// }

// canvas.addEventListener("mousemove", (event) => {
//   mouse.x = (event.clientX / canvas.width) * 2 - 1;
//   mouse.y = (event.clientY / canvas.height) * -2 + 1;
// });

// canvas.addEventListener("mouseleave", () => {
//   mouse.x = -500;
//   mouse.y = -500;
// });

// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   gl.viewport(0, 0, canvas.width, canvas.height);
//   createParticles();
// });

// function changeText() {
//   currentTextIndex = (currentTextIndex + 1) % config.textArray.length;
//   const newCoordinates = getTextCoordinates(config.textArray[currentTextIndex]);
//   for (let i = 0; i < config.particleCount; i++) {
//     const randomIndex = Math.floor(Math.random() * newCoordinates.length);
//     const { x, y } = newCoordinates[randomIndex];
//     particles[i].baseX = x;
//     particles[i].baseY = y;
//   }
//   nextTextTimeout = setTimeout(changeText, config.textChangeInterval);
// }

// gl.clearColor(0, 0, 0, 1);
// createParticles();
// animate();
// nextTextTimeout = setTimeout(changeText, config.textChangeInterval);
//   } else {
//     console.error("WebGL not supported");
//   }
// });

// const canvas = document.querySelector("canvas");
// const gl = canvas.getContext("webgl");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// gl.viewport(0, 0, canvas.width, canvas.height);


</script>



<style scoped>
.el-menu-demo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

}

.el-aside {
  width: 55%;
  background-color: rgb(11, 221, 245)
}

.el-container {
  width: 100%;
  background-color: rgb(230, 124, 18);
  padding: 0%;
  margin: 0%;
  height: 100%;
}

canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
}

.el-form {
  width: 100%;
  max-width: 400px;
  /* margin-top: 100px; */
  
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.el-main {
  width: 100%;
  /* max-width: none; */
  background-color: #222;
  /* flex: 1;
  align-items: flex-start;
  justify-content: flex-start; */
}
</style>
