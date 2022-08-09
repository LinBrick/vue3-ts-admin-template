import { asyncRoutes, constantRoutes } from '@/router'

const hasPermission = (roles: string[], route: any) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export const filterAsyncRoutes = (routes: any[], roles: string[]) => {
  const res: any[] = []
  routes.forEach(route => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export interface IPermissionState {
  routes: any[]
  dynamicRoutes: any[]
}

export const permission = {
  state: () => {
    return {
      routes: [] as any[],
      dynamicRoutes: [] as any[]
    }
  },
  mutations: {
    SET_ROUTES(state: any, routes: any[]) {
      state.routes = constantRoutes.concat(routes)
      state.dynamicRoutes = routes
    }
  },
  actions: {
    GenerateRoutes(context: any, roles: string[]) {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      context.commit('accessedRoutes')
    }
  }
}