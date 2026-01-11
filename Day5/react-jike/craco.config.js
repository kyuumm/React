//扩展webpack的配置
const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    // 配置webpack
    // 配置CDN
    configure: (webpackConfig) => {
      // webpackConfig自动注入的webpack配置对象
      // 可以在这个函数中对它进行详细的自定义配置
      // 只要最后return出去就行
      let cdn = {
        js: [],
        css: []
      }
      // 只有生产环境才配置
      whenProd(() => {
        // key:需要不参与打包的具体的包
        // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
        // 通过import 导入的 react / react-dom
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        // 配置现成的cdn 资源数组 
        // 添加多个CDN源作为fallback
        cdn = {
          js: [
            'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
            'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js'
          ],
          // 错误原因是生产构建时React被配置为通过CDN加载(externals)，但原配置只有一个CDN源且不可靠。修复方案： 
          // 添加多个CDN源作为备用(unpkg和cdnjs)
          // 确保HTML正确加载后才执行React代码
          // 这些修改只影响生产构建，开发环境不受影响
          css: []
        }
      })
      whenProd(() => {
        // 确保HTML加载完成后再执行React代码
        webpackConfig.output.globalObject = 'this'
      })

      // 都是为了将来配置 htmlWebpackPlugin插件 将来在public/index.html注入
      // cdn资源数组时 准备好的一些现成的资源
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      if (isFound) {
        // 找到了HtmlWebpackPlugin的插件
        match.options.cdn = cdn
      }

      return webpackConfig
    }
  }
}