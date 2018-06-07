<template>
  <v-touch 
    class="player__timeline" 
    v-on:pan="touchProgress" 
    v-on:panend="touchEnd"
    v-on:tap="touchEnd"
  >
    <div class="player__timeline__progress" :style="progressStyle"></div>
  </v-touch>
</template>

<style lang="scss" scoped>
  $circle-radius: 10px;
  $timeline-height: 4px;

  .player {
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
  }
</style>

<script>
import { mutationTypes } from "@/store/player.module";
import { getClickedPercent } from "@/utils/playerUtils";

export default {
  name: 'PodcastProgress',
  data: () => {
    return {
      isDragging: false,
      progress: 0,
    }
  },
  computed: {
    playerState() {
      return this.$store.getters.getPlayerState
    },
    progressStyle() {
      if (this.isDragging) {
        return {
          width: this.progress + "%"
        }
      } 
      return {
        width: this.playerState.currentPercentage + "%"
      }
    }
  },
  methods: {
    touchProgress(event) {
      this.$data.isDragging = true
      this.$data.progress = getClickedPercent(event.center.x, window.innerWidth)
    },
    touchEnd(event) {
      this.$data.isDragging = false
      this.$data.progress = getClickedPercent(event.center.x, window.innerWidth)
      this.$store.commit(mutationTypes.SET_CURRENT_PERCENT, this.progress)
    }
  }
}
</script>
