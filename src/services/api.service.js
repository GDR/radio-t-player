import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

const ApiService = {
  init() {
    const axiosInstance = axios.create({
      baseURL: 'https://radio-t.com/site-api',
    });
    Vue.use(VueAxios, axiosInstance);
  },

  get(request, params) {
    console.log(Vue.axios.baseUrl)
    return Vue.axios.get(request, params);
  }
}

export default ApiService;

export const PodcastService = {
  getPodcasts(num) {
    return ApiService.get(`/last/${num}`)
  }
}