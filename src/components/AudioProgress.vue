<template>
  <div class="player__timeline" @mousedown="dragStart">
    <div class="player__timeline__progress" :style="progressStyle"></div>
  </div>
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
import { mutationTypes, actionTypes } from "@/store/player.module";
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
      return {
        width: this.progress + "%"
      }
    }
  },
  methods: {
   dragStart(event) {
      console.log('start')
      document.onmouseup = this.dragStop
      document.onmousemove = this.dragProcess
      document.ontouchmove = this.touchProcess
      
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
    },
    touchProcess(event) {
      event.preventDefault();
      console.log(event);
    }
  }
}
</script>
