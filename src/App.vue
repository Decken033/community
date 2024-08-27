<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import DevicePixelRatio from './libs/rem.js'


export default {
  name: 'App',

  // created() {
  //   const devicePixelRatio = new DevicePixelRatio();
  //   devicePixelRatio.init()
  // }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: 'PingFang SC', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}
</style>