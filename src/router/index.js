import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    component: ()=>import('../views/dashboard/dashboardContainer'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: ()=>import('../views/dashboard/dashboard')
      },
      {
        path: '/new-contribution',
        name: 'NewContribution',
        component: ()=>import('../views/dashboard/contributions/contribution')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
