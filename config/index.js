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
    port: 8881,
    autoOpenBrowser: false, // 自动打开浏览器
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/list-items': {
      //   target: 'http://220.184.255.86:9000',
      //   changeOrigin: true, // 是否跨域
      //   secure: false
      // },
      // '/query-item': {
      //   target: 'http://220.184.255.86:9000',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/confirm-order': {
      //   target: 'http://220.184.255.86:9000',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/place-order': {
      //   target: 'http://220.184.255.86:9000',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/order-success': {
      //   target: 'http://220.184.255.86:9000',
      //   changeOrigin: true,
      //   secure: false
      // },
      // '/img': {
      //   target: 'http://220.184.255.86:9000',
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

