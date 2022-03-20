"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  setup() {
    let isShow = common_vendor.ref(false);
    const open = () => {
      isShow.value = !isShow.value;
      console.log("isShow" + isShow.value);
    };
    return {
      isShow,
      open
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($setup.isShow),
    b: $setup.isShow
  }, $setup.isShow ? {} : {}, {
    c: common_vendor.o((...args) => $setup.open && $setup.open(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
