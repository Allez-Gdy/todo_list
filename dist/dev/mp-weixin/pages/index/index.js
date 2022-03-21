"use strict";
var common_vendor = require("../../common/vendor.js");
const Todolist = () => "./components/todolist.js";
const AddTodo = () => "../../components/addTodo.js";
const _sfc_main = {
  setup() {
    const active = common_vendor.ref(0);
    const onChange = function(event) {
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
    const todoValue = common_vendor.ref("");
    const isSheet = common_vendor.ref(true);
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
      isSheet
    };
  },
  components: { Todolist, AddTodo }
};
if (!Array) {
  const _component_todolist = common_vendor.resolveComponent("todolist");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  const _component_van_action_sheet = common_vendor.resolveComponent("van-action-sheet");
  const _component_van_overlay = common_vendor.resolveComponent("van-overlay");
  const _component_van_field = common_vendor.resolveComponent("van-field");
  (_component_todolist + _component_van_tab + _component_van_tabs + _component_van_action_sheet + _component_van_overlay + _component_van_field)();
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
        a: "7ef3e360-4-" + i0 + "," + ("7ef3e360-3-" + i0),
        b: common_vendor.p({
          dataList: $setup.sortTodList,
          sort: item
        }),
        c: item,
        d: "7ef3e360-3-" + i0 + ",7ef3e360-0",
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
    g: common_vendor.o(($event) => $setup.isInput = true),
    h: common_vendor.o(($event) => $setup.isSheet = false),
    i: common_vendor.p({
      show: $setup.isSheet,
      closeOnClickOverlay: true
    }),
    j: common_vendor.o(($event) => $setup.isInput = false),
    k: common_vendor.p({
      show: $setup.isInput
    }),
    l: $setup.isInput
  }, $setup.isInput ? {
    m: common_vendor.o($setup.getFocus),
    n: common_vendor.o($setup.outFocus),
    o: common_vendor.p({
      type: "text",
      focus: true,
      border: true,
      autosize: true,
      adjustPosition: false,
      placeholder: "\u628A\u4E8B\u60C5\u8BB0\u5F55\u4E0B\u6765~"
    }),
    p: $setup.iptBottom + "px"
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
