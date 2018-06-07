import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { DateTime } from "luxon";
import { parseSeconds } from "../utils/apiUtils";

const ApiService = {
  init() {
    const axiosInstance = axios.create({
      baseURL: "https://radio-t.com/site-api"
    });
    Vue.use(VueAxios, axiosInstance);
  },

  get(request, params) {
    return Vue.axios.get(request, params);
  }
};

export default ApiService;

export const PodcastService = {
  getPodcasts(num) {
    return ApiService.get(`/last/${num}`)
      .then(({ data }) => data)
      .then(podcasts => {
        return podcasts.map(podcast => {
          if (!podcast.time_labels) {
            return podcast
          }
          const time_labels = podcast.time_labels.map(timelabel => {
            return {
              ...timelabel,
              time: parseSeconds(timelabel.time)
            }
          });
          return {
            ...podcast,
            time_labels
          };
        });
      });
  }
};
