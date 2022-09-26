import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/cart/address'
  },
  {
    path: '/cart/address',
    name: 'UserAddress',
    component: () => import('../views/UserAddress.vue')
  },
  {
    path: '/cart/shipping',
    name: 'UserShipping',
    component: () => import('../views/UserShipping.vue')
  },
  {
    path: '/cart/payment',
    name: 'UserPayment',
    component: () => import('../views/UserPayment.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
