const state = {
  userName: '',
  password: ''
}

const mutations = {
  setUserName(state, data) {
    state.userName = data
  },
  setPassword(state, data) {
    state.password = data
  }
}

const actions = {
  // 登录
  handleLogin({ state, commit }, { userName, password }) {
    // this.$store.dispatch('handleLogin', {userName: '姓名', password: '密码'})
    commit('setUserName', userName)
    commit('setPassword', password)
  },
}

export default {
  state,
  mutations,
  actions
}
