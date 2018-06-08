<template>
  <div class="player">
    <audio-progress/>
    <div class="player__content">
      <div class="player__podcast player__left">
        <div class="player__podcast__title">
          {{episodeInfo.title}}
        </div>
        <div class="player__podcast__topic">
          Какой-то топик
        </div>
      </div>
      <div class="player__control">
        <button @click="goBackward">
          <img src="../assets/backward.svg"/>
        </button>
        <button class="player__control__main" v-if="playerState.isPlaying" @click="pause">
          <img src="../assets/pause.svg"/>
        </button>
        <button class="player__control__main" v-if="!playerState.isPlaying" @click="play">
          <img src="../assets/play.svg"/>
        </button>
        <button @click="goForward">
          <img src="../assets/forward.svg"/>
        </button>
      </div>
      <div class="player__right">
        <div class="player__time">
          {{playerState.currentTime | formatSeconds}} / {{playerState.duration | formatSeconds}}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/styles/_functions.scss';
  $timeline-height: 4px;
  $player-button-size: pxToRem(40);

  .player {
    position: fixed;
    width: 100%;
    height: calc(4rem + #{$timeline-height});
    bottom: 0;

    background: white;
    box-shadow: 0 0 5px rgba(206, 142, 142, 0.5);

    &__content {
      padding: 4px 1rem 0 1rem;
      height: 100%;
      display: flex;
    }
    &__right {
      flex: 1;
    }
    &__left {
      flex: 1;
    }
    &__podcast {
      align-self: center;
      &__title {
        font-size: pxToEm(18);
        font-weight: lighter;
      }

      &__topic {
        font-size: pxToEm(14);
        color: rgba(0, 0, 0, 0.54);
      }
    }
  
    &__control {
      display: flex;
      align-items: center;
      margin-bottom: $timeline-height;

      button {
        background: none;
        border: none;
        padding: 0;
        height: $player-button-size;

        outline: none;
        margin-right: pxToRem(12);

        img {
          width: $player-button-size;
          height: $player-button-size;
        }
      }

      button:last-child {
        margin-right: 0;
      }
    }

    &__time {
      font-family: monospace;
      letter-spacing: -0.5px;
      font-size: pxToEm(14);
      color: rgba(0, 0, 0, 0.54);
      margin-top: pxToRem(12);
      float: right;
    }
  }
</style>

<script>
import { mutationTypes, actionTypes } from "@/store/player.module";
import AudioProgress from "@/components/AudioPlayerProgress.vue";
import { getClickedPercent, formatSeconds } from "@/utils/playerUtils";

export default {
  name: "AudioPlayerView",
  computed: {
    playerState() {
      return this.$store.getters.getPlayerState;
    },
    episodeInfo() {
      return this.$store.state.player.currentEpisode;
    },
  },
  methods: {
    click(event) {
      const offsetX = event.offsetX;
      const width = event.path[0].offsetWidth;
      this.$store.commit(mutationTypes.SET_CURRENT_PERCENT, getClickedPercent(offsetX, width));
    },
    play() {
      this.$store.commit(mutationTypes.PLAY);
    },
    pause() {
      this.$store.commit(mutationTypes.PAUSE);
    },
    goBackward() {
      this.$store.dispatch(actionTypes.GO_BACKWARD, 10)
    },
    goForward() {
      this.$store.dispatch(actionTypes.GO_FORWARD, 10)
    },
  },
  components: {
    AudioProgress
  },
  mounted() {},
  filters: {
    formatSeconds(seconds) {
      return formatSeconds(seconds)
    }
  }
};
</script>
