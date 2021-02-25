import Vue from "vue"
import App from "./App"
import router from "./router"
import initComponents from "./initComponents"
import Http from "./libs/http"
// import clipboard from 'clipboard' //复制粘贴板
// import store from './store'
// Vue.filter('price', function(value, reset) {
//   let currencySymbol = localStorage.currencySymbol
//   if (reset) {
//     currencySymbol = reset
//   }
//   return currencySymbol + value
// })

initComponents(Vue)
Vue.use(Http)

// rem 换算
import { remChange } from "./components/basic/remChange"
remChange()

// checkwebp
import "./components/basic/checkwebp"

// 科学计算法 - 加减乘除
import { returnFloat, accAdd, accSub, accDiv, accMul } from "./components/basic/math"
Vue.prototype.returnFloat = returnFloat
Vue.prototype.accAdd = accAdd
Vue.prototype.accSub = accSub
Vue.prototype.accDiv = accDiv
Vue.prototype.accMul = accMul

// 复制粘贴
// Vue.prototype.clipboard = clipboard

// 组件库
import { Toast } from 'mint-ui'
Vue.prototype.$Toast = Toast
// Vue.use(Lazyload)

import MintUI from 'mint-ui'
Vue.use(MintUI, {
  lazyload: {
    preLoad: 1.3,
    loading: '',
    // attempt: 1,
  }
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  // store,
  template: "<App/>",
  components: { App }
})
