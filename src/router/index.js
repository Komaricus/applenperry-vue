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
    component: () => import('../views/Shop/Categories/Categories'),
    meta: {
      title: 'Категории',
      layout: 'shop'
    }
  },
  {
    name: 'ShopCategory',
    path: '/shop/categories/:type/:id',
    component: () => import('../views/Shop/Categories/Category'),
    meta: {
      layout: 'shop'
    }
  },
  {
    name: 'ShopProduct',
    path: '/shop/categories/:type/:id/:url',
    component: () => import('../views/Shop/Product'),
    meta: {
      layout: 'shop'
    }
  },
  {
    name: 'ShopProductStock',
    path: '/shop/stock/:url',
    component: () => import('../views/Shop/Product'),
    meta: {
      layout: 'shop'
    }
  },
  {
    name: 'ShopVendors',
    path: '/shop/vendors',
    component: () => import('../views/Shop/Vendors/Vendors'),
    meta: {
      title: 'Производители',
      layout: 'shop'
    }
  },
  {
    name: 'ShopVendor',
    path: '/shop/vendors/:id',
    component: () => import('../views/Shop/Vendors/Vendor'),
    meta: {
      title: 'Производители',
      layout: 'shop'
    }
  },
  {
    name: 'ShopVendorProduct',
    path: '/shop/vendors/:id/:url',
    component: () => import('../views/Shop/Product'),
    meta: {
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
    name: 'Cart',
    path: '/shop/cart',
    component: () => import('../views/Shop/Cart'),
    meta: {
      title: 'Корзина',
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
    name: 'ShopStock',
    path: '/shop/stock',
    component: () => import('../views/Shop/Stock'),
    meta: {
      title: 'Ассортимент',
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
    name: 'Orders',
    path: '/apple-admin/orders',
    component: () => import('../views/AdminPanel/Orders'),
    meta: {
      title: 'Заказы',
      needToken: true,
      layout: 'admin'
    }
  },
  {
    name: 'Order',
    path: '/apple-admin/orders/:id',
    component: () => import('../views/AdminPanel/Order'),
    meta: {
      title: 'Заказы',
      needToken: true,
      layout: 'admin'
    }
  },
  {
    name: 'Shop404',
    path: '/shop/*',
    component: () => import('../views/Shop/ShopPage404'),
    meta: {
      title: 'Страница не найдена'
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
