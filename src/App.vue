<template>
  <div id="app">
    <audio-player/>
    <router-view></router-view>
    <audio-player-view></audio-player-view>
  </div>
</template>

<script>
import router from "./router/index";
import ApiService from "./services/api.service";
import store from "@/store";
import AudioPlayer from "@/components/AudioPlayer.vue";
import AudioPlayerView from "@/components/AudioPlayerView.vue";

export default {
  router,
  store,
  components: {
    AudioPlayer,
    AudioPlayerView,
  }
};
</script>

<style lang="scss">
  @import '~normalize-scss/sass/normalize/_import-now';
  @import './styles/constants.scss';

  * {
    font-family: 'Fira Sans Condensed', sans-serif;
  }

  body {
    margin-bottom: 4rem;
  }
</style>
