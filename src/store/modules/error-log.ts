interface IErrorLog {
  err: Error
  vm: any
  info: string
  url: string
}

export interface IErrorLogState {
  logs: IErrorLog[]
}

export const errorLog = {
  state: () => {
    return {
      logs: [] as IErrorLog[]
    }
  },
  mutations: {
    ADD_ERROR_LOG(state: any, log: IErrorLog) {
      state.logs.push(log)
    },
    CLEAR_ERROR_LOG(state: any) {
      state.logs.splice(0)
    }
  },
  actions: {
    AddErrorLog(context: any, log: IErrorLog) {
      context.commit('ADD_ERROR_LOG', log)
    },
    ClearErrorLog(context: any) {
      context.commit('CLEAR_ERROR_LOG')
    }
  }
}