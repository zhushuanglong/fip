/**
 * 请求地址API
 */
const methodMap = {
  /** 商品列表 **/
  ListItems: {url: '/api/list-items', method: 'get'},
  /** 商品详情 **/
  QueryItem: {url: '/api/query-item', method: 'get'},
  /** 提交订单 **/
  ConfirmOrder: {url: '/api/confirm-order', method: 'get'},
  /** 下单 **/
  PlaceOrder: {url: '/api/place-order', method: 'post'},
  /** 订单成功 **/
  OrderSuccess: {url: '/api/order-success', method: 'get'},
}

export default methodMap
