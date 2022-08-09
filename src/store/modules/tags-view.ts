export interface ITagsViewState {
  visitedViews: any[]
  cachedViews: (string | undefined)[]
}

export const tagsView = {
  state: () => {
    return {
      visitedViews: [],
      cachedViews: [] as (string | undefined)[]
    }
  },
  mutations: {
    ADD_VISITED_VIEW(state: any, view: any) {
      if (state.visitedViews.some((v: any) => v.path === view.path)) return
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name'
        })
      )
    },
    ADD_CACHED_VIEW(state: any, view: any) {
      if (view.name === null) return
      if (state.cachedViews.includes(view.name)) return
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_VISITED_VIEW(state: any, view: any) {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_CACHED_VIEW(state: any, view: any) {
      if (view.name === null) return
      const index = state.cachedViews.indexOf(view.name)
      index > -1 && state.cachedViews.splice(index, 1)
    },
    DEL_OTHERS_VISITED_VIEWS(state: any, view: any) {
      state.visitedViews = state.visitedViews.filter((v: any) => {
        return v.meta.affix || v.path === view.path
      })
    },
    DEL_OTHERS_CACHED_VIEWS(state: any, view: any) {
      if (view.name === null) return
      const index = state.cachedViews.indexOf(view.name)
      if (index > -1) {
        state.cachedViews = state.cachedViews.slice(index, index + 1)
      } else {
        // if index = -1, there is no cached tags
        state.cachedViews = []
      }
    },
    DEL_ALL_VISITED_VIEWS(state: any) {
      // keep affix tags
      const affixTags = state.visitedViews.filter((tag: any) => tag.meta.affix)
      state.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS(state: any) {
      state.cachedViews = []
    },
    UPDATE_VISITED_VIEW(state: any, view: any) {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    }
  },
  actions: {
    ChangeSetting(context: any, payload: { key: string, value: any}) {
      context.commit('CHANGE_SETTING', payload)
    },
    addView(context: any, view: any) {
      context.commit('ADD_VISITED_VIEW', view)
      context.commit('ADD_CACHED_VIEW', view)
    },
    addVisitedView(context: any, view: any) {
      context.commit('ADD_VISITED_VIEW', view)
    },
    delView(context: any, view: any) {
      context.commit('DEL_VISITED_VIEW', view)
      context.commit('DEL_CACHED_VIEW', view)
    },
    delCachedView(context: any, view: any) {
      context.commit('DEL_CACHED_VIEW', view)
    },
    delOthersViews(context: any, view: any) {
      context.commit('DEL_OTHERS_VISITED_VIEWS', view)
      context.commit('DEL_OTHERS_CACHED_VIEWS', view)
    },
    delAllViews(context: any) {
      context.commit('DEL_ALL_VISITED_VIEWS')
      context.commit('DEL_ALL_CACHED_VIEWS')
    },
    delAllCachedViews(context: any) {
      context.commit('DEL_ALL_CACHED_VIEWS')
    },
    updateVisitedView(context: any, view: any) {
      context.commit('UPDATE_VISITED_VIEW')
    }
  }
}