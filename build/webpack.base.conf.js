var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf')
var os = require('os')
var HappyPack = require('happypack')
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var publicPath = '';

if (process.env.NODE_ENV === 'production') {
  publicPath = config.build.assetsPublicPath;
} else {
  publicPath = config.dev.assetsPublicPath;
}

module.exports = {
  entry: {
    // loader: ['components/loader/fastclick'], // 第三方js延迟加载
    vendor: ['vue'],
    cbs: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'img': resolve('src/images'),
      'common': resolve('src/pages/common'),
      'components': resolve('src/components'),
      'less': resolve('src/less'),
      'swiper$': 'swiper/js/swiper.min.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // 为了把第三方库拆分出来（用<script>标签单独加载），我们还需要用webpack的CommonsChunkPlugin插件来把它提取一下
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    }),
    // new HappyPack({
    //   id: 'happyvue',
    //   loaders: [ 'vue-loader' ],
    //   threadPool: happyThreadPool,
    //   cache: true,
    //   verbose: true
    // }),
    new HappyPack({
      id: 'babel',
      loaders: [ 'babel-loader' ],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    })
  ]
}