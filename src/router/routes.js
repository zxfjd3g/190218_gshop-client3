// import MSite from '../pages/MSite/MSite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'

/* 
实现过程:
1). 对引入模块进行拆分(单独)打包:  使用import()来引入模块
2).配置的组件是: 返回包含模块的promise的函数, 函数初始不会执行, 请求对应的路径时才执行
作用:
减少首屏加载的js的大小, 提高了效率

*/
const MSite = () => import('../pages/MSite/MSite.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings.vue'

import A from '../pages/test/A.vue'
import B from '../pages/test/B.vue'
import B1 from '../pages/test/B1.vue'
import B2 from '../pages/test/B2.vue'

export default [
  {
    path: '/msite',
    component: MSite, // 组件模块本身 或者 函数(必须返回包含模块的promise)
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: ShopGoods
      },
      {
        path: 'ratings',
        component: ShopRatings
      },
      {
        path: '/shop/info',
        component: ShopInfo
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  },

  {
    path: '/a',
    component: A
  }, {
    path: '/b',
    component: B,
    children: [{
        path: '/b/b1',
        component: B1
      },
      {
        path: '/b/b2',
        component: B2
      },
    ]
  },

  {
    path: '/', // 项目根路径
    redirect: '/msite'
  }
]