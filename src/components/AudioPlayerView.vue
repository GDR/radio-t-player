<template>
  <div class="player">
    <div class="player__progress">
      <div class="player__progress__sub" v-bind:style="progressStyle">
      </div>
    </div>
    <div class="player__progress__interactor"  v-on:click="click" />
    <div class="player__label">
      <div class="player__label__dot">
        
      </div>
    </div>
    <div class="episode-info">
      {{episodeInfo.title}}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../styles/constants";

.player {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: $player-heigt;
  position: fixed;
  bottom: 0;

  background: white;
  box-shadow: 0 2px 10px black;

  &__progress {
    height: 15px;
    width: 100%;

    position: relative;
    transition: all 200ms;

    &__interactor {
      height: 15px;
      width: 100%;
      position: absolute;
      z-index: 10;
    }
  }

  &__progress__sub {
    position: relative;
    height: 6px;
    background: rgb(79, 96, 255);
    &::before {
      content: ' ';
      position: absolute;
      right: -7px;
      top: -5px;
      height: 15px;
      width: 15px;
      background: orange;
      border-radius: 100%;
      box-shadow: 0 0 5px black;
    }
  }

  &__label {
    &__dot {

    }
  }
}

.episode-info {
  margin-left: 5rem;
}
</style>

<script>
import { mutationTypes } from "@/store/player.module";

const getClickedPercent = (offsetX, width) => {
  return offsetX / width * 100;
};

export default {
  name: "AudioPlayerView",
  computed: {
    playerState() {
      return this.$store.getters.getPlayerState;
    },
    episodeInfo() {
      return this.$store.state.player.currentEpisode;
    },
    progressStyle() {
      return {
        width: this.playerState.currentPercentage + "%"
      };
    }
  },
  methods: {
    click(event) {
      const offsetX = event.offsetX;
      const width = event.path[0].offsetWidth;
      console.log(offsetX, width);
      this.$store.commit(mutationTypes.SET_CURRENT_PERCENT, getClickedPercent(offsetX, width));
    }
  },
  mounted() {}
};
</script>
