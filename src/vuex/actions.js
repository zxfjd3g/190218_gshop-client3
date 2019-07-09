/* 
包含n个用于间接修改状态数据的方法的对象
*/
// import Cookies from 'js-cookie'
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin,
  reqInfo,
  reqGoods,
  reqRatings
} from '../api'

import { 
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS
} from "./mutation-types"

export default {
  
  /* 
  获取当前地址的异步action
  */
  async getAddress({commit, state}) {
    const { longitude, latitude } = state
    // 发异步ajax请求
    const result = await reqAddress(longitude, latitude)
    // 有了结果后, 提交mutation
    if (result.code===0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, address)
    }
  },

  /* 
  获取分类列表的异步action
  */
  async getCategorys({commit}, callback) {
    // 发异步ajax请求
    const result = await reqCategorys()
    // 有了结果后, 提交mutation
    if (result.code===0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
      // 在更新状态数据后执行回调函数
      typeof callback === 'function' && callback() // 发通知
    }
  },

  /* 
  获取商家列表的异步action
  */
  async getShops({commit, state}) {
    const { longitude, latitude } = state
    // 发异步ajax请求
    const result = await reqShops({longitude, latitude})
    // 有了结果后, 提交mutation
    if (result.code===0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },

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

  // 异步获取商家信息
  async getShopInfo({commit}, cb) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
      cb && cb()
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}, cb) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      cb && cb()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, cb) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      cb && cb()
    }
  },
}