import elementVariables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'

export interface ISettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

export const settings = {
  state: () => {
    return {
      theme: elementVariables.theme,
      fixedHeader: elementVariables.fixedHeader,
      showSettings: elementVariables.showSettings,
      showTagsView: elementVariables.showTagsView,
      showSidebarLogo: elementVariables.showSidebarLogo,
      sidebarTextTheme: defaultSettings.sidebarTextTheme,
    }
  },
  mutations: {
    CHANGE_SETTING(state: any, payload: { key: string, value: any }) {
      const { key, value } = payload
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        (state as any)[key] = value
      }
    }
  },
  actions: {
    ChangeSetting(context: any, payload: { key: string, value: any}) {
      context.commit('CHANGE_SETTING', payload)
    }
  }
}