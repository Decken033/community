<!--<template>-->
<!--  <Particles-->
<!--      id="tsparticles"-->
<!--      :options="particlesOptions"-->
<!--  />-->
<!--</template>-->

<!--<script>-->
<!--import { ref } from 'vue';-->
<!--import  Particles  from 'vue3-particles';-->

<!--export default {-->
<!--  components: {-->
<!--    Particles,-->
<!--  },-->
<!--  setup() {-->
<!--    const particlesOptions = ref({-->
<!--      fpsLimit: 60,-->
<!--      particles: {-->
<!--        number: {-->
<!--          value: 50,-->
<!--          density: {-->
<!--            enable: true,-->
<!--            value_area: 800,-->
<!--          },-->
<!--        },-->
<!--        color: {-->
<!--          value: "#ffffff",-->
<!--        },-->
<!--        shape: {-->
<!--          type: "circle",-->
<!--        },-->
<!--        opacity: {-->
<!--          value: 0.5,-->
<!--          random: false,-->
<!--        },-->
<!--        size: {-->
<!--          value: 3,-->
<!--          random: true,-->
<!--        },-->
<!--        lineLinked: {-->
<!--          enable: true,-->
<!--          distance: 150,-->
<!--          color: "#ffffff",-->
<!--          opacity: 0.4,-->
<!--          width: 1,-->
<!--        },-->
<!--        move: {-->
<!--          enable: true,-->
<!--          speed: 2,-->
<!--          direction: "none",-->
<!--          random: false,-->
<!--          straight: false,-->
<!--          outMode: "out",-->
<!--          bounce: false,-->
<!--        },-->
<!--      },-->
<!--      interactivity: {-->
<!--        detectOn: "canvas",-->
<!--        events: {-->
<!--          onHover: {-->
<!--            enable: true,-->
<!--            mode: "repulse",-->
<!--          },-->
<!--          onClick: {-->
<!--            enable: true,-->
<!--            mode: "push",-->
<!--          },-->
<!--        },-->
<!--        modes: {-->
<!--          repulse: {-->
<!--            distance: 100,-->
<!--            duration: 0.4,-->
<!--          },-->
<!--          push: {-->
<!--            particles_nb: 4,-->
<!--          },-->
<!--        },-->
<!--      },-->
<!--    });-->

<!--    return {-->
<!--      particlesOptions,-->
<!--    };-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--#tsparticles {-->
<!--  position: absolute;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  z-index: -1;-->
<!--}-->
<!--</style>-->
