"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    const active = common_vendor.ref(1);
    const goLogin = function() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const onChange = function(event) {
      console.log(event.detail);
    };
    const aa = function() {
      console.log("aaa");
    };
    return {
      goLogin,
      active,
      onChange,
      aa
    };
  }
};
if (!Array) {
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  (_component_van_tab + _component_van_tabs)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: "\u6807\u7B7E 1"
    }),
    b: common_vendor.p({
      title: "\u6807\u7B7E 2"
    }),
    c: common_vendor.p({
      title: "\u6807\u7B7E 3"
    }),
    d: common_vendor.p({
      title: "\u6807\u7B7E 4"
    }),
    e: common_vendor.p({
      title: "\u6807\u7B7E 5"
    }),
    f: common_vendor.p({
      title: "\u6807\u7B7E 6"
    }),
    g: common_vendor.o($setup.onChange),
    h: common_vendor.p({
      active: "active",
      sticky: true,
      animated: true,
      swipeable: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
