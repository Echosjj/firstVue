import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Seller from '../pages/seller.vue'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
    {
      path: '/Seller',
      name: 'Seller',
      component: Seller
    }
  ]
})
