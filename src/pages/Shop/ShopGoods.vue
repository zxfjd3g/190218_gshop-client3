<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="leftWrapper">
        <ul ref="leftUl">
          <!-- current  currentIndex=1-->
          <li class="menu-item" v-for="(good, index) in goods" :key="good.name" 
            :class="{current: currentIndex===index}" @click="clickItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="rightWrapper">
        <ul ref="rightUl">
          <li  class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="food in good.foods" :key="food.name">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import { mapState } from 'vuex'
  export default {
    name: 'ShopGoods',
    data () {
      return {
        scrollY: 0, // 右侧滑动的坐标: srollY, 初始为0, 滑动右侧时不断更新
        tops: [], // 右侧所有分类li的top的数组: tops, 初始值为[], 列表数据显示之后统计tops
      }
    },
    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),

      // 当前分类的下标
      currentIndex () {
        const {scrollY, tops} = this
        // 计算出最新的下标
        const index = tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])
        // 如果index有变化
        if (index!==this.index && this.leftScroll) {
          // 保存index
          this.index = index
          // 在当前分类发生变化时, 让右侧列表滑动当前分类处
          const li = this.$refs.leftUl.children[index]
          this.leftScroll.scrollToElement(li, 300)
        }

        return index
      }
    },

    watch: {
      goods () {
        this.$nextTick(() => {// 列表显示之后
          this.initScroll()
          this.initTops()
        })
      }
    },

    methods: {
      // 初始化滚动
      initScroll () {
        this.leftScroll = new BScroll(this.$refs.leftWrapper, {
          click: true, // 标识分发点击事件
        })
        this.rightScroll = new BScroll(this.$refs.rightWrapper, {
          // probeType: 3, // 触摸/惯性/编码 高频(实时)
          // probeType: 2, // 触摸   高频(实时)
          probeType: 1, // 触摸   低频(非实时)
          click: true, // 标识分发点击事件
        })

        // 绑定滚动的监听
        this.rightScroll.on('scroll', ({x, y}) => {
          console.log('scroll', x, y)
          this.scrollY = Math.abs(y)
        })
        // 绑定滚动结束的监听
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          console.log('scrollEnd', x, y)
          this.scrollY = Math.abs(y)
        })
      },

      initTops () {
        const tops = []
        let top = 0
        tops.push(top)
        // 遍历所有右侧分类li
        const lis = this.$refs.rightUl.children
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        // 更新tops数据
        this.tops = tops
        console.log('tops', tops)
      },

      clickItem (index) {
        const top = this.tops[index]
        // 让当前分类项立即变化
        this.scrollY = top
        // 让右侧列表滑动到对应的位置
        this.rightScroll.scrollTo(0, -top, 300)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
