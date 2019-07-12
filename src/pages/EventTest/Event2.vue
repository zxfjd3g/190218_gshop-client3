<template>
  <div>
    <h2>Event2组件</h2>
    <button @click="$emit('click', 'atguigu')">分发自定义click事件</button><br>
    <button @click="$emit('xxx', 'baidu')">分发自定义xxx事件</button><br>
    <button @click="sendMsgToEvent1">全局分发自定义xxx事件</button><br>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      sendMsgToEvent1 () {
        // 通过全局事件总线分发自定义事件
        this.$bus.$emit('eventName', 'atguigu')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
