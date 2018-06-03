<template>
    <div>
        Podcast Page
    </div>
</template>

<script>
import { PodcastService } from '../services/api.service';

export default {
  name: 'PodcastListPage',
  created: async function() {
      const list = await PodcastService.getPodcasts(10).then(
          ({data}) => data
      );

      this.$data.podcasts = list;
  },
  data() {
      return {
          podcasts: [],
      }
  }
};
</script>
