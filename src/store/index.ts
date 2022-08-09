import { createStore } from 'vuex'

import { app } from './modules/app'
import { errorLog } from './modules/error-log'
import { permission } from './modules/permission'
import { settings } from './modules/settings'
import { tagsView } from './modules/tags-view'
import { user } from './modules/user'
import { getters } from './getters'

export default createStore({
  modules: {
    app,
    errorLog,
    permission,
    settings,
    tagsView,
    user
  },
  getters
})