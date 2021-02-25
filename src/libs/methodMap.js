/**
 * 请求地址API
 */
const methodMap = {
  /** 商品列表 **/
  ListItems: {url: '/list-items', method: 'get'},
  /** 商品详情 **/
  QueryItem: {url: '/query-item', method: 'get'},
  /** 提交订单 **/
  ConfirmOrder: {url: '/confirm-order', method: 'get'},
  /** 下单 **/
  PlaceOrder: {url: '/place-order', method: 'post'},
  /** 订单成功 **/
  OrderSuccess: {url: '/order-success', method: 'get'},
}

export default methodMap
