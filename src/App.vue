<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from "./router/index";
import ApiService from './services/api.service';

ApiService.init();

export default {
  router
};
</script>