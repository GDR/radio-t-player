<template>
    <div>
        <div v-if="isLoading">
            Loading
        </div>
        <div v-if="isLoaded">
            <podcast-item 
                v-for="(podcast, index) in podcasts" 
                v-bind:key="index"
                v-bind:podcastInfo="podcast"
            ></podcast-item>
        </div>
    </div>
</template>

<script>
import { PodcastService } from "../services/api.service";
import { actionTypes } from "@/store/podcasts.module";
import { mapGetters } from "vuex";
import PodcastItem from "@/components/PodcastItem.vue";

export default {
  name: "PodcastListPage",
  computed: {
    podcasts() {
      return this.$store.getters.getPodcasts;
    },
    isLoading() {
      return this.$store.state.podcasts.isLoading;
    },
    isLoaded() {
        return !this.isLoading
    }
  },
  mounted() {
    this.fetchPodcasts();
  },
  methods: {
    fetchPodcasts() {
      this.$store.dispatch(actionTypes.FETCH);
    }
  },
  components: {
    PodcastItem
  }
};
</script>
