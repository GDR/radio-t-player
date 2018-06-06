import { PodcastService } from "../services/api.service";
import { Z_DEFAULT_STRATEGY } from "zlib";

export const actionTypes = {
  FETCH: "@@podcasts/fetch"
};

const mutationTypes = {
  FETCH_START: "@@podcasts/fetch/start",
  FETCH_OK: "@@podcasts/fetch/ok",
  FETCH_ERROR: "@@podcasts/fetch/error"
};

const state = {
  isLoading: false,
  list: [],
  error: null
};

const getters = {
  getPodcasts(state) {
    return state.list;
  }
};

const actions = {
  async [actionTypes.FETCH](context) {
    context.commit(mutationTypes.FETCH_START);
    try {
      const list = await PodcastService.getPodcasts(10);
      context.commit(mutationTypes.FETCH_OK, {
        list
      });
    } catch (error) {
      context.commit(mutationTypes.FETCH_ERROR, {
        error
      });
    }
  }
};

const mutations = {
  [mutationTypes.FETCH_START](state) {
    state.isLoading = true;
    state.list = [];
    state.error = null;
  },

  [mutationTypes.FETCH_OK](state, payload) {
    state.isLoading = false;
    state.list = payload.list;
    state.error = null;
  },

  [mutationTypes.FETCH_ERROR](state, payload) {
    state.isLoading = false;
    state.list = [];
    state.error = payload.error;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}