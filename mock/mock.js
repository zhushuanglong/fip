/**
 * @note   setOnline 线上接口 配置
 * @param  name  本地接口名
 *         type  接口类型
 *         url   线上接口地址
 */
var fs = require('fs')
var setOnline = [
  {
    name: 'listItems',
    type: 'get',
    url: '/api/list-items'
  },
  {
    name: 'queryItem',
    type: 'get',
    url: '/api/query-item'
  },
  {
    name: 'confirmOrder',
    type: 'get',
    url: '/api/confirm-order'
  },
  {
    name: 'placeOrder',
    type: 'post',
    url: '/api/place-order'
  },
  {
    name: 'orderSuccess',
    type: 'get',
    url: '/api/order-success'
  },
]

// 输出配置项
exports.setOnline = setOnline

// 遍历输出json数据
for (var i = 0, len = setOnline.length; i < len; i++) {
  // (function() {
  //   var name = setOnline[i].name

  //   exports[name] = function(req, res) {
  //     res.setHeader('Content-Type', 'application/json; charset=utf-8');
  //     fs.readFile('./mock/' + name + '.json', function(err, data) {
  //       if (err) throw err

  //       res.json(JSON.parse(data))
  //     })
  //   }
  // })(i)

  (function() {
    var name = setOnline[i].name

    exports[name] = function(req, res) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      fs.readFile('./mock/' + name + '.json', function(err, data) {
        if (err) throw err
        let randomTime = Math.floor(Math.random() * 100) * 10
        setTimeout(function() {
          res.json(JSON.parse(data))
        }, randomTime)
      })
    }
  })(i)
}

