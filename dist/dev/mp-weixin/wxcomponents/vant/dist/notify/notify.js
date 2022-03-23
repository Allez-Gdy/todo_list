"use strict";
var wxcomponents_vant_dist_common_color = require("../common/color.js");
const defaultOptions = {
  selector: "#van-notify",
  type: "danger",
  message: "",
  background: "",
  duration: 3e3,
  zIndex: 110,
  top: 0,
  color: wxcomponents_vant_dist_common_color.WHITE,
  safeAreaInsetTop: false,
  onClick: () => {
  },
  onOpened: () => {
  },
  onClose: () => {
  }
};
function parseOptions(message) {
  if (message == null) {
    return {};
  }
  return typeof message === "string" ? { message } : message;
}
function getContext() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}
function Notify(options) {
  options = Object.assign(Object.assign({}, defaultOptions), parseOptions(options));
  const context = options.context || getContext();
  const notify = context.selectComponent(options.selector);
  delete options.context;
  delete options.selector;
  if (notify) {
    notify.setData(options);
    notify.show();
    return notify;
  }
  console.warn("\u672A\u627E\u5230 van-notify \u8282\u70B9\uFF0C\u8BF7\u786E\u8BA4 selector \u53CA context \u662F\u5426\u6B63\u786E");
}
Notify.clear = function(options) {
  options = Object.assign(Object.assign({}, defaultOptions), parseOptions(options));
  const context = options.context || getContext();
  const notify = context.selectComponent(options.selector);
  if (notify) {
    notify.hide();
  }
};
exports.Notify = Notify;
