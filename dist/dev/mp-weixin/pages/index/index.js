"use strict";
var common_vendor = require("../../common/vendor.js");
var wxcomponents_vant_dist_notify_notify = require("../../wxcomponents/vant/dist/notify/notify.js");
require("../../wxcomponents/vant/dist/common/color.js");
const Todolist = () => "./components/todolist.js";
const AddTodo = () => "../../components/addTodo.js";
const uniDatetimePicker = () => "../../components/uni-datetime-picker/uni-datetime-picker.js";
const _sfc_main = {
  setup() {
    const active = common_vendor.ref(0);
    const active2 = common_vendor.ref(0);
    let myDate = new Date();
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    let month = myDate.getMonth() + 1;
    let date = myDate.getDate();
    let day = myDate.getDay();
    switch (day) {
      case 1:
        day = "\u4E00";
        break;
      case 2:
        day = "\u4E8C";
        break;
      case 3:
        day = "\u4E09";
        break;
      case 4:
        day = "\u56DB";
        break;
      case 5:
        day = "\u4E94";
        break;
      case 6:
        day = "\u516D";
        break;
      case 0:
        day = "\u65E5";
        break;
    }
    const todoValue = common_vendor.reactive({
      title: "",
      currentDate: `${hours}:${minutes}`,
      datetimerange: ""
    });
    const dianTitle = common_vendor.ref(`${month}/${date}\u5468${day}`);
    const onInput = (event) => {
      todoValue.currentDate = event.detail;
    };
    const updatatimerange = () => {
      console.log(todoValue.datetimerange);
    };
    common_vendor.watch(() => todoValue.datetimerange, (val) => {
      todoValue.datetimerange = val;
    });
    const onChange = function(event) {
      console.log(event.detail.name);
    };
    const onChange2 = function(event) {
      console.log(event.detail.name);
      if (event.detail.name === 0) {
        todoValue.datetimerange = "";
      } else if (event.detail.name === 1) {
        todoValue.currentDate = `${hours}:${minutes}`;
      }
    };
    const allTodoList = common_vendor.reactive([
      { id: 0, title: "\u5403\u996D", isFinish: true, sort: "\u751F\u6D3B", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 1, title: "\u5B50\u4EFB\u52A11", isFinish: true }], uid: 0 },
      { id: 1, title: "\u7761\u89C9", isFinish: false, sort: "\u751F\u6D3B", uid: 0 },
      { id: 2, title: "\u4E0A\u8BFE", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 1, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 2, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 3, title: "\u5199\u4F5C\u4E1A", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 }
    ]);
    const sortTodList = common_vendor.reactive([
      { id: 0, title: "\u5403\u996D1", isFinish: false, sort: "\u751F\u6D3B", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 1, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 1, title: "\u7761\u89C91", isFinish: false, sort: "\u751F\u6D3B", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 2, title: "\u4E0A\u8BFE1", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 1, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 2, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 3, title: "\u5199\u4F5C\u4E1A1", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 }
    ]);
    const todoSort = ["\u751F\u6D3B", "\u5B66\u4E60", "\u5DE5\u4F5C"];
    const isInput = common_vendor.ref(false);
    const iptBottom = common_vendor.ref(0);
    const getFocus = (e) => {
      iptBottom.value = e.detail.height - 80;
    };
    const outFocus = (e) => {
      iptBottom.value = 0;
    };
    const isSheet = common_vendor.ref(false);
    const onAddBtn = () => {
      isInput.value = true;
    };
    const setTime = () => {
      isSheet.value = true;
    };
    const submitTime = () => {
      console.log(todoValue);
    };
    const submitTodo = (e) => {
      if (todoValue.title === "") {
        wxcomponents_vant_dist_notify_notify.Notify({ type: "warning", message: "\u8BF7\u8F93\u5165\u5185\u5BB9" });
      }
      console.log(todoValue);
    };
    return {
      active,
      onChange,
      allTodoList,
      sortTodList,
      todoSort,
      getFocus,
      iptBottom,
      outFocus,
      isInput,
      todoValue,
      isSheet,
      onAddBtn,
      setTime,
      onInput,
      active2,
      dianTitle,
      updatatimerange,
      submitTime,
      onChange2,
      submitTodo
    };
  },
  components: { Todolist, AddTodo, uniDatetimePicker }
};
if (!Array) {
  const _component_van_notify = common_vendor.resolveComponent("van-notify");
  const _component_todolist = common_vendor.resolveComponent("todolist");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  const _component_van_datetime_picker = common_vendor.resolveComponent("van-datetime-picker");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _component_van_action_sheet = common_vendor.resolveComponent("van-action-sheet");
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_overlay = common_vendor.resolveComponent("van-overlay");
  (_component_van_notify + _component_todolist + _component_van_tab + _component_van_tabs + _component_van_datetime_picker + _easycom_uni_datetime_picker2 + _component_van_action_sheet + _component_van_field + _component_van_overlay)();
}
const _easycom_uni_datetime_picker = () => "../../components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  _easycom_uni_datetime_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      dataList: $setup.allTodoList
    }),
    b: common_vendor.p({
      title: "\u5168\u90E8"
    }),
    c: common_vendor.f($setup.todoSort, (item, k0, i0) => {
      return {
        a: "7ef3e360-5-" + i0 + "," + ("7ef3e360-4-" + i0),
        b: common_vendor.p({
          dataList: $setup.sortTodList,
          sort: item
        }),
        c: item,
        d: "7ef3e360-4-" + i0 + ",7ef3e360-1",
        e: common_vendor.p({
          title: item
        })
      };
    }),
    d: common_vendor.p({
      title: "\u6DFB\u52A0"
    }),
    e: common_vendor.o($setup.onChange),
    f: common_vendor.p({
      active: $setup.active,
      sticky: true,
      animated: true,
      swipeable: true
    }),
    g: common_vendor.o((...args) => $setup.onAddBtn && $setup.onAddBtn(...args)),
    h: common_vendor.o(($event) => $setup.isSheet = false),
    i: common_vendor.o((...args) => $setup.submitTime && $setup.submitTime(...args)),
    j: common_vendor.o($setup.onInput),
    k: common_vendor.p({
      type: "time",
      value: $setup.todoValue.currentDate,
      title: $setup.dianTitle,
      itemHeight: 30,
      visibleItemCount: 12,
      confirmButtonText: "",
      cancelButtonText: ""
    }),
    l: common_vendor.p({
      title: "\u65F6\u95F4\u70B9"
    }),
    m: common_vendor.o($setup.updatatimerange),
    n: common_vendor.o(($event) => $setup.todoValue.datetimerange = ""),
    o: common_vendor.o(($event) => $setup.todoValue.datetimerange = $event),
    p: common_vendor.p({
      type: "datetimerange",
      rangeSeparator: "\u81F3",
      modelValue: $setup.todoValue.datetimerange
    }),
    q: common_vendor.p({
      title: "\u65F6\u95F4\u6BB5"
    }),
    r: common_vendor.o($setup.onChange2),
    s: common_vendor.p({
      active: $setup.active2
    }),
    t: common_vendor.o(($event) => $setup.isSheet = false),
    v: common_vendor.p({
      show: $setup.isSheet,
      closeOnClickOverlay: true,
      zIndex: "200"
    }),
    w: $setup.isInput
  }, $setup.isInput ? {
    x: common_vendor.o(($event) => $setup.submitTodo($event)),
    y: common_vendor.o($setup.getFocus),
    z: common_vendor.o($setup.outFocus),
    A: common_vendor.p({
      type: "text",
      focus: true,
      border: true,
      autosize: true,
      adjustPosition: false,
      placeholder: "\u628A\u4E8B\u60C5\u8BB0\u5F55\u4E0B\u6765~"
    }),
    B: common_vendor.o((...args) => $setup.setTime && $setup.setTime(...args)),
    C: $setup.iptBottom + "px"
  } : {}, {
    D: common_vendor.o(($event) => $setup.isInput = false),
    E: common_vendor.p({
      show: $setup.isInput
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
