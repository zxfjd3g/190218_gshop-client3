/* 
管理商家模块的
*/
import Vue from 'vue'
import {
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
} from "../mutation-types"

import {
  reqInfo,
  reqGoods,
  reqRatings
} from '../../api'

const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods: [] // 购物车food数组
}
const mutations = {
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  [ADD_FOOD_COUNT](state, food) {
    // food.name = 'xxx'
    if (!food.hasOwnProperty('count')) {
    // if (!food.count) {
      // 给food对象添加一个新的属性: 属性名为count, 属性值为1
      // food.count = 1 // 新添加的属性没有数据绑定
      // 为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新
      Vue.set(food, 'count', 1)
      // 将food添加到cartFoods中
      state.cartFoods.push(food)
    } else {
      food.count++
    }
    
  },

  [REDUCE_FOOD_COUNT](state, food) {
    if (food.count>0) {
      food.count--
      // 如果count减为了0, 从cartFoods中删除此food
      if (food.count===0) {
        delete food.count
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_CART](state) {
    // 将所有food的count置为0
    state.cartFoods.forEach(food => food.count = 0)
    // 清除购物车中所有food
    state.cartFoods = []
  },


}
const actions = {
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

  updateFoodCount ({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(ADD_FOOD_COUNT, food)
    } else {
      commit(REDUCE_FOOD_COUNT, food)
    }
  }
}
const getters = {
  /*  // 每次有改变都需要遍历所有food
  cartFoods (state) {
    const foods = []
    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if (food.count > 0) {
          foods.push(food)
        }
      })
    });
    return foods
  } */
  // 总数量
  totalCount (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
  // 总价格
  totalPrice (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  },

  /*
  总商家评论数
   */
  totalRatingsCount(state) {
      return state.ratings.length
    },

    /*
    总商家推荐评论数
     */
    positiveRatingsCount(state) {
      return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
    }
}

export default {
  state,
  mutations,
  actions,
  getters
}