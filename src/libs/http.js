/**
 * 网络请求插件 引入了toast 加载提示
 */
import methodMap from "./methodMap";
import AxiosInst from "./axios";
class Http {}
Http.install = function (Vue) {
  /**
   * 全局请求接口
   * @param method 方法
   * @param opts 参数
   * @param toast 是否提示
   * @returns {string}
   */
  Vue.prototype.request = function (method, opts, toast) {
    //如果有给 toast 参数则显示 loading 加载数据
    if (toast && typeof toast === "boolean") {
      Vue.prototype.$loading("加载中...");
    } else if (toast && typeof toast === "string") {
      Vue.prototype.$loading(toast);
    }
    let m = methodMap[method];
    if (m) {
      let optsType = typeof opts;
      if (optsType === null || optsType !== "object") {
        opts = {};
      }
      if (typeof m.method === "undefined") {
        return false;
      }
      if (m.method === "get") {
        return Vue.prototype.apiGet(m.url, opts);
      } else if (m.method === "post") {
        var json = false;
        if (m.json) json = true;
        return Vue.prototype.apiPost(m.url, opts, json);
      } else {
        return false;
      }
    } else {
      // closeLoading();
      console.log(
        "url 错误",
        "返回结果：err = ",
        "无法请求，无效的请求！",
        "\n"
      );
    }
  };
  /**
   * POST 请求 无提示
   * @param url 请求URL
   * @param data 请求数据
   * @returns {Promise}
   */
  Vue.prototype.apiPost = function (url, data, json, toast = false) {
    // if (toast && typeof (toast) === 'boolean') {
    //     Vue.prototype.$loading('加载中...');
    // } else if (toast && typeof (toast) === 'string') {
    //     Vue.prototype.$loading(toast);
    // }
    return new Promise((resolve, reject) => {
      // if (json) {

      AxiosInst.defaults.headers["Content-Type"] = "application/json";
      AxiosInst.defaults.transformRequest = [
        function (data) {
          // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
          // if (window.localStorage.getItem("userToken")) {
          //   data["token"] = window.localStorage.getItem("userToken");
          // }
          data = JSON.stringify(data);
          return data;
        },
      ];

      // }
      AxiosInst.post(url, data)
        .then((response) => {
          // setTimeout(() => closeLoading(), 800);
          resolve(response.data);
        })
        .catch((error) => {
          this.$Toast(error && error.errorMessage || 'الشبكة مشغولة. الرجاء معاودة المحاولة في	 وقت لاحق	.')
          reject(error);
        });
    });
  };
  /**
   * GET 请求 无提示
   * @param url 请求URL
   * @param data 请求数据
   * @returns {Promise}
   */
  Vue.prototype.apiGet = function (url, data, toast = false) {
    if (toast && typeof toast === "boolean") {
      Vue.prototype.$loading("加载中...");
    } else if (toast && typeof toast === "string") {
      Vue.prototype.$loading(toast);
    }
    return new Promise((resolve, reject) => {
      AxiosInst.get(url, {
        params: data,
      })
        .then((response) => {
          // setTimeout(() => closeLoading(), 800);
          resolve(response.data);
        })
        .catch((error) => {
          this.$Toast(error && error.errorMessage || 'الشبكة مشغولة. الرجاء معاودة المحاولة في	 وقت لاحق	.')
          reject(error);
        });
    });
  };

  /**
   * 关闭方法
   */
  function closeLoading() {
    // Vue.prototype.$loading.close();
  }
};
export default Http;
