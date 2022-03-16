"use strict";
var common_vendor = require("../../common/vendor.js");
require("../../api/index.js");
const _sfc_main = {
  setup() {
    const submitForm = () => {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    return {
      submitForm
    };
  }
};
if (!Array) {
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  (_component_van_field + _component_van_button)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
      border: "true",
      label: "\u7528\u6237\u540D"
    }),
    b: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      border: "true",
      label: "\u5BC6\u7801"
    }),
    c: common_vendor.o($setup.submitForm),
    d: common_vendor.p({
      type: "info",
      block: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
