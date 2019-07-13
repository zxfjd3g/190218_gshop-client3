/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../vuex/store";

import routes from './routes'

// 声明使用vue插件
Vue.use(VueRouter)

const router = new VueRouter({ // 配置对象
  // mode: 'history', // 没有#
  // 配置应用中所有路由
  routes
})

// 所有需要检查的路径的数组
const paths = ['/a', '/b']

/* 进入a/b必须登陆, 如果没有登陆自动跳转到登陆 */
// 定义全局前置守卫
router.beforeEach((to, from, next) => {

  // 如果请求的是需要检查的路由路径, 如果用户没有登陆, 跳转到登陆界面
  if (paths.indexOf(to.path)!==-1) {
    if (!store.state.user.token) {
      return next('/login')
    }
  }

  // 放行
  next()
})

export default router