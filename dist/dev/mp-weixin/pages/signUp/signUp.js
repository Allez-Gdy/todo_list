"use strict";
var common_vendor = require("../../common/vendor.js");
var wxcomponents_vant_dist_notify_notify = require("../../wxcomponents/vant/dist/notify/notify.js");
var api_index = require("../../api/index.js");
require("../../wxcomponents/vant/dist/common/color.js");
require("../../utils/request.js");
require("../../api/operate.js");
if (!Array) {
  const _component_van_notify = common_vendor.resolveComponent("van-notify");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _component_van_field = common_vendor.resolveComponent("van-field");
  (_component_van_notify + _component_van_button + _component_van_field)();
}
const _sfc_main = {
  setup(__props) {
    const email = common_vendor.ref("");
    const emailCode = common_vendor.ref("");
    const username = common_vendor.ref("");
    const password1 = common_vendor.ref("");
    const password2 = common_vendor.ref("");
    const isEmail = common_vendor.ref(true);
    const time = common_vendor.ref(60);
    const codetitle = common_vendor.ref("\u53D1\u9001\u9A8C\u8BC1\u7801");
    const isGetCode = common_vendor.ref(true);
    const goLogin = () => {
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    const judgeEmailCode = async () => {
      await api_index.api.judgeCode({
        email: email.value,
        emailCode: emailCode.value
      }).then((res) => {
        console.log(res);
        if (res.data.code !== 200) {
          wxcomponents_vant_dist_notify_notify.Notify({ type: "warning", message: res.data.message });
        } else {
          wxcomponents_vant_dist_notify_notify.Notify({ type: "success", message: res.data.message });
          isEmail.value = false;
        }
      });
    };
    const getEmailCode = async () => {
      await api_index.api.getemailcode({
        email: email.value
      }).then((result) => {
        if (result.data.code !== 200) {
          wxcomponents_vant_dist_notify_notify.Notify({ type: "warning", message: result.data.message });
        } else {
          wxcomponents_vant_dist_notify_notify.Notify({ type: "success", message: result.data.message });
          isGetCode.value = false;
          const timer = setInterval(() => {
            codetitle.value = `${time.value}\u79D2`;
            time.value--;
            if (time.value === -1) {
              clearInterval(timer);
              isGetCode.value = true;
              codetitle.value = "\u53D1\u9001\u9A8C\u8BC1\u7801";
              time.value = 60;
            }
          }, 1e3);
        }
      }).catch((err) => {
        console.log(err);
      });
    };
    const emailOnChage = (event) => {
      email.value = trim(event.detail);
    };
    const emailCodeOnChage = (event) => {
      emailCode.value = trim(event.detail);
    };
    const nameOnChange = (event) => {
      username.value = trim(event.detail);
    };
    const p1OnChange = (event) => {
      password1.value = trim(event.detail);
    };
    const p2OnChange = (event) => {
      password2.value = trim(event.detail);
    };
    function trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    const submit = async () => {
      if (username.value == "" || password1.value == "" || password2.value == "") {
        wxcomponents_vant_dist_notify_notify.Notify({ type: "warning", message: "\u8BF7\u5B8C\u6574\u8F93\u5165\u4FE1\u606F" });
        return;
      }
      if (password1.value !== password2.value) {
        wxcomponents_vant_dist_notify_notify.Notify({ type: "warning", message: "\u8F93\u5165\u7684\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u6837" });
        return;
      }
      await api_index.api.register({
        username: username.value,
        password: password1.value,
        email: email.value
      }).then((res) => {
        if (res.data.code !== 200) {
          wxcomponents_vant_dist_notify_notify.Notify({ type: "warning", message: res.data.message });
        } else {
          wxcomponents_vant_dist_notify_notify.Notify({ type: "success", message: res.data.message });
          setTimeout(() => {
            common_vendor.index.navigateBack({
              delta: 1
            });
          }, 1e3);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isEmail.value
      }, isEmail.value ? {
        b: common_vendor.t(codetitle.value),
        c: common_vendor.o(getEmailCode),
        d: common_vendor.p({
          size: "small",
          type: "default",
          disabled: !isGetCode.value
        }),
        e: common_vendor.o(emailOnChage),
        f: common_vendor.p({
          value: email.value,
          placeholder: "\u8BF7\u8F93\u5165\u8981\u6CE8\u518C\u7684\u90AE\u7BB1",
          border: "true",
          label: "\u90AE\u7BB1",
          useButtonSlot: true,
          titleWidth: "4em"
        }),
        g: common_vendor.o(emailCodeOnChage),
        h: common_vendor.p({
          placeholder: "\u8BF7\u8F93\u5165\u6536\u5230\u7684\u9A8C\u8BC1\u7801",
          border: "true",
          label: "\u9A8C\u8BC1\u7801",
          titleWidth: "4em",
          value: emailCode.value
        }),
        i: common_vendor.o(judgeEmailCode),
        j: common_vendor.p({
          type: "info",
          block: true
        })
      } : {
        k: common_vendor.o(nameOnChange),
        l: common_vendor.p({
          value: username.value,
          placeholder: "\u8BF7\u8F93\u5165\u7528\u6237\u540D",
          border: "true",
          label: "\u7528\u6237\u540D",
          maxlength: "10",
          titleWidth: "4em"
        }),
        m: common_vendor.o(p1OnChange),
        n: common_vendor.p({
          value: password1.value,
          titleWidth: "4em",
          placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
          border: "true",
          label: "\u5BC6\u7801",
          password: true
        }),
        o: common_vendor.o(p2OnChange),
        p: common_vendor.p({
          value: password2.value,
          titleWidth: "4em",
          placeholder: "\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801",
          border: "true",
          label: "\u786E\u8BA4\u5BC6\u7801",
          password: true
        }),
        q: common_vendor.o(submit),
        r: common_vendor.p({
          type: "info",
          block: true
        }),
        s: common_vendor.o(goLogin)
      });
    };
  }
};
wx.createPage(_sfc_main);
