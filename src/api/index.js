/* 
包含n个接口请求函数的模块
每个函数返回的都是promise
*/
import ajax from './ajax'

const BASE = '/api'

// 根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax.get(BASE + `/position/${latitude},${longitude}`)

// 获取食品分类列表
export const reqCategorys = () => ajax({
  method: 'GET',
  url: BASE + '/index_category',
  headers: {
    needToken: true
  }
})

// 根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax({
  method: 'GET',
  url: BASE + '/shops',
  params: { latitude, longitude },
  headers: {
    needToken: true
  }
})

// 发送短信验证码
export const reqSendCode = (phone) => ajax({
  method: 'GET',
  url: BASE + '/sendcode',
  params: { phone }
})

// 用户名密码登陆
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax({
  method: 'POST',
  url: BASE + '/login_pwd',
  data: {
    name,
    pwd,
    captcha
  }
})

// 手机号/短信登陆
export const reqSmsLogin = (phone, code) => ajax({
  method: 'POST',
  url: BASE + '/login_sms',
  data: {
    phone,
    code
  }
})

/* 
自动登陆的请求
*/
export const reqAutoLogin = () => ajax({
  url: BASE + '/auto_login',
  headers: { needToken: true }
})


export const reqGoods = () => ajax('/goods')
export const reqRatings = () => ajax('/ratings')
export const reqInfo = () => ajax('/info')