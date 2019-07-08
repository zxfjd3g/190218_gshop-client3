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
  url: BASE + '/index_category'
})

// 根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax({
  method: 'GET',
  url: BASE + '/shops',
  params: { latitude, longitude }
})