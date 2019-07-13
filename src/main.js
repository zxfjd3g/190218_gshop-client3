import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import store from './vuex/store'
import './validate'

Vue.config.productionTip = false

// 注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component(Button.name, Button) // mt-button

// 创建vm作为全局事件总线对象: 
Vue.prototype.$bus = new Vue()  // 所有组件对象都可以直接访问$bus

/* eslint-disable no-new */
new Vue({
  el: '#app2',
  // components: { App },
  // template: '<App/>',
  render: h => h(App),
  router, // 配置路由器
  store, // 配置vuex的store
})
