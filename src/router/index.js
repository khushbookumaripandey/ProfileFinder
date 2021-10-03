import Vue from 'vue'
import VueRouter from 'vue-router'
import Navbar from '../components/Navabar.vue'
import GetAllUser from '../components/GetAllUser.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/getalluser'
  },
  {
    path: '/navbar',
    name: 'Navbar',
    component: Navbar
  },
  {
    path: '/getalluser',
    name: 'AllUser',
    component: GetAllUser
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
