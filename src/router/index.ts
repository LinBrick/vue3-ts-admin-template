import {createRouter, RouteRecordRaw, createWebHistory} from 'vue-router'

  const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '首页'
    }
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


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to: any, from: any ,next: any) => {
  to.meta.title && (document.title = `${to.meta.title} - Vue3 ts admin template`)
  next()
})

export default router