<template>
  <div>
    <input type="text" v-model="name"> 
    <span>{{name}}</span>
    <br>
    <!-- 
      $event: 代表分发事件时传递的数据
      浏览器自动分发事件时, 会传递一个包含所有相关事件数据的对象(event)
     -->
    <input type="text" :value="name2" @input="name2=$event.target.value"> 
    <span>{{name2}}</span>

    <hr>

    <MyInput v-model="name3"></MyInput>
    <span>{{name3}}</span>
    <MyInput :value="name4" @input="name4=$event"></MyInput>
    <span>{{name4}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  import MyInput from './MyInput.vue'
  export default {
    data () {
      return {
        name: 'tom',
        name2: 'Jack',
        name3: 'Bob',
        name4: 'Cat'
      }
    },

    methods: {
      test (event) {

      }
    },

    components: {
      MyInput
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

 
</style>
