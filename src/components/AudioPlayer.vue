<template>
  <div class="player">
    <audio 
      ref="player" 
      v-bind:src="episodeUrl"
      >
    </audio>
  </div>
</template>

<style lang="scss" scoped>
.player {
  display: none;
}
</style>


<script>
import { mutationTypes, actionTypes } from "@/store/player.module";
import Vue from "vue";

export default {
  name: "Player",
  computed: {
    episodeUrl() {
      return this.$store.getters.getEpisodeUrl;
    },
    playerState() {
      return this.$store.getters.getPlayerState;
    },
    currentTime() {
      return this.$store.state.player.currentTime;
    }
  },
  watch: {
    playerState(newValue, oldValue) {
      if (oldValue.isMuted !== newValue.isMuted) {
        this.player.muted = newValue.isMuted;
      }
      if (oldValue.isPlaying !== newValue.isPlaying) {
        if (newValue.isPlaying) {
          this.player.play();
        } else {
          this.player.pause();
        }
      }
      if (oldValue.jumpedTime !== newValue.jumpedTime) {
        this.player.currentTime = newValue.jumpedTime;
      }
    }
  },
  methods: {
    setTime(time) {},
    update: function(event) {
      const currentTime = this.$refs.player.currentTime;
      this.$store.commit(mutationTypes.UPDATE_STATE, parseInt(currentTime));
    },
    play() {
      this.$store.commit(mutationTypes.PLAY);
    },
    pause() {
      this.$store.commit(mutationTypes.PAUSE);
    },
    mute() {
      this.$store.commit(mutationTypes.MUTE);
    },

    unmute() {
      this.$store.commit(mutationTypes.UNMUTE);
    },
    handleLoad() {
      this.$store.dispatch(actionTypes.AUDIO_LOADED, this.player.duration);
    },
    init() {
      this.player = this.$refs.player;
      this.player.addEventListener("timeupdate", this.update);
      this.player.addEventListener("loadeddata", this.handleLoad);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

