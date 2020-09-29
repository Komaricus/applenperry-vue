import Vue from 'vue'
import VueRouter from 'vue-router'
import LocalStorageService from '../plugins/LocalStorageService'
const localStorageService = LocalStorageService.getService()

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('../views/Home'),
    meta: {
      title: 'Apple`n`Perry'
    }
  },
  {
    name: 'AdminLogin',
    path: '/apple-admin',
    component: () => import('../views/AdminPanel/AdminLogin'),
    meta: {
      title: 'Вход',
      layout: 'admin'
    },
    beforeEnter: (to, from, next) => {
      if (localStorageService.getToken()) next('/')
      next()
    }
  },
  {
    name: 'HomePanel',
    path: '/apple-admin/panel',
    component: () => import('../views/AdminPanel/HomePanel'),
    meta: {
      title: 'Админка',
      needToken: true,
      layout: 'admin'
    }
  },
  {
    name: '404',
    path: '*',
    component: () => import('../views/Page404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needToken && !localStorageService.getToken()) next('/')
  next()
})

export default router
