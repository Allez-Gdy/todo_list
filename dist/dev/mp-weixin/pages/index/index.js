"use strict";
var common_vendor = require("../../common/vendor.js");
var wxcomponents_vant_dist_notify_notify = require("../../wxcomponents/vant/dist/notify/notify.js");
require("../../wxcomponents/vant/dist/common/color.js");
const Todolist = () => "./components/todolist.js";
const AddTodo = () => "../../components/addTodo.js";
const uniDatetimePicker = () => "../../components/uni-datetime-picker/uni-datetime-picker.js";
const uniNavBar = () => "../../components/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const uniDrawer = () => "../../components/uni-drawer/components/uni-drawer/uni-drawer.js";
const _sfc_main = {
  methods: {
    showDrawer() {
      this.$refs.showRight.open();
    }
  },
  setup() {
    const allTodoList = common_vendor.reactive([
      { id: 0, title: "\u5403\u996D", isFinish: true, sort: "\u751F\u6D3B", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 1, title: "\u5B50\u4EFB\u52A11", isFinish: true }], uid: 0 },
      { id: 1, title: "\u7761\u89C9", isFinish: false, sort: "\u751F\u6D3B", uid: 0 },
      { id: 2, title: "\u4E0A\u8BFE", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 1, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 2, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 3, title: "\u5199\u4F5C\u4E1A", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 3, title: "\u5199\u4F5C\u4E1A", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 3, title: "\u5199\u4F5C\u4E1A", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 3, title: "\u5199\u4F5C\u4E1A", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 3, title: "\u5199\u4F5C\u4E1A", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 }
    ]);
    const sortTodList = common_vendor.reactive([
      { id: 0, title: "\u5403\u996D1", isFinish: false, sort: "\u751F\u6D3B", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 1, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 1, title: "\u7761\u89C91", isFinish: false, sort: "\u751F\u6D3B", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 2, title: "\u4E0A\u8BFE1", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 1, title: "\u5B50\u4EFB\u52A11", isFinish: false }, { id: 2, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 },
      { id: 3, title: "\u5199\u4F5C\u4E1A1", isFinish: false, sort: "\u5B66\u4E60", subTodo: [{ id: 0, title: "\u5B50\u4EFB\u52A11", isFinish: false }], uid: 0 }
    ]);
    const todoSort = ["\u751F\u6D3B", "\u5B66\u4E60", "\u5DE5\u4F5C"];
    const active = common_vendor.ref(0);
    const active2 = common_vendor.ref(0);
    const isHeight = common_vendor.ref(true);
    const checked = common_vendor.ref(false);
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
      datetimerange: "",
      sort: todoSort[0],
      importIndex: 0
    });
    const dianTitle = common_vendor.ref(`${month}/${date}\u5468${day}`);
    const onInput = (event) => {
      todoValue.currentDate = event.detail;
    };
    common_vendor.watch(() => todoValue.datetimerange, (val) => {
      todoValue.datetimerange = val;
    });
    const onChange = function(event) {
      if (event.detail.name !== 0 && event.detail.name !== todoSort.length + 1) {
        todoValue.sort = todoSort[event.detail.name - 1];
      }
      console.log(todoValue.sort);
    };
    const onChange2 = function(event) {
      active2.value = event.detail.name;
      if (event.detail.name === 0) {
        todoValue.datetimerange = "";
      } else if (event.detail.name === 1) {
        todoValue.currentDate = `${hours}:${minutes}`;
      }
    };
    const isInput = common_vendor.ref(false);
    const iptBottom = common_vendor.ref(0);
    const getFocus = (e) => {
      iptBottom.value = e.detail.height;
    };
    const outFocus = (e) => {
      iptBottom.value = 85;
    };
    const isSheet = common_vendor.ref(false);
    const isSortSheet = common_vendor.ref(false);
    const isImportSheet = common_vendor.ref(false);
    const selectImport = (index) => {
      todoValue.importIndex = index;
      isImportSheet.value = false;
    };
    const selectSort = (item) => {
      todoValue.sort = item;
      isSortSheet.value = false;
      common_vendor.index.createSelectorQuery().select("#todo-input");
    };
    let isTime = common_vendor.ref(false);
    const closeTime = () => {
      isSheet.value = false;
      isTime.value = false;
    };
    const sureTime = () => {
      isSheet.value = false;
      isTime.value = true;
    };
    const onChangeChecked = ({ detail }) => {
      checked.value = detail;
    };
    const submitTodo = (e) => {
      e.preventDefault();
      todoValue.title = todoValue.title.trim();
      if (todoValue.title === "") {
        wxcomponents_vant_dist_notify_notify.Notify({ type: "warning", message: "\u8BF7\u8F93\u5165\u5185\u5BB9" });
        return;
      }
      if (active2.value === 0) {
        let oneDay = "";
        if (isTime.value) {
          oneDay = dianTitle.value;
        } else {
          oneDay = "";
        }
        let params = {
          title: todoValue.title,
          sort: todoValue.sort,
          import: todoValue.importIndex,
          oneDay,
          currentDate: "",
          datetimerange: ""
        };
        console.log(params);
      } else if (active2.value === 1) {
        let params = {
          title: todoValue.title,
          sort: todoValue.sort,
          import: todoValue.importIndex,
          oneDay: "",
          currentDate: dianTitle.value + todoValue.currentDate,
          datetimerange: ""
        };
        console.log(params);
      } else {
        let params = {
          title: todoValue.title,
          sort: todoValue.sort,
          import: todoValue.importIndex,
          oneDay: "",
          currentDate: "",
          datetimerange: todoValue.datetimerange
        };
        console.log(params);
      }
      isInput.value = false;
      todoValue.title = "";
      todoValue.currentDate = `${hours}:${minutes}`;
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
      onInput,
      active2,
      dianTitle,
      onChange2,
      submitTodo,
      isSortSheet,
      isImportSheet,
      selectImport,
      selectSort,
      closeTime,
      sureTime,
      isTime,
      isHeight,
      checked,
      onChangeChecked
    };
  },
  components: { Todolist, AddTodo, uniDatetimePicker, uniNavBar, uniDrawer }
};
if (!Array) {
  const _component_uni_nav_bar = common_vendor.resolveComponent("uni-nav-bar");
  const _component_van_switch = common_vendor.resolveComponent("van-switch");
  const _component_uni_drawer = common_vendor.resolveComponent("uni-drawer");
  const _component_van_notify = common_vendor.resolveComponent("van-notify");
  const _component_todolist = common_vendor.resolveComponent("todolist");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  const _component_van_datetime_picker = common_vendor.resolveComponent("van-datetime-picker");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _component_van_action_sheet = common_vendor.resolveComponent("van-action-sheet");
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_overlay = common_vendor.resolveComponent("van-overlay");
  (_component_uni_nav_bar + _component_van_switch + _component_uni_drawer + _component_van_notify + _component_todolist + _component_van_tab + _component_van_tabs + _component_van_datetime_picker + _easycom_uni_datetime_picker2 + _component_van_action_sheet + _component_van_field + _component_van_overlay)();
}
const _easycom_uni_datetime_picker = () => "../../components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  _easycom_uni_datetime_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.showDrawer),
    b: common_vendor.p({
      statusBar: true,
      title: "\u4E8B\u9879\u6E05\u5355"
    }),
    c: common_vendor.o($setup.onChangeChecked),
    d: common_vendor.p({
      checked: $setup.checked
    }),
    e: !$setup.isHeight ? 1 : "",
    f: $setup.isHeight ? 1 : "",
    g: common_vendor.o(($event) => $setup.isHeight = !$setup.isHeight),
    h: $setup.isHeight ? 1 : "",
    i: !$setup.isHeight ? 1 : "",
    j: common_vendor.sr("showRight", "7ef3e360-1"),
    k: common_vendor.p({
      ["left-icon"]: "left",
      mode: "left",
      width: 300
    }),
    l: common_vendor.p({
      dataList: $setup.allTodoList
    }),
    m: common_vendor.p({
      title: "\u5168\u90E8"
    }),
    n: common_vendor.f($setup.todoSort, (item, k0, i0) => {
      return {
        a: "7ef3e360-8-" + i0 + "," + ("7ef3e360-7-" + i0),
        b: common_vendor.p({
          dataList: $setup.sortTodList,
          sort: item
        }),
        c: item,
        d: "7ef3e360-7-" + i0 + ",7ef3e360-4",
        e: common_vendor.p({
          title: item
        })
      };
    }),
    o: common_vendor.o($setup.onChange),
    p: common_vendor.p({
      active: $setup.active,
      sticky: true,
      animated: true,
      swipeable: true
    }),
    q: common_vendor.o(($event) => $setup.isInput = true),
    r: common_vendor.o((...args) => $setup.closeTime && $setup.closeTime(...args)),
    s: common_vendor.o((...args) => $setup.sureTime && $setup.sureTime(...args)),
    t: common_vendor.t($setup.dianTitle),
    v: common_vendor.p({
      title: "\u5168\u5929"
    }),
    w: common_vendor.o($setup.onInput),
    x: common_vendor.p({
      type: "time",
      value: $setup.todoValue.currentDate,
      title: $setup.dianTitle,
      itemHeight: 30,
      visibleItemCount: 12,
      confirmButtonText: "",
      cancelButtonText: ""
    }),
    y: common_vendor.p({
      title: "\u65F6\u95F4\u70B9"
    }),
    z: common_vendor.o(($event) => $setup.todoValue.datetimerange = ""),
    A: common_vendor.o(($event) => $setup.todoValue.datetimerange = $event),
    B: common_vendor.p({
      type: "datetimerange",
      rangeSeparator: "\u81F3",
      modelValue: $setup.todoValue.datetimerange
    }),
    C: common_vendor.p({
      title: "\u65F6\u95F4\u6BB5"
    }),
    D: common_vendor.o($setup.onChange2),
    E: common_vendor.p({
      active: $setup.active2
    }),
    F: common_vendor.o(($event) => $setup.isSheet = false),
    G: common_vendor.p({
      show: $setup.isSheet,
      closeOnClickOverlay: true,
      zIndex: "200"
    }),
    H: common_vendor.f($setup.todoSort, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item,
        c: common_vendor.o(($event) => $setup.selectSort(item))
      };
    }),
    I: common_vendor.o(($event) => $setup.isSortSheet = false),
    J: common_vendor.p({
      show: $setup.isSortSheet,
      closeOnClickOverlay: true,
      zIndex: "200"
    }),
    K: $setup.todoValue.importIndex === 0
  }, $setup.todoValue.importIndex === 0 ? {} : {}, {
    L: common_vendor.o(($event) => $setup.selectImport(0)),
    M: $setup.todoValue.importIndex === 1
  }, $setup.todoValue.importIndex === 1 ? {} : {}, {
    N: common_vendor.o(($event) => $setup.selectImport(1)),
    O: $setup.todoValue.importIndex === 2
  }, $setup.todoValue.importIndex === 2 ? {} : {}, {
    P: common_vendor.o(($event) => $setup.selectImport(2)),
    Q: $setup.todoValue.importIndex === 3
  }, $setup.todoValue.importIndex === 3 ? {} : {}, {
    R: common_vendor.o(($event) => $setup.selectImport(3)),
    S: common_vendor.o(($event) => $setup.isImportSheet = false),
    T: common_vendor.p({
      show: $setup.isImportSheet,
      closeOnClickOverlay: true,
      zIndex: "200"
    }),
    U: $setup.isInput
  }, $setup.isInput ? common_vendor.e({
    V: $setup.isTime
  }, $setup.isTime ? common_vendor.e({
    W: $setup.active2 == 0
  }, $setup.active2 == 0 ? {
    X: common_vendor.t($setup.dianTitle)
  } : {}, {
    Y: $setup.active2 == 1
  }, $setup.active2 == 1 ? {
    Z: common_vendor.t($setup.dianTitle),
    aa: common_vendor.t($setup.todoValue.currentDate)
  } : {}, {
    ab: $setup.active2 == 2 && $setup.todoValue.datetimerange.length != 0 && $setup.todoValue.datetimerange[0].substr(-8) == "00:00:00"
  }, $setup.active2 == 2 && $setup.todoValue.datetimerange.length != 0 && $setup.todoValue.datetimerange[0].substr(-8) == "00:00:00" ? {
    ac: common_vendor.t($setup.todoValue.datetimerange[0].substr(0, 10)),
    ad: common_vendor.t($setup.todoValue.datetimerange[1].substr(0, 10))
  } : {}, {
    ae: $setup.active2 == 2 && $setup.todoValue.datetimerange.length != 0 && $setup.todoValue.datetimerange[0].substr(-8) != "00:00:00"
  }, $setup.active2 == 2 && $setup.todoValue.datetimerange.length != 0 && $setup.todoValue.datetimerange[0].substr(-8) != "00:00:00" ? {
    af: common_vendor.t($setup.todoValue.datetimerange[0]),
    ag: common_vendor.t($setup.todoValue.datetimerange[1])
  } : {}) : {}, {
    ah: common_vendor.t($setup.todoValue.sort),
    ai: $setup.todoValue.importIndex == 0
  }, $setup.todoValue.importIndex == 0 ? {} : {}, {
    aj: $setup.todoValue.importIndex == 1
  }, $setup.todoValue.importIndex == 1 ? {} : {}, {
    ak: $setup.todoValue.importIndex == 2
  }, $setup.todoValue.importIndex == 2 ? {} : {}, {
    al: $setup.todoValue.importIndex == 3
  }, $setup.todoValue.importIndex == 3 ? {} : {}, {
    am: common_vendor.o(($event) => $setup.submitTodo($event)),
    an: common_vendor.o($setup.getFocus),
    ao: common_vendor.o($setup.outFocus),
    ap: common_vendor.o(($event) => $setup.todoValue.title = $event.detail),
    aq: common_vendor.p({
      type: "text",
      focus: true,
      border: true,
      autosize: true,
      adjustPosition: false,
      value: $setup.todoValue.title,
      placeholder: "\u628A\u4E8B\u60C5\u8BB0\u5F55\u4E0B\u6765~"
    }),
    ar: common_vendor.o(($event) => $setup.isSheet = true),
    as: common_vendor.o(($event) => $setup.isSortSheet = true),
    at: common_vendor.o(($event) => $setup.isImportSheet = true),
    av: $setup.iptBottom + "px"
  }) : {}, {
    aw: common_vendor.o(($event) => $setup.isInput = false),
    ax: common_vendor.p({
      show: $setup.isInput,
      zIndex: "50"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
