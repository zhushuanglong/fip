// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: '',
    // assetsPublicPath: '//yun.duiba.com.cn/',
    assetsPublicPath: './',
    productionSourceMap: false, // 设为true生成map可以作调试
    // productionGzip: false,
    // productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3389,
    autoOpenBrowser: false, // 自动打开浏览器
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/api/list-items': {
      //   target: 'https://cod.fridayin.com',
      //   changeOrigin: true, // 是否跨域
      //   secure: false
      // },
      // '/api/query-item': {
      //   target: 'https://cod.fridayin.com',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/api/confirm-order': {
      //   target: 'https://cod.fridayin.com',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/api/place-order': {
      //   target: 'https://cod.fridayin.com',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/api/order-success': {
      //   target: 'https://cod.fridayin.com',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/img': {
      //   target: 'https://cod.fridayin.com',
      //   changeOrigin: true,
      //   secure: false,
      //   pathRewrite: {
      //     '^/img': '/img'//需要rewrite重写
      //   }
      // }
    },
    cssSourceMap: false,
  }
};

