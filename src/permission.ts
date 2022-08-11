import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
import settings from './settings'
import { useStore } from 'vuex'
import store from '@/store'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

const getPageTitle = (to: any) => {
  return to.meta.title ? `${to.meta.title} - ${settings.title}` : settings.title
}

router.beforeEach(async(to: any, _: any, next: any) => {
  // Start progress bar
  NProgress.start()

  // Determine whether the user has logged in
  if (store.getters.token) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // Check whether the user has obtained his permission roles
      if (store.getters.roles.length === 0) {
        try {
          // Note: roles must be a object array! such as: ['admin'] or ['developer', 'editor']
          await store.dispatch('GetUserInfo')
          const roles = store.getters.roles
          // Generate accessible routes map based on role
          store.dispatch('GenerateRoutes', roles)
          // Dynamically add accessible routes
          store.getters.dynamicRoutes.forEach((route: any) => {
            router.addRoute(route)
          })
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err: any) {
          // Remove token and redirect to login page
          store.dispatch('ResetToken')
          ElMessage.error(err || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach((to: any) => {
  // Finish progress bar
  NProgress.done()

  // set page title
  document.title = getPageTitle(to.meta.title)
})
