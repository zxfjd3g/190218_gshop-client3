/* 
一个能发送ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
*/

import axios from 'axios'
// const qs = require('qs')
import qs from 'qs'
import { Toast } from 'mint-ui'

import store from '../vuex/store'
import router from '../router'

// 请求超时的全局配置
axios.defaults.timeout = 20000 // 20s

// 添加请求拦截器
axios.interceptors.request.use((config) => {

  const {method, data} = config  
  // 如果是携带数据的post请求, 进行处理
  if (method.toLowerCase()==='post' && data && typeof data==='object') {
    config.data = qs.stringify(data) // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
  }

  // 如果请求配置标识了需要携带token
  const { needToken } = config.headers
  if (needToken) {
    // 取出state中的token
    const token = store.state.user.token
    // 如果token有值, 添加授权的头, 值为token
    if (token) {
      config.headers.Authorization = token
    } else {
      // 抛出异常, 直接进行错误处理流程(不发请求)
      const error = new Error('没有token, 不用发请求')
      error.status = 401 // 添加一个标识
      throw error
    }
  }


  return config;
});


// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  // 返回response中的data数据, 这样请求成功的数据就是data了
  return response.data
}, error => {// 请求异常

  // 发请求前的异常
  if (!error.response) {
    if (error.status===401) { // 发需要授权的请求前发现没有token(没有登陆)
      // 如果当前没在登陆界面
      if (router.currentRoute.path!=='/login') {
        router.replace('/login')
        Toast(error.message)
      } else {
        console.log('没有token, 请求前取消的请求, 已在login, 不需要跳转')
      }
    }
  // 发请求后的异常
  } else {
    const status = error.response.status
    const msg = error.message
    if (status === 401) { // 授权过期
      if (router.currentRoute.path !== '/login') {
        // 退出登陆
        store.dispatch('logout')
        router.replace('/login')
        Toast(error.response.data.message)
      } else {
        console.log('token过期的请求, 已在login')
      }
      
    } else if (status === 404) {
      Toast('请求的资源不存在')
    } else {
      Toast('请求异常: ' + msg)
    }
  }
  

  

  // return error
  // return Promise.reject(error)
  return new Promise(() => {})  // 中断promise链
})

export default axios


/* axios.get('/api/test_get',  {
  params: {name: '张三', pwd: '456'}
}) */
/* axios.post('/api/test_post', {name: 'Tom', pwd: '123'})
  .then(data => {
    console.log('请求成功', data)
  }) */
/* axios.post('/baidu/test_post', {name: 'Tom', pwd: '123'})
  .then(data => {
    console.log('请求成功', data)
  })
  .catch(error => {
    console.log('请求异常', error.message)
  })
 */