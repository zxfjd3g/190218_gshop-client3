/* 
一个能发送ajax请求的函数
1. 统一处理请求异常
2. 异步请求成功的数据不是response, 而是response.data
3. 对post请求参数进行ulencode处理, 而不使用默认的json方式(后台接口不支持)
4. 配置请求超时的时间
*/

import axios from 'axios'
import qs from 'qs'

import store from '../vuex/store'
import router from '../router'

// 请求超时的全局配置
axios.defaults.timeout = 20000 // 20s

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  debugger
  const {method, data} = config  
  // 如果是携带数据的post请求, 进行处理
  if (method.toLowerCase()==='post' && data && typeof data==='object') {
    config.data = qs.stringify(data) // {name: 'tom', pwd: '123'} ==> name=tom&pwd=123
  }

  const { needAuth } = config.headers
  if (needAuth) {
    // 如果浏览器有token, 就自动携带上token
    const token = store.state.token
    if (token) {
      config.headers.Authorization = token
    } else {
      const error = new Error('没有权限, 不能发请求')
      error.status = 401
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

  if (!error.response) {
    if (error.status===401) {
      if (router.currentRoute.path !== '/login') {
        console.log('请求前未授权, 跳转到登陆')
        // 退出登陆
        router.replace('/login')
        alert(error.message)
      } else {
        console.log('请求前未授权, 但已跳转')
      }
    } else {
      console.log('error', error)
    }
    
  } else {
    const status = error.response.status
    const msg = error.message
    if (status === 401) { // 未授权
      if (router.currentRoute.path !== '/login') {
        console.log('请求后未授权, 跳转到登陆')
        // 退出登陆
        store.dispatch('logout')
        router.replace('/login')
        alert(error.response.data.message)
      } else {
        console.log('请求后未授权, 但已跳转')
      }
    } else if (status === 404) {
      alert('请求的资源不存在')
    } else {
      alert('请求异常: ' + msg)
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