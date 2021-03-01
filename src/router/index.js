import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Home'));
        }, 'home');
      }
    },
    {
      name: 'contactus',
      path: '/contactus',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/home/ContactUs'));
        }, 'contactus');
      }
    },
    {
      name: 'aboutus',
      path: '/aboutus',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/home/AboutUs'));
        }, 'aboutus');
      }
    },
    {
      name: 'privacypolicy',
      path: '/privacypolicy',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/home/PrivacyPolicy'));
        }, 'privacypolicy');
      }
    },
    {
      name: 'returngoods',
      path: '/returngoods',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/home/ReturnGoods'));
        }, 'returngoods');
      }
    },
    {
      name: 'detail',
      path: '/detail',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/order/Detail'));
        }, 'detail');
      }
    },
    {
      name: 'placeorder',
      path: '/placeorder',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/order/PlaceOrder'));
        }, 'placeorder');
      }
    },
    {
      name: 'ordersuccess',
      path: '/ordersuccess',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/order/OrderSuccess'));
        }, 'ordersuccess');
      }
    },
    {
      name: '404',
      path: '/404',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/404.vue'));
        }, '404');
      }
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
});

