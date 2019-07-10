/* 
管理用户模块的
*/
import {
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,
} from "../mutation-types"

import {
  reqAutoLogin
} from '../../api'

const state = {
  user: {}, // 登陆用户信息对象
  token: localStorage.getItem('token_key'),
}
const mutations = {
  [RECEIVE_USER](state, {user}) {
    state.user = user
  },

  [RECEIVE_TOKEN](state, {token}) {
    state.token = token
  },

  [RESET_USER](state) {
    state.user = {}
  },

  [RESET_TOKEN](state) {
    state.token = ''
  },
  zzz(state) {

  }
}
const actions = {
  /* 
  记录user: 
    持久化保存token
    在state中保存user
  */
  recordUser ({commit}, user) {
    // 将user的token保存到localStorage中
    localStorage.setItem('token_key', user.token)
    // 将token保存到state中
    commit(RECEIVE_TOKEN, { token: user.token })
    // 将user保存到state中
    delete user.token
    commit(RECEIVE_USER, { user })
  },

  /* 
  退出登陆
  */
  logout ({commit}) {
    // 重置状态中的user
    commit(RESET_USER)
    // 重置状态中的token
    commit(RESET_TOKEN)
    // 清除local中保存的token
    localStorage.removeItem('token_key')
  },

  /* 
  自动登陆的异步action
  */
  async autoLogin ({commit, state}) {
    // 如果有token, 就发自动登陆的请求获取user
    const token  = state.token
    if (token) {
      const result = await reqAutoLogin()
      if (result.code===0) {
        const user = result.data
        commit(RECEIVE_USER, { user })
      }
    }
  },
}
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}