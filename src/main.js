import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)
Vue.config.productionTip = false

require('@/assets/styles/main.scss')

let infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
