import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},
  },
  // 获取属性的状态
  getters: {
    //获取登录状态
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
  },
  // 设置属性状态
  mutations: {
    //保存登录状态
    userStatus(state, flag) {
      state.isLogin = flag
    },
    // 保存用户信息
    userInfo(state,data){
      state.userInfo = data;
    }
  },
  // 应用mutations
  actions: {
    //获取登录状态
    setUser({commit}, flag) {
      commit("userStatus", flag)
    },
    //  给状态userinfo赋值
    setUserInfo({commit}, data){
      commit('userInfo',data)
    }
  },
  modules: {
    
  }
})
