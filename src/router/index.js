import Vue from 'vue'
import VueRouter from 'vue-router'
import LocalStorageService from '../plugins/LocalStorageService'
const localStorageService = LocalStorageService.getService()
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Home',
    path: '/',
    component: () => import('../views/Home'),
    meta: {
      title: 'Apple`n`Perry',
      layout: 'home'
    }
  },
  {
    name: 'ShopMain',
    path: '/shop',
    component: () => import('../views/Shop/Main'),
    meta: {
      title: 'Магазин',
      layout: 'shop'
    }
  },
  {
    name: 'ShopCategories',
    path: '/shop/categories',
    component: () => import('../views/Shop/Categories'),
    meta: {
      title: 'Категории',
      layout: 'shop'
    }
  },
  {
    name: 'ShopVendors',
    path: '/shop/vendors',
    component: () => import('../views/Shop/Vendors'),
    meta: {
      title: 'Производители',
      layout: 'shop'
    }
  },
  {
    name: 'ShopContacts',
    path: '/shop/contacts',
    component: () => import('../views/Shop/Contacts'),
    meta: {
      title: 'Контакты',
      layout: 'shop'
    }
  },
  {
    name: 'ShopSearch',
    path: '/shop/search',
    component: () => import('../views/Shop/Search'),
    meta: {
      title: 'Поиск',
      layout: 'shop'
    }
  },
  {
    name: 'ShopDelivery',
    path: '/shop/delivery',
    component: () => import('../views/Shop/Delivery'),
    meta: {
      title: 'Доставка',
      layout: 'shop'
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
      if (localStorageService.getToken()) next('/apple-admin/panel')
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
    },
    children: [
      {
        path: 'list/:type',
        component: () => import('../views/AdminPanel/List'),
        meta: {
          title: 'Админка',
          needToken: true,
          layout: 'admin'
        },
        children: [
          {
            path: 'create',
            component: () => import('../views/AdminPanel/Create'),
            meta: {
              title: 'Админка',
              needToken: true,
              layout: 'admin'
            },
            beforeEnter(to, from, next) {
              if (!store.state.needsAlert) {
                store.commit('setForm', null)
                store.commit('setFormId', '')
              }
              next()
            }
          },
          {
            path: 'edit/:id',
            component: () => import('../views/AdminPanel/Edit'),
            meta: {
              title: 'Админка',
              needToken: true,
              layout: 'admin'
            },
            beforeEnter(to, from, next) {
              if (!store.state.needsAlert) {
                store.commit('setForm', null)
                store.commit('setFormId', '')
              }
              next()
            }
          }
        ]
      }
    ]
  },
  {
    name: 'Files',
    path: '/apple-admin/files',
    component: () => import('../views/AdminPanel/Files'),
    meta: {
      title: 'Управление изображениями',
      needToken: true,
      layout: 'admin'
    }
  },
  {
    name: '404',
    path: '*',
    component: () => import('../views/Page404'),
    meta: {
      title: 'Страница не найдена'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needToken && !localStorageService.getToken()) next('/apple-admin')
  next()
})

export default router
