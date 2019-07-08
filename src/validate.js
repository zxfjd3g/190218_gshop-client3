import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate) // 内部定义一个全局指令: validate

// 提示信息本地化
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    name: '用户名',
    phone: '手机号',
    code: '验证码'
  }
})

// 自定义验证规则
VeeValidate.Validator.extend('mobile', {
  validate: value => {
    return /^1\d{10}$/.test(value)
  },
  getMessage: field => field + '必须是11位手机号码'
})

