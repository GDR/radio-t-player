<template>
  <div class="podcast">
    <h3>{{ podcastInfo.title }} </h3> <button v-on:click="play">Play</button>
    <ul>
      <li v-for="(timeLabel, index) in podcastInfo.time_labels" v-bind:key="index">
        {{ timeLabel.topic }} <formatted-time v-bind:time="timeLabel.time"></formatted-time>
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
import FormattedTime from './FormattedTime.vue';

export default {
  name: "PodcastItem",
  props: {
    podcastInfo: Object
  },
  methods: {
    play() {
      this.$store.dispatch(actionTypes.PLAY_EPISODE, this.podcastInfo)
    }
  },
  components: {
    FormattedTime
  }
};
</script>
