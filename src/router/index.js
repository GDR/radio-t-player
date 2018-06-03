import Vue from "vue";
import Router from "vue-router";
import PodcastListPage from "../pages/PodcastList.vue";

Vue.use(Router);

export const routes = [
  {
    path: '/',
    component: PodcastListPage,
  },
];

export default new Router({
  mode: "history",
  routes,
});
