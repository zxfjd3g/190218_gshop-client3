<template>
  <div>
    <h2>Event1组件</h2>
    <span>{{msg}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

    data () {
      return {
        msg: 'abc'
      }
    },

    mounted () {
      // 通过全局事件总线绑定自定义事件监听
      this.$bus.$on('eventName', (data) => {
        this.msg = data
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
