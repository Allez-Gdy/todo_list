"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    dataList: Object,
    sort: {
      type: String,
      default: "\u5168\u90E8"
    }
  },
  setup(props) {
    const filterTodos = common_vendor.ref([]);
    let iszhuan = common_vendor.ref(true);
    props.dataList.map((item) => {
      if (props.sort === "\u5168\u90E8") {
        filterTodos.value.push(item);
      }
      if (item.sort === props.sort) {
        filterTodos.value.push(item);
      }
    });
    const itemMore = (id) => {
      isOpen.value[id] = !isOpen.value[id];
    };
    const isOpen = common_vendor.ref([]);
    for (let i = 0; i < props.dataList.length; i++) {
      isOpen.value[i] = false;
    }
    const logaaa = (index) => {
      console.log(index);
    };
    return {
      itemMore,
      isOpen,
      filterTodos,
      iszhuan,
      logaaa
    };
  }
};
if (!Array) {
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  _component_van_empty();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.filterTodos.length != 0
  }, $setup.filterTodos.length != 0 ? {
    b: common_vendor.f($setup.filterTodos, (item, k0, i0) => {
      return common_vendor.e({
        a: item.isFinish
      }, item.isFinish ? {} : {}, {
        b: common_vendor.t(item.title),
        c: item.isFinish ? 1 : "",
        d: item.subTodo
      }, item.subTodo ? {
        e: $setup.iszhuan && $setup.isOpen[item.id] ? 1 : "",
        f: !$setup.iszhuan || !$setup.isOpen[item.id] ? 1 : "",
        g: common_vendor.o(($event) => $setup.itemMore(item.id))
      } : {}, {
        h: item.subTodo && $setup.isOpen[item.id]
      }, item.subTodo && $setup.isOpen[item.id] ? {
        i: common_vendor.f(item.subTodo, (subitem, k1, i1) => {
          return common_vendor.e({
            a: subitem.isFinish
          }, subitem.isFinish ? {} : {}, {
            b: common_vendor.t(subitem.title),
            c: subitem.id
          });
        })
      } : {}, {
        j: item.id,
        k: common_vendor.o(($event) => $setup.logaaa(item.id), item.id)
      });
    })
  } : {
    c: common_vendor.p({
      description: "\u5F53\u524D\u6682\u65E0\u5185\u5BB9"
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
