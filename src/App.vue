<template>
  <div>
    <router-view/>
    <FooterGuide v-show="$route.meta.isShowFoot"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import FooterGuide from './components/FooterGuide/FooterGuide'
  import {reqUser} from './api'
  import {RECEIVE_USER} from './vuex/mutation-types'

  export default {
    name: 'App',

    data () {
      return {
        m: 1
      }
    },

    async mounted () {
    },

    components: {
      FooterGuide
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>

