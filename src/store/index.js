import {createStore} from 'vuex'
import user from './modules/user'

export default createStore({
  state: {
    storeTest: 'vuex测试'
  },
  mutations: {
    mutateStoreTest(state, data) {
      state.storeTest = data
    }
  },
  actions: {
    actStoreTest({commit, data}) {
      commit('mutateStoreTest', data)
    }
  },
  modules: {
    user
  }
})
