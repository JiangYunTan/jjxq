// node.js 内置模块 用来获取路径
const path = require('path')

module.exports = {
  devServer: {
    open: true,
    port: 8080
  },
  lintOnSave: true,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 可以 通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${path.resolve(__dirname, 'src/assets/style/cover.less')}";`
        }
      }
    }
  }
}
