"use strict";
var common_vendor = require("../../../common/vendor.js");
var api_index = require("../../../api/index.js");
require("../../../utils/request.js");
require("../../../api/operate.js");
const _sfc_main = {
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      }
    },
    sort: {
      type: Object,
      default() {
        return {
          id: -1
        };
      }
    },
    checked: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, context) {
    const filterTodos = common_vendor.ref([]);
    let iszhuan = common_vendor.ref(true);
    const setList = () => {
      props.dataList.map((item) => {
        if (props.sort.id === -1) {
          filterTodos.value.push(item);
        }
        if (item.sort == props.sort.id) {
          filterTodos.value.push(item);
        }
      });
    };
    setList();
    common_vendor.watch(() => props.dataList, () => {
      filterTodos.value = [];
      setList();
    }, {
      deep: true,
      immediate: true
    });
    const itemMore = (id) => {
      isOpen.value[id] = !isOpen.value[id];
    };
    const isOpen = common_vendor.ref([]);
    for (let i = 0; i < props.dataList.length; i++) {
      isOpen.value[i] = false;
    }
    const setItem = (item) => {
      context.emit("setItem", item);
    };
    const updataTodoStatus = (todoId, isFinish) => {
      context.emit("updataTodoStatus", todoId, isFinish);
    };
    const updataSubTodoStatus = (subTodoId, isFinish) => {
      api_index.api.updataSubTodoStatus({ subTodoId, isFinish: +isFinish }).then((res) => {
        context.emit("updateSubTodoStatus");
      });
    };
    return {
      itemMore,
      isOpen,
      filterTodos,
      iszhuan,
      setItem,
      updataTodoStatus,
      updataSubTodoStatus
    };
  }
};
if (!Array) {
  const _component_van_empty = common_vendor.resolveComponent("van-empty");
  _component_van_empty();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.filterTodos.length > 0
  }, $setup.filterTodos.length > 0 ? {
    b: common_vendor.f($setup.filterTodos, (item, k0, i0) => {
      return common_vendor.e({
        a: item.isFinish == false || $props.checked == false
      }, item.isFinish == false || $props.checked == false ? common_vendor.e({
        b: item.isFinish
      }, item.isFinish ? {
        c: common_vendor.o(($event) => $setup.updataTodoStatus(item.id, !item.isFinish))
      } : {
        d: common_vendor.o(($event) => $setup.updataTodoStatus(item.id, !item.isFinish))
      }, {
        e: common_vendor.t(item.title),
        f: item.import == 0
      }, item.import == 0 ? {
        g: common_vendor.t(item.oneDay),
        h: common_vendor.t(item.currentDate),
        i: common_vendor.t(item.datetimerange)
      } : {}, {
        j: item.import == 1
      }, item.import == 1 ? {
        k: common_vendor.t(item.oneDay),
        l: common_vendor.t(item.currentDate),
        m: common_vendor.t(item.datetimerange)
      } : {}, {
        n: item.import == 2
      }, item.import == 2 ? {
        o: common_vendor.t(item.oneDay),
        p: common_vendor.t(item.currentDate),
        q: common_vendor.t(item.datetimerange)
      } : {}, {
        r: item.import == 3
      }, item.import == 3 ? {
        s: common_vendor.t(item.oneDay),
        t: common_vendor.t(item.currentDate),
        v: common_vendor.t(item.datetimerange)
      } : {}, {
        w: item.isFinish == 1 ? 1 : "",
        x: common_vendor.o(($event) => $setup.setItem(item)),
        y: item.subTodoList.length !== 0
      }, item.subTodoList.length !== 0 ? {
        z: $setup.iszhuan && $setup.isOpen[item.id] ? 1 : "",
        A: !$setup.iszhuan || !$setup.isOpen[item.id] ? 1 : "",
        B: common_vendor.o(($event) => $setup.itemMore(item.id))
      } : {}) : {}, {
        C: item.subTodoList && $setup.isOpen[item.id]
      }, item.subTodoList && $setup.isOpen[item.id] ? {
        D: common_vendor.f(item.subTodoList, (subitem, k1, i1) => {
          return common_vendor.e({
            a: subitem.isFinish
          }, subitem.isFinish ? {
            b: common_vendor.o(($event) => $setup.updataSubTodoStatus(subitem.id, !subitem.isFinish))
          } : {
            c: common_vendor.o(($event) => $setup.updataSubTodoStatus(subitem.id, !subitem.isFinish))
          }, {
            d: common_vendor.t(subitem.title),
            e: subitem.id
          });
        })
      } : {}, {
        E: item.id
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
