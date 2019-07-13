<template>
  <div>
    <h2>动态组件</h2>
    <button @click="toggle">切换</button>

    <component :is="curentComp"/>

    <h2>缓存组件</h2>
    <keep-alive>
      <component :is="curentComp"/>
    </keep-alive>
    

    <h2>异步组件</h2>
    <async-component></async-component>
    <async-component2/>
    <async-component3></async-component3>
    <async-component4></async-component4>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import DynamicComponent1 from './DynamicComponent'
  import DynamicComponent2 from './DynamicComponent2'

  // 定义全局组件为一个异步工厂函数
  Vue.component('async-component', function (resolve, reject) {
    setTimeout(function () {
      // 将组件定义对象(component definition)传递给 resolve 回调函数
      resolve({
        data () {
          return {
            a: 111
          }
        },
        template: '<div>I am async  {{a}}!</div>'
      })
    }, 1000)
  })

  Vue.component('async-component2', function (resolve) {
    // 这个特殊的 require 语法
    // 将指示 webpack 自动将构建后的代码，
    // 拆分到不同的 bundle 中，然后通过 Ajax 请求加载。
    setTimeout(() => {
      require(['./AsyncComponent1.vue'], resolve)
    }, 1000);
  })

  Vue.component('async-component3', () => import('./AsyncComponent2.vue'))

  

  export default {
    name: 'ComponentTest',

    data () {
      return {
        curentComp: 'DynamicComponent2'
      }
    },

    methods: {
      toggle () {
        this.curentComp = this.curentComp==='DynamicComponent1' ? 'DynamicComponent2' : 'DynamicComponent1'
      }
    },

    components: {
      DynamicComponent1,
      DynamicComponent2,
      'async-component4': () => import('./AsyncComponent2.vue')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
