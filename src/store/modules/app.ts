import { getSidebarStatus, getSize, setSidebarStatus, setLanguage, setSize } from '@/utils/cookies'
import { getLocale } from '@/lang'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  size: string
}

export const app = {
  state: () => {
    return {
      sidebar: {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false
      },
      device: DeviceType.Desktop,
      language: getLocale(),
      size: getSize()
    }
  },
  mutations: {
    TOGGLE_SIDEBAR(state: any, withoutAnimation: boolean) {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = withoutAnimation
      if (state.sidebar.opened) {
        setSidebarStatus('opened')
      } else {
        setSidebarStatus('closed')
      }
    },
    CLOSE_SIDEBAR(state: any, withoutAnimation: boolean) {
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
      setSidebarStatus('closed')
    },
    TOGGLE_DEVICE(state: any, device: DeviceType) {
      state.device = device
    },
    SET_LANGUAGE(state: any, language: string) {
      state.language = language
      setLanguage(state.language)
    },
    SET_SIZE(state: any, size: string) {
      state.size = size
      setSize(state.size)
    }
  },
  actions: {
    ToggleSideBar(context: any, withoutAnimation: boolean) {
      context.commit('TOGGLE_SIDEBAR', withoutAnimation)
    },
    CloseSideBar(context: any, withoutAnimation: boolean) {
      context.commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice(context: any, device: DeviceType) {
      context.commit('TOGGLE_DEVICE', device)
    },
    SetLanguage(context: any, language: string) {
      context.commit('SET_LANGUAGE', language)
    },
    SetSize(context: any, size: string) {
      context.commit('SET_SIZE', size)
    }
  }
}