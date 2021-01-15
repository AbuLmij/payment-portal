/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import store from './store/store.js'

const router = new Router({
   mode: 'history',
   base: '/',
   scrollBehavior() {
      return { x: 0, y: 0 }
   },
   routes: [

      {
         // =============================================================================
         // MAIN LAYOUT ROUTES
         // =============================================================================
         path: '',
         component: () => import('./layouts/main/Main.vue'),
         children: [
            // =============================================================================
            // Theme Routes
            // =============================================================================
            {
               path: '/',
               name: 'Domains',
               component: () => import('./views/Domains.vue'),
               meta: {
                  pageTitle: 'Domains',
                  breadcrumb: [
                     { title: 'Domains', active: true }
                  ],
                  authRequired: true,
               }
            },
            {
               path: '/myorders',
               name: 'My Orders',
               component: () => import('./views/MyOrders.vue'),
               meta: {
                  pageTitle: 'My Orders',
                  breadcrumb: [
                     { title: 'My Orders', active: true }
                  ],
                  authRequired: true,
                  isAdmin: false
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (!to.meta.isAdmin && !isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/orders/:orderRefNum',
               name: 'Order Details',
               component: () => import('./views/OrderDetails.vue'),
               meta: {
                  pageTitle: 'Order Details',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'My Orders', url: '/myorders' },
                     { title: 'Order Details', active: true }
                  ],
                  authRequired: true,
                  isAdmin: false
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (!to.meta.isAdmin && !isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/profile',
               name: 'Profile',
               component: () => import('./views/profile/Index.vue'),
               meta: {
                  pageTitle: 'Profile',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Account', active: true },
                     { title: 'Profile', active: true }
                  ],
                  authRequired: true,
               }
            },

            // =============================================================================
            // ADMIN SECTION
            {
               path: '/admin/users',
               name: 'Users',
               component: () => import('./views/admin/users/List.vue'),
               meta: {
                  pageTitle: 'Users',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Users', url: '/admin/users/', active: true },
                     { title: 'Add', active: true }
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/admin/users/create',
               name: 'Users Add',
               component: () => import('./views/admin/users/Add.vue'),
               meta: {
                  pageTitle: 'Users Add',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Users', url: '/admin/users/', active: true },
                     { title: 'Add', active: true }
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/admin/users/:id/edit',
               name: 'Users Edit',
               component: () => import('./views/admin/users/Edit.vue'),
               meta: {
                  pageTitle: 'Users Edit',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Users', url: '/admin/users/', active: true },
                     { title: 'Edit', active: true }
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/admin/domains',
               name: 'Domains List',
               component: () => import('./views/admin/domains/List.vue'),
               meta: {
                  pageTitle: 'Domains List',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Domain', active: true },
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/admin/domains/add',
               name: 'Domains Add',
               component: () => import('./views/admin/domains/Add.vue'),
               meta: {
                  pageTitle: 'Domains Add',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Domain', url: '/admin/domains/', active: true },
                     { title: 'Add', active: true }
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/admin/domains/import',
               name: 'Domains Imports',
               component: () => import('./views/admin/domains/Import.vue'),
               meta: {
                  pageTitle: 'Domains Import',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Domain', url: '/admin/domains/', active: true },
                     { title: 'Import', active: true }
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/admin/domains/edit/:id',
               name: 'Domains Edit',
               component: () => import('./views/admin/domains/Edit.vue'),
               meta: {
                  pageTitle: 'Domains Edit',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Domain', url: '/admin/domains/', active: true },
                     { title: 'Edit', active: true }
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/admin/promos',
               name: 'Promos',
               component: () => import('./views/admin/promos/List.vue'),
               meta: {
                  pageTitle: 'Promos',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Promos', url: '/admin/promos/', active: true },
                     { title: 'Add', active: true }
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin';
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/admin/promos/create',
               name: 'Promos Add',
               component: () => import('./views/admin/promos/Add.vue'),
               meta: {
                  pageTitle: 'Promos Add',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Promos', url: '/admin/promos/', active: true },
                     { title: 'Add', active: true }
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin';
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/admin/promos/:id/edit',
               name: 'Promos Edit',
               component: () => import('./views/admin/promos/Edit.vue'),
               meta: {
                  pageTitle: 'Promos Edit',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Promos', url: '/admin/promos/', active: true },
                     { title: 'Edit', active: true }
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
            {
               path: '/admin/settings',
               name: 'Settings',
               component: () => import('./views/admin/Settings.vue'),
               meta: {
                  pageTitle: 'Settings',
                  breadcrumb: [
                     { title: 'Home', url: '/' },
                     { title: 'Admin', active: true },
                     { title: 'Settings', url: '/admin/settings/', active: true },
                     { title: 'Edit', active: true }
                  ],
                  authRequired: true,
                  isAdmin: true
               },
               beforeEnter: (to, from, next) => {
                  let isAdmin = store.getters['getUserType'] === 'admin'
                  if (to.meta.isAdmin && isAdmin) {
                     next()
                  } else {
                     next("/")
                  }
               }
            },
         ],
      },
      // =============================================================================
      // FULL PAGE LAYOUTS
      // =============================================================================
      {
         path: '',
         component: () => import('@/layouts/full-page/FullPage.vue'),
         children: [
            // =============================================================================
            // PAGES
            // =============================================================================
            {
               path: '/pay',
               name: 'Pay',
               component: () => import('@/views/pay/Pay.vue')
            },
            {
               path: '/login',
               name: 'Login',
               component: () => import('@/views/login/Login.vue')
            },
            {
               path: '/forgotpassword',
               name: 'Forgot Password',
               component: () => import('@/views/login/ForgotPassword.vue')
            },
            {
               path: 'password/reset/:token',
               name: 'Reset Password',
               component: () => import('@/views/login/ResetPassword.vue')
            },
            {
               path: '/register',
               name: 'Register',
               component: () => import('@/views/login/Register.vue')
            },
            {
               path: '/email/verify/:id',
               name: 'Verify',
               component: () => import('@/views/login/Verify.vue')
            },
            {
               path: '/pages/error-404',
               name: 'page-error-404',
               component: () => import('@/views/pages/Error404.vue')
            },
         ]
      },
      // Redirect to 404 page, if no match found
      {
         path: '*',
         redirect: '/pages/error-404'
      }
   ],
})

router.afterEach(() => {
   // Remove initial loading
   const appLoading = document.getElementById('loading-bg')
   if (appLoading) {
      appLoading.style.display = "none";
   }
})



router.beforeEach((to, from, next) => {
   var cookieTokenID = window.$cookies.get('_DMt')

   if (
      (
         to.path === "/login" ||
         to.path === "/register" ||
         to.path === "/forgotpassword"
      ) &&
      cookieTokenID !== null
   ) {
      router.push({ path: '/' })
   }

   if (to.meta.authRequired) {
      if (cookieTokenID === null) {
         router.push({ path: '/login', query: { to: to.path } })
      }
   }

   return next()
})

export default router
