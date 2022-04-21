"use strict";
var common_vendor = require("../../common/vendor.js");
var api_index = require("../../api/index.js");
var wxcomponents_vant_dist_notify_notify = require("../../wxcomponents/vant/dist/notify/notify.js");
require("../../utils/request.js");
require("../../api/operate.js");
require("../../wxcomponents/vant/dist/common/color.js");
if (!Array) {
  const _component_van_notify = common_vendor.resolveComponent("van-notify");
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_notify + _component_van_field + _component_van_button)();
}
const _sfc_main = {
  setup(__props) {
    function trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    const submitForm = () => {
      if (email.value == "" || password.value == "") {
        wxcomponents_vant_dist_notify_notify.Notify({ type: "warning", message: "\u8BF7\u8F93\u5165\u5B8C\u6574\u4FE1\u606F" });
        return;
      }
      api_index.api.login({
        email: email.value,
        password: password.value
      }).then((res) => {
        if (res.data.code !== 200) {
          wxcomponents_vant_dist_notify_notify.Notify({ type: "warning", message: res.data.message });
        } else {
          common_vendor.index.setStorageSync("todoToken", res.data.data.token);
          common_vendor.index.setStorageSync("username", res.data.data.user.username);
          common_vendor.index.setStorageSync("uid", res.data.data.user.id);
          wxcomponents_vant_dist_notify_notify.Notify({ type: "success", message: res.data.message });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          }, 1e3);
        }
      });
    };
    const signUp = () => {
      common_vendor.index.navigateTo({
        url: "/pages/signUp/signUp"
      });
    };
    const email = common_vendor.ref("2965157945@qq.com");
    const password = common_vendor.ref("123456");
    const emailOnChange = (event) => {
      email.value = trim(event.detail);
    };
    const pdOnChange = (event) => {
      password.value = trim(event.detail);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(emailOnChange),
        b: common_vendor.p({
          value: email.value,
          placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
          border: "true",
          label: "\u90AE\u7BB1"
        }),
        c: common_vendor.o(pdOnChange),
        d: common_vendor.p({
          value: password.value,
          password: true,
          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
          border: "true",
          label: "\u5BC6\u7801"
        }),
        e: common_vendor.o(submitForm),
        f: common_vendor.p({
          type: "info",
          block: true
        }),
        g: common_vendor.o(signUp)
      };
    };
  }
};
wx.createPage(_sfc_main);
