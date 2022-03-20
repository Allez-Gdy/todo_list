"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  setup() {
    const move = () => {
      console.log("move");
    };
    return {
      move
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.move && $setup.move(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
