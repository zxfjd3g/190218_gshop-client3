/*
包含N个接口请求函数的模块
函数的返回值是promise对象
*/
import ajax from './ajax'

const BASE = '/api'

// 1、根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(BASE + `/position/${latitude},${longitude}`)

// 2. 获取食品分类列表
export const reqCategorys = () => ajax(BASE + '/index_category')

// 3. 根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(BASE + '/shops', {latitude, longitude})


// 请求百度的某个接口: /xxx
export const reqBaiduXxx = () => ajax('/baidu/xxx')

// 4. 发送短信验证码
export const reqSendCode = (phone) => ajax(BASE + '/sendcode', {phone})

// 5. 手机号/验证码登陆
export const reqSmsLogin = (phone, code) => ajax(BASE + '/login_sms', {phone, code}, 'POST')

// 6. 用户名/密码/验证码登陆
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE + '/login_pwd', {name, pwd, captcha}, 'POST')

// 7. 获取登陆用户的信息
export const reqUser = () => ajax(BASE + '/userinfo')

// 8. 退出登陆
export const reqLogout = () => ajax(BASE + '/logout')
