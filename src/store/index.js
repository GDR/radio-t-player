import Vue from "vue";
import Vuex from 'vuex';
import podcasts from '@/store/podcasts.module';
import player from '@/store/player.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    podcasts,
    player
  }
})