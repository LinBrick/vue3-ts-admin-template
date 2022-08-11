import { useStore } from 'vuex'

const store = useStore()

export const getters = {
  token(state: any) {
    return state.user.token
  },
  roles(state: any) {
    return state.user.roles
  },
  dynamicRoutes(state: any) {
    return state.permission.dynamicRoutes
  }
}