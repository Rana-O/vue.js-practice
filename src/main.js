import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import * as GoogleMaps from 'vue2-google-maps'

Vue.use(GoogleMaps, {
  load: {
    key: 'AIzaSyDmx5nLzqkqLHT-KB0DXf0y4VpRr6SVOvI',
    libraries: 'places',
  },

  autobindAllEvents: false,
});

Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'topPage',
      component: () => import('@/components/topPage.vue')
    },
    {
      path: '/edit',
      name: 'editPage',
      component: () => import('@/components/editPage.vue')
    }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// axiosをrequireしてインスタンスを生成する
const axios = require('axios');
export const client = axios.create({
baseURL: 'http://127.0.0.1:8081/',
headers : {
    'Content-Type': 'multipart/form-data'
}
});
console.log (client)
