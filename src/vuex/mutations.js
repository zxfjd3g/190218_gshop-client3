/* 
包含n个用于直接修改状态数据的方法的对象
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS
} from "./mutation-types"

export default {
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },

  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
  
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

  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
}