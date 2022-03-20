"use strict";
var common_vendor = require("../../common/vendor.js");
const Test1 = () => "./test.js";
const _sfc_main = {
  components: { Test1 },
  setup() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
