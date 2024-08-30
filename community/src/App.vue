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
@import './css/App.css';
</style>