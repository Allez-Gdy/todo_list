"use strict";
var common_vendor = require("../../common/vendor.js");
var wxcomponents_vant_dist_dialog_dialog = require("../../wxcomponents/vant/dist/dialog/dialog.js");
if (!Array) {
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  _component_van_dialog();
}
const _sfc_main = {
  setup(__props) {
    const username = common_vendor.ref("");
    const introduction = common_vendor.ref("");
    common_vendor.index.getStorage({
      key: "username",
      success: function(res) {
        console.log(res.data);
        username.value = res.data;
      }
    });
    common_vendor.index.getStorage({
      key: "uid",
      success: function(res) {
        console.log(res.data);
        introduction.value = res.data;
      }
    });
    const loginout = () => {
      wxcomponents_vant_dist_dialog_dialog.Dialog.confirm({
        message: "\u60A8\u786E\u8BA4\u9000\u51FA\u5417\uFF1F"
      }).then(() => {
        common_vendor.index.clearStorage();
        common_vendor.index.reLaunch({
          url: "/pages/login/login"
        });
      }).catch(() => {
        return;
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(username.value),
        b: common_vendor.t(introduction.value),
        c: common_vendor.o(loginout)
      };
    };
  }
};
wx.createPage(_sfc_main);
