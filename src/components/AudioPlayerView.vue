<template>
  <div class="player">
    <div class="player__timeline" @mousedown="dragStart">
      <div class="player__timeline__progress" :style="progressStyle"></div>
    </div>
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
          {{playerState.currentTimeFormatted}} / {{playerState.durationFormatted}}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $circle-radius: 10px;
  $timeline-height: 4px;

  .player {
    position: fixed;
    width: 100%;
    height: calc(4rem + #{$timeline-height});
    bottom: 0;

    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

    &__timeline {
      position: absolute;
      width: 100%;
      height: $timeline-height;
      top: -1rem;
      padding: 1rem 0;

      &__progress {
        position: relative;
        width: 50%;
        height: 100%;
        background: #50A0E0;
        pointer-events: none;


        &::after {
          content: ' ';
          width: $circle-radius;
          height: $circle-radius;
          border-radius: 100%;
          background: #50A0E0;
          position: absolute;
          top: -$circle-radius / 2 + $timeline-height / 2;
          right: -$circle-radius / 2;
        }
      }
    }
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
        font-size: 1.125em;
        font-weight: lighter;
      }

      &__topic {
        font-size: 0.8125em;
        color: rgba(0, 0, 0, 0.54);
      }
    }
  
    &__control {
      display: flex;
      align-items: center;
      margin-bottom: 4px;

      button {
        background: none;
        border: none;
        padding: 0;
        height: 40px;
        height: 40px;

        outline: none;
        margin-right: 12px;

        img {
          width: 40px;
          height: 40px;
        }
      }

      button:last-child {
        margin-right: 0;
      }
    }

    &__time {
      font-family: monospace;
      letter-spacing: -0.5px;
      font-size: 0.8125em;
      color: rgba(0, 0, 0, 0.54);
      margin-top: 12px;
      float: right;
    }
  }

</style>

<script>
import { mutationTypes, actionTypes } from "@/store/player.module";

const getClickedPercent = (offsetX, width) => {
  return Math.min(Math.max((offsetX / width * 100), 0), 100);
};

export default {
  name: "AudioPlayerView",
  data: () => {
    return {
      isDragging: false,
      progress: 0,
    }
  },
  computed: {
    playerState() {
      return this.$store.getters.getPlayerState;
    },
    episodeInfo() {
      return this.$store.state.player.currentEpisode;
    },
    progressStyle() {
      if (this.isDragging) {
        return {
          width: this.$data.progress + "%",
        }
      }
      return {
        width: this.playerState.currentPercentage + "%"
      };
    }
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
    dragStart(event) {
      console.log('start')
      document.onmouseup = this.dragStop
      document.onmousemove = this.dragProcess
      this.$data.isDragging = true
      const offsetX = event.offsetX;
      const width = event.target.clientWidth;
      this.$data.progress = getClickedPercent(offsetX, width)
    },
    dragStop() {
      console.log('stop')
      document.onmouseup = null
      document.onmousemove = null
      this.$data.isDragging = false
      this.$store.commit(mutationTypes.SET_CURRENT_PERCENT, this.progress)
    },
    dragProcess(event) {
      event.stopPropagation()
      event.preventDefault();
      
      const offsetX = event.clientX;
      const width = window.innerWidth;
      this.$data.progress = getClickedPercent(offsetX, width)
    }
  },
  mounted() {}
};
</script>
