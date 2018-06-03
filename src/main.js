import Vue from 'vue'
import App from './App.vue'
import ApiService from '@/services/api.service'

Vue.config.productionTip = false

ApiService.init();

new Vue({
  render: h => h(App)
}).$mount('#app')
