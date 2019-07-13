const path = require('path')
function resolve(dir) {
  // return path.join(__dirname, '..', dir)
  return path.join(__dirname, dir)
}

module.exports = {
  // 选项...
  devServer: {
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:4000', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      },
      '/baidu': { // 匹配所有以 '/baidu'开头的请求路径
        target: 'http://www.baidu.com', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/baidu'
          '^/baidu': ''
        }
      }
    }
  },

  // 添加webpack的配置
  configureWebpack: {
    resolve: {
      alias: { // 别名
        'vue$': 'vue/dist/vue.esm.js', // 使用vue库带编译器的es版本
        'components': resolve('src/components'),
      }
    }
  },
}