<template>
  <div class="podcast">
    <h3>{{ podcastInfo.title }} </h3> <button v-on:click="play">Play</button>
    <ul>
      <li v-for="(timeLabel, index) in podcastInfo.time_labels" v-bind:key="index">
        {{ timeLabel.topic }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .podcast {
    width: 600px;
    margin-bottom: 1rem;
  }
</style>


<script>
import { actionTypes } from "@/store/player.module";

export default {
  name: "PodcastItem",
  props: {
    podcastInfo: Object
  },
  methods: {
    play() {
      this.$store.dispatch(actionTypes.PLAY_EPISODE, this.podcastInfo)
    }
  }
};
</script>
