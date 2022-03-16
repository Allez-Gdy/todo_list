"use strict";
var common_vendor = require("../common/vendor.js");
const service = common_vendor.axios.create({
  baseURL: "http://localhost:3300/"
});
service.interceptors.request.use((config) => {
  let token = localStorage.getItem("todo-token");
  if (token) {
    config.headers.authorization = token;
  } else {
    let url = config.url.split("/");
    let apiUrl = url[url.length - 2];
    let pageUrl = url[url.length - 1];
    if (apiUrl === "email" || apiUrl === "file" || pageUrl === "login" || pageUrl === "register") {
      console.log("\u5141\u8BB8\u4E0D\u643A\u5E26token\u901A\u8FC7\u8DEF\u7531");
    } else {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    }
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});
