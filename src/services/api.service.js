import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment";

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
            const parsedTime = moment(timelabel.time);
            const hours = parseInt(parsedTime.format("HH"));
            const minutes = parseInt(parsedTime.format("mm"));
            const seconds = parseInt(parsedTime.format("ss"));
            return {
              ...timelabel,
              time: hours * 60 * 60 + minutes * 60 + seconds
            };
          });
          return {
            ...podcast,
            time_labels
          };
        });
      });
  }
};
