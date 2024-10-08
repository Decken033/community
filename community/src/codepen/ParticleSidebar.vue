<template>
  <div class="sidebar">
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const canvas = ref(null);
let animationFrame, nextTextTimeout;

onMounted(() => {
  console.log('ParticleSidebar component mounted!');
  initParticleEffect();
  window.addEventListener("resize", resizeCanvas);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeCanvas);
  cancelAnimationFrame(animationFrame);
  clearTimeout(nextTextTimeout);
});

function initParticleEffect() {
  const gl = canvas.value.getContext("webgl");

  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
  gl.viewport(0, 0, canvas.value.width, canvas.value.height);

  const config = {
    particleCount: 5000,
    textArray: ["Babel Tower Forum", "Babel", "Tower", "Forum"],
    mouseRadius: 0.9,
    particleSize: 2,
    forceMultiplier: 0.003,
    returnSpeed: 0.01,
    velocityDamping: 0.95,
    colorMultiplier: 40000,
    saturationMultiplier: 500,
    textChangeInterval: 5000,
    rotationForceMultiplier: 1.0
  };

  let currentTextIndex = 0;
  let textCoordinates = [];

  const mouse = {
    x: -500,
    y: -500,
    radius: config.mouseRadius
  };

  const particles = [];
  for (let i = 0; i < config.particleCount; i++) {
    particles.push({ x: 0, y: 0, baseX: 0, baseY: 0, vx: 0, vy: 0 });
  }

  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute float a_hue;
    attribute float a_saturation;
    attribute float a_size;
    varying float v_hue;
    varying float v_saturation;
    varying float v_size;
    void main() {
        gl_PointSize = a_size * (1.0 + a_saturation);
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_hue = a_hue;
        v_saturation = a_saturation;
        v_size = a_size;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    varying float v_hue;
    varying float v_saturation;
    varying float v_size;
    uniform float u_time;
    void main() {
        float c = mod(v_hue * 6.0 + u_time, 6.0);
        float x = 1.0 - abs(mod(c, 2.0) - 1.0);
        vec3 color;
        if (c < 1.0) color = vec3(1.0, x, 0.0);
        else if (c < 2.0) color = vec3(x, 1.0, 0.0);
        else if (c < 3.0) color = vec3(0.0, 1.0, x);
        else if (c < 4.0) color = vec3(0.0, x, 1.0);
        else if (c < 5.0) color = vec3(x, 0.0, 1.0);
        else color = vec3(1.0, 0.0, x);
        vec3 finalColor = mix(vec3(0.0), color, v_saturation * 0.8);
        gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = createProgram(gl, vertexShader, fragmentShader);

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const hueAttributeLocation = gl.getAttribLocation(program, "a_hue");
  const saturationAttributeLocation = gl.getAttribLocation(program, "a_saturation");
  const sizeAttributeLocation = gl.getAttribLocation(program, "a_size");

  const positionBuffer = gl.createBuffer();
  const hueBuffer = gl.createBuffer();
  const saturationBuffer = gl.createBuffer();
  const sizeBuffer = gl.createBuffer();

  const positions = new Float32Array(config.particleCount * 2);
  const hues = new Float32Array(config.particleCount);
  const saturations = new Float32Array(config.particleCount);
  const sizes = new Float32Array(config.particleCount);

  function getTextCoordinates(text) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.canvas.width = canvas.value.width;
    ctx.canvas.height = canvas.value.height;
    const fontSize = Math.min(canvas.value.width / 6, canvas.value.height / 6);
    ctx.font = `900 ${fontSize}px Arial`;
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.value.width / 2, canvas.value.height / 2);
    const imageData = ctx.getImageData(0, 0, canvas.value.width, canvas.value.height).data;
    const coordinates = [];
    for (let y = 0; y < canvas.value.height; y += 4) {
      for (let x = 0; x < canvas.value.width; x += 4) {
        const index = (y * canvas.value.width + x) * 4;
        if (imageData[index + 3] > 128) {
          coordinates.push({
            x: (x / canvas.value.width) * 2 - 1,
            y: (y / canvas.value.height) * -2 + 1
          });
        }
      }
    }
    return coordinates;
  }

  function createParticles() {
    textCoordinates = getTextCoordinates(config.textArray[currentTextIndex]);
    for (let i = 0; i < config.particleCount; i++) {
      const randomIndex = Math.floor(Math.random() * textCoordinates.length);
      const { x, y } = textCoordinates[randomIndex];
      particles[i].x = particles[i].baseX = x;
      particles[i].y = particles[i].baseY = y;
    }
  }

  function updateParticles() {
    for (let i = 0; i < config.particleCount; i++) {
      const particle = particles[i];
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const forceDirectionX = dx / distance;
      const forceDirectionY = dy / distance;
      const maxDistance = mouse.radius;
      const force = (maxDistance - distance) / maxDistance;
      const directionX = forceDirectionX * force * config.forceMultiplier;
      const directionY = forceDirectionY * force * config.forceMultiplier;

      const angle = Math.atan2(dy, dx);
      const rotationForceX = Math.sin(
          -Math.cos(angle * -1) *
          Math.sin(config.rotationForceMultiplier * Math.cos(force)) *
          Math.sin(distance * distance) *
          Math.sin(angle * distance)
      );
      const rotationForceY = Math.sin(
          Math.cos(angle * 1) *
          Math.sin(config.rotationForceMultiplier * Math.sin(force)) *
          Math.sin(distance * distance) *
          Math.cos(angle * distance)
      );

      if (distance < mouse.radius) {
        particle.vx -= directionX + rotationForceX;
        particle.vy -= directionY + rotationForceY;
      } else {
        particle.vx += (particle.baseX - particle.x) * config.returnSpeed;
        particle.vy += (particle.baseY - particle.y) * config.returnSpeed;
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= config.velocityDamping;
      particle.vy *= config.velocityDamping;

      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      const hue = (speed * config.colorMultiplier) % 360;

      hues[i] = hue / 360;
      saturations[i] = Math.min(speed * config.saturationMultiplier, 1);
      sizes[i] = config.particleSize * (1.0 + Math.sin(performance.now() / 1000.0 + i * 0.2)); // Adjust size dynamically
      positions[i * 2] = particle.x;
      positions[i * 2 + 1] = particle.y;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, hues, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, saturations, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
  }

  function animate() {
    updateParticles();
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
    gl.vertexAttribPointer(hueAttributeLocation, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(hueAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
    gl.vertexAttribPointer(saturationAttributeLocation, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(saturationAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
    gl.vertexAttribPointer(sizeAttributeLocation, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(sizeAttributeLocation);
    gl.useProgram(program);
    gl.uniform1f(gl.getUniformLocation(program, "u_time"), performance.now() / 1000.0);
    gl.drawArrays(gl.POINTS, 0, config.particleCount);
    animationFrame = requestAnimationFrame(animate);
  }

  function resizeCanvas() {
    canvas.value.width = window.innerWidth;
    canvas.value.height = window.innerHeight;
    gl.viewport(0, 0, canvas.value.width, canvas.value.height);
    createParticles();
  }

  function changeText() {
    currentTextIndex = (currentTextIndex + 1) % config.textArray.length;
    const newCoordinates = getTextCoordinates(config.textArray[currentTextIndex]);
    for (let i = 0; i < config.particleCount; i++) {
      const randomIndex = Math.floor(Math.random() * newCoordinates.length);
      const { x, y } = newCoordinates[randomIndex];
      particles[i].baseX = x;
      particles[i].baseY = y;
    }
    nextTextTimeout = setTimeout(changeText, config.textChangeInterval);
  }

  gl.clearColor(1, 1, 1, 1);
  createParticles();
  animate();
  nextTextTimeout = setTimeout(changeText, config.textChangeInterval);

  canvas.value.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / canvas.value.width) * 2 - 1;
    mouse.y = -((event.clientY / canvas.value.height) * 2 - 1);
  });

  canvas.value.addEventListener('mouseout', () => {
    mouse.x = -500;
    mouse.y = -500;
  });
}
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.canvas {
  display: block;
  width: 100%;
  height: 100%;
  margin-left: auto;
}
</style>
