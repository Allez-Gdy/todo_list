"use strict";
var common_vendor = require("../common/vendor.js");
var api_operate = require("../api/operate.js");
class Request {
  http(param) {
    var url = param.url, method = param.method, header = {}, data = param.data || {};
    param.token || "";
    param.hideLoading || false;
    var requestUrl = api_operate.operate.api + url;
    if (method) {
      method = method.toUpperCase();
      if (method == "POST") {
        header = {
          "content-type": "application/x-www-form-urlencoded"
        };
      } else {
        header = {
          "content-type": "application/json"
        };
      }
    }
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: requestUrl,
        data,
        method,
        header
      }).then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
exports.Request = Request;
