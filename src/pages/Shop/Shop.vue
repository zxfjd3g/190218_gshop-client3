<template>
  <div>
    <ShopHeader/>

    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>

    <!-- 缓存所有对应的路由组件对象: 离开时不死亡, 给缓存起来, 再请求时直接使用缓存 -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'

  export default {
    mounted () {
      // 将info从接口中请求获取到了state中
      this.$store.dispatch('getShopInfo')
      this.$store.dispatch('getShopGoods')
      this.$store.dispatch('getShopRatings')
    },

    components: {
      ShopHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
