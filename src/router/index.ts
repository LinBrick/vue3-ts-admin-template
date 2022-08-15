import {createRouter, RouteRecordRaw, createWebHistory} from 'vue-router'
/* Layout */
import Layout from '@/layout/index.vue'

export const constantRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Dashboard',
  //   component: () => import('@/views/dashboard/index.vue'),
  //   meta: {
  //     title: '首页'
  //   }
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  }
]

export const asyncRoutes: Array<RouteRecordRaw> = [
  
]


const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

// router.beforeEach((to: any, from: any ,next: any) => {
//   to.meta.title && (document.title = `${to.meta.title} - Vue3 ts admin template`)
//   next()
// })

export function resetRouter() {
  const newRouter = router;
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router