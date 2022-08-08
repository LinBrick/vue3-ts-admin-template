import {createRouter, RouteRecordRaw, createWebHistory} from 'vue-router'

  const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '首页'
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