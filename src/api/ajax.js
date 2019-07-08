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

  // 如果浏览器有tokden, 就自动携带上token
  const token = localStorage.getItem('token_key')
  if (token) {
    config.headers.Authorization = 'token ' + token
  }

  return config;
});


// 添加一个响应拦截器
axios.interceptors.response.use(response => {
  // 返回response中的data数据, 这样请求成功的数据就是data了
  return response.data
}, error => {// 请求异常

  const status = error.response.status
  const msg = error.message
  if (status === 401) { // 未授权
    // 退出登陆
    store.dispatch('logout')
    router.replace('/login')
    alert(error.response.data.message)
  } else if (status === 404) {
    alert('请求的资源不存在')
  } else {
    alert('请求异常: ' + msg)
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