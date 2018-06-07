import Vue from 'vue'
import App from './App.vue'
var VueTouch = require('vue-touch')
import ApiService from '@/services/api.service'

Vue.config.productionTip = false

ApiService.init();
Vue.use(VueTouch, {name: 'v-touch'});

new Vue({
  render: h => h(App)
}).$mount('#app')
