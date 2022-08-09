import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import router, { resetRouter } from '@/router'
import { useStore } from 'vuex'

const store = useStore()

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
  email: string
}

export const user = {
  state: () => {
    return {
      token: getToken() || '',
      name: '',
      avatar: '',
      introduction: '',
      roles: [] as string[],
      email: '',
    }
  },
  mutations: {
    SET_TOKEN(state: any, token: string) {
      state.token = token
    },
    SET_NAME(state: any, name: string) {
      state.name = name
    },
    SET_AVATAR(state: any, avatar: string) {
      state.avatar = avatar
    },
    SET_INTRODUCTION(state: any, introduction: string) {
      state.introduction = introduction
    },
    SET_ROLES(state: any, roles: string[]) {
      state.roles = roles
    },
    SET_EMAIL(state: any, email: string) {
      state.email = email
    }
  },
  actions: {
    async Login(context: any, userInfo: { username: string, password: string}) {
      let { username, password } = userInfo
      username = username.trim()
      const { data } = await login({ username, password })
      setToken(data.accessToken)
      context.commit('SET_TOKEN', data.accessToken)
    },
    ResetToken(context: any) {
      removeToken()
      context.commit('SET_TOKEN', '')
      context.commit('SET_ROLES')
    },
    async GetUserInfo(context: any) {
      if (context.state.token === '') {
        throw Error('GetUserInfo: token is undefined!')
      }
      const { data } = await getUserInfo({ /* Your params here */ })
      if (!data) {
        throw Error('Verification failed, please Login again.')
      }
      const { roles, name, avatar, introduction, email } = data.user
      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        throw Error('GetUserInfo: roles must be a non-null array!')
      }
      context.commit('SET_ROLES', roles)
      context.commit('SET_NAME', name)
      context.commit('SET_AVATAR', avatar)
      context.commit('SET_INTRODUCTION', introduction)
      context.commit('SET_EMAIL', email)
    },
    async ChangeRoles(context: any, role: string) {
      // Dynamically modify permissions
      const token = role + '-token'
      context.commit('SET_TOKEN', token)
      setToken(token)
      await context.dispatch('GetUserInfo')
      resetRouter()
      // Generate dynamic accessible routes based on roles
      store.dispatch('GenerateRoutes', context.state.roles)
      // Add generated routes
      store.getters.dynamicRoutes.forEach((route: any) => {
        router.addRoute(route)
      })
      // Reset visited views and cached views
      store.dispatch('delAllViews')
    },
    async LogOut(context: any) {
      if (context.state.token === '') {
        throw Error('LogOut: token is undefined!')
      }
      await logout()
      removeToken()
      resetRouter()
  
      // Reset visited views and cached views
      store.dispatch('delAllViews')
      context.commit('SET_TOKEN', '')
      context.commit('SET_ROLES', [])
    }
  }
}