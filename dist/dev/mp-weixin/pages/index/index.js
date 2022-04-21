"use strict";
var common_vendor = require("../../common/vendor.js");
var api_index = require("../../api/index.js");
require("../../utils/request.js");
require("../../api/operate.js");
if (!Array) {
  const _component_van_switch = common_vendor.resolveComponent("van-switch");
  const _component_van_notify = common_vendor.resolveComponent("van-notify");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  const _component_van_field = common_vendor.resolveComponent("van-field");
  const _component_van_datetime_picker = common_vendor.resolveComponent("van-datetime-picker");
  const _component_van_action_sheet = common_vendor.resolveComponent("van-action-sheet");
  const _component_van_overlay = common_vendor.resolveComponent("van-overlay");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  (_component_van_switch + _component_van_notify + _component_van_tab + _component_van_tabs + _component_van_field + _component_van_datetime_picker + _component_van_action_sheet + _component_van_overlay + _component_van_popup)();
}
if (!Math) {
  (uniNavBar + uniDrawer + Todolist + uniDatetimePicker)();
}
const Todolist = () => "./components/todolist.js";
const AddTodo = () => "../../components/addTodo.js";
const uniDatetimePicker = () => "../../components/uni-datetime-picker/uni-datetime-picker.js";
const uniNavBar = () => "../../components/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const uniDrawer = () => "../../components/uni-drawer/components/uni-drawer/uni-drawer.js";
const __default__ = {
  methods: {
    showDrawer() {
      this.$refs.showRight.open();
    }
  },
  components: { Todolist, AddTodo, uniDatetimePicker, uniNavBar, uniDrawer }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  setup(__props) {
    let uid = common_vendor.index.getStorageSync("uid");
    common_vendor.ref([]);
    common_vendor.ref([]);
    const allTodoList = common_vendor.ref([]);
    const todoSort = common_vendor.ref([]);
    const active = common_vendor.ref(0);
    const active2 = common_vendor.ref(0);
    const isHeight = common_vendor.ref(true);
    const checked = common_vendor.ref(false);
    const isPopup = common_vendor.ref(false);
    const setItemData = common_vendor.ref({});
    const isAddSub = common_vendor.ref(false);
    const addSubTitle = common_vendor.ref("");
    const itemDateTime = common_vendor.ref("");
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
      sort: "",
      importIndex: 0
    });
    const findAllTodo = async (userId) => {
      await api_index.api.findAll({ userId }).then((res2) => {
        if (res2.data.code === 200) {
          allTodoList.value = res2.data.data;
        }
      });
    };
    findAllTodo(uid);
    common_vendor.watch(() => allTodoList.value, (value) => {
      allTodoList.value = value;
    }, {
      deep: true,
      immediate: true
    });
    const findAllSort = (userId) => {
      api_index.api.findSort({
        userId
      }).then((res2) => {
        todoSort.value = [...res2.data.data.sortList];
      }).catch((err) => {
      });
    };
    findAllSort(uid);
    common_vendor.onBeforeMount(() => {
      todoValue.sort = todoSort.value[0];
    });
    const clearTodoValue = () => {
      todoValue.title = "";
      todoValue.currentDate = "";
      todoValue.datetimerange = "";
      todoValue.sort = todoSort.value[0];
      todoValue.importIndex = 0;
    };
    const dianTitle = common_vendor.ref(`${month}/${date}\u5468${day}`);
    const onInput = (event) => {
      todoValue.currentDate = event.detail;
    };
    common_vendor.watch(() => todoValue.datetimerange, (val) => {
      todoValue.datetimerange = val;
    });
    const onChange = function(event) {
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
      setItemData.value.importIndex = index;
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
      if (active2.value === 0) {
        let oneDay = "";
        if (isTime.value) {
          oneDay = dianTitle.value;
        } else {
          oneDay = "";
        }
        itemDateTime.value = oneDay;
        setItemData.value.oneDay = oneDay;
        setItemData.value.currentDate = "";
        setItemData.value.datetimerange = "";
      } else if (active2.value === 1) {
        itemDateTime.value = dianTitle.value + todoValue.currentDate;
        setItemData.value.currentDate = dianTitle.value + todoValue.currentDate;
        setItemData.value.oneDay = "";
        setItemData.value.datetimerange = "";
      } else {
        itemDateTime.value = todoValue.datetimerange;
        setItemData.value.datetimerange = todoValue.datetimerange;
        setItemData.value.oneDay = "";
        setItemData.value.currentDate = "";
      }
    };
    const onChangeChecked = ({ detail }) => {
      checked.value = detail;
    };
    const submitTodo = (e) => {
      e.preventDefault();
      todoValue.title = todoValue.title.trim();
      if (todoValue.title === "") {
        Notify({ type: "warning", message: "\u8BF7\u8F93\u5165\u5185\u5BB9" });
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
          uid,
          title: todoValue.title,
          sort: todoValue.sort.id,
          import: todoValue.importIndex,
          oneDay,
          currentDate: "",
          datetimerange: ""
        };
        api_index.api.addTodo(params).then(async (res2) => {
          if (res2.data.code !== 200) {
            common_vendor.index.showLoading({
              title: "\u52A0\u8F7D\u4E2D..."
            });
          } else {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              icon: "none",
              title: "\u6DFB\u52A0\u6210\u529F",
              duration: 3e3,
              position: "top"
            });
          }
          findAllTodo(uid);
        });
      } else if (active2.value === 1) {
        let params = {
          uid,
          title: todoValue.title,
          sort: todoValue.sort.id,
          import: todoValue.importIndex,
          oneDay: "",
          currentDate: dianTitle.value + todoValue.currentDate,
          datetimerange: ""
        };
        api_index.api.addTodo(params).then(async (res2) => {
          if (res2.data.code !== 200) {
            common_vendor.index.showLoading({
              title: "\u52A0\u8F7D\u4E2D..."
            });
          } else {
            common_vendor.index.hideLoading();
            common_vendor.index.showToast({
              icon: "none",
              title: "\u6DFB\u52A0\u6210\u529F",
              duration: 3e3,
              position: "top"
            });
          }
          findAllTodo(uid);
        });
      } else if (active2.value === 2) {
        let params = {
          uid,
          title: todoValue.title,
          sort: todoValue.sort.id,
          import: todoValue.importIndex,
          oneDay: "",
          currentDate: "",
          datetimerange: todoValue.datetimerange
        };
        if (res.data.code !== 200) {
          common_vendor.index.showLoading({
            title: "\u52A0\u8F7D\u4E2D..."
          });
        } else {
          common_vendor.index.hideLoading();
          common_vendor.index.showToast({
            icon: "none",
            title: "\u6DFB\u52A0\u6210\u529F",
            duration: 3e3,
            position: "top"
          });
        }
        api_index.api.addTodo(params).then(async (res2) => {
          findAllTodo(uid);
        });
      }
      clearTodoValue();
      isInput.value = false;
    };
    const setItem = (item) => {
      const subItem = JSON.parse(JSON.stringify(item));
      isPopup.value = true;
      setItemData.value = subItem;
    };
    const updataTodoStatus = (todoId, isFinish) => {
      api_index.api.updataTodoStatus({ todoId, isFinish: +isFinish }).then((res2) => {
        findAllTodo(uid);
      });
    };
    const updateSubtodo = () => {
      findAllTodo(uid);
    };
    const onClose = () => {
      isPopup.value = false;
      setItemData.value = {};
      addSubTitle.value = "";
      findAllTodo(uid);
      clearTodoValue();
    };
    const addTodoChange = (event) => {
      setItemData.value.title = event.detail;
    };
    const addSubChange = (event) => {
      addSubTitle.value = event.detail;
    };
    const pushSubtodo = () => {
      if (addSubTitle.value === "")
        return;
      const param = {
        title: addSubTitle.value,
        isFinite: 0,
        todoId: setItemData.value.id,
        uid: setItemData.value.uid
      };
      api_index.api.insterSubtodo(param).then((res2) => {
      }).catch((err) => {
      });
      setItemData.value.subTodoList.push(param);
      addSubTitle.value = "";
    };
    const addSubTodo = () => {
      isAddSub.value = true;
    };
    function removeArray(_arr, _obj) {
      let length = _arr.length;
      for (let i = 0; i < length; i++) {
        if (_arr[i] === _obj) {
          if (i === 0) {
            _arr.shift();
            return _arr;
          } else if (i === length - 1) {
            _arr.pop();
            return _arr;
          } else {
            _arr.splice(i, 1);
            return _arr;
          }
        }
      }
    }
    const closeSubTodo = (item) => {
      api_index.api.deleteSubTodo({ id: item.id }).then((res2) => {
      });
      setItemData.value.subTodoList = removeArray(setItemData.value.subTodoList, item);
    };
    const saveTodo = () => {
      console.log(setItemData.value);
      const params = JSON.stringify(setItemData.value);
      api_index.api.updateTodo({ todoData: params }).then(async (res2) => {
        isPopup.value = false;
        findAllTodo(uid);
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(_ctx.showDrawer),
        b: common_vendor.p({
          statusBar: true,
          title: "\u4E8B\u9879\u6E05\u5355"
        }),
        c: common_vendor.o(onChangeChecked),
        d: common_vendor.p({
          checked: checked.value
        }),
        e: !isHeight.value ? 1 : "",
        f: isHeight.value ? 1 : "",
        g: common_vendor.o(($event) => isHeight.value = !isHeight.value),
        h: isHeight.value ? 1 : "",
        i: !isHeight.value ? 1 : "",
        j: common_vendor.sr("showRight", "1badc801-1"),
        k: common_vendor.p({
          ["left-icon"]: "left",
          mode: "left",
          width: 300
        }),
        l: allTodoList.value.length > 0
      }, allTodoList.value.length > 0 ? {
        m: common_vendor.o(setItem),
        n: common_vendor.o(updataTodoStatus),
        o: common_vendor.o(updateSubtodo),
        p: common_vendor.p({
          dataList: allTodoList.value,
          checked: checked.value
        })
      } : {}, {
        q: common_vendor.p({
          title: "\u5168\u90E8"
        }),
        r: common_vendor.f(todoSort.value, (item, k0, i0) => {
          return common_vendor.e(allTodoList.value.length > 0 ? {
            a: common_vendor.o(setItem),
            b: "1badc801-8-" + i0 + "," + ("1badc801-7-" + i0),
            c: common_vendor.p({
              dataList: allTodoList.value,
              sort: item,
              checked: checked.value
            })
          } : {}, {
            d: item.id,
            e: "1badc801-7-" + i0 + ",1badc801-4",
            f: common_vendor.p({
              title: item.title
            })
          });
        }),
        s: allTodoList.value.length > 0,
        t: common_vendor.o(onChange),
        v: common_vendor.p({
          active: active.value,
          sticky: true,
          animated: true,
          swipeable: true,
          zindex: "2"
        }),
        w: common_vendor.o(($event) => isInput.value = true),
        x: isInput.value
      }, isInput.value ? common_vendor.e({
        y: common_vendor.unref(isTime)
      }, common_vendor.unref(isTime) ? common_vendor.e({
        z: active2.value == 0
      }, active2.value == 0 ? {
        A: common_vendor.t(dianTitle.value)
      } : {}, {
        B: active2.value == 1
      }, active2.value == 1 ? {
        C: common_vendor.t(dianTitle.value),
        D: common_vendor.t(common_vendor.unref(todoValue).currentDate)
      } : {}, {
        E: active2.value == 2 && common_vendor.unref(todoValue).datetimerange.length != 0 && common_vendor.unref(todoValue).datetimerange[0].substr(-8) == "00:00:00"
      }, active2.value == 2 && common_vendor.unref(todoValue).datetimerange.length != 0 && common_vendor.unref(todoValue).datetimerange[0].substr(-8) == "00:00:00" ? {
        F: common_vendor.t(common_vendor.unref(todoValue).datetimerange[0].substr(0, 10)),
        G: common_vendor.t(common_vendor.unref(todoValue).datetimerange[1].substr(0, 10))
      } : {}, {
        H: active2.value == 2 && common_vendor.unref(todoValue).datetimerange.length != 0 && common_vendor.unref(todoValue).datetimerange[0].substr(-8) != "00:00:00"
      }, active2.value == 2 && common_vendor.unref(todoValue).datetimerange.length != 0 && common_vendor.unref(todoValue).datetimerange[0].substr(-8) != "00:00:00" ? {
        I: common_vendor.t(common_vendor.unref(todoValue).datetimerange[0]),
        J: common_vendor.t(common_vendor.unref(todoValue).datetimerange[1])
      } : {}) : {}, {
        K: common_vendor.t(common_vendor.unref(todoValue).sort.title),
        L: common_vendor.unref(todoValue).importIndex == 0
      }, common_vendor.unref(todoValue).importIndex == 0 ? {} : {}, {
        M: common_vendor.unref(todoValue).importIndex == 1
      }, common_vendor.unref(todoValue).importIndex == 1 ? {} : {}, {
        N: common_vendor.unref(todoValue).importIndex == 2
      }, common_vendor.unref(todoValue).importIndex == 2 ? {} : {}, {
        O: common_vendor.unref(todoValue).importIndex == 3
      }, common_vendor.unref(todoValue).importIndex == 3 ? {} : {}, {
        P: common_vendor.o(($event) => submitTodo($event)),
        Q: common_vendor.o(getFocus),
        R: common_vendor.o(outFocus),
        S: common_vendor.o(($event) => common_vendor.unref(todoValue).title = $event.detail),
        T: common_vendor.p({
          type: "text",
          focus: true,
          border: true,
          autosize: true,
          adjustPosition: false,
          value: common_vendor.unref(todoValue).title,
          placeholder: "\u628A\u4E8B\u60C5\u8BB0\u5F55\u4E0B\u6765~"
        }),
        U: common_vendor.o(($event) => isSheet.value = true),
        V: common_vendor.o(($event) => isSortSheet.value = true),
        W: common_vendor.o(($event) => isImportSheet.value = true),
        X: iptBottom.value + "px"
      }) : {}, {
        Y: common_vendor.o(closeTime),
        Z: common_vendor.o(sureTime),
        aa: common_vendor.t(dianTitle.value),
        ab: common_vendor.p({
          title: "\u5168\u5929"
        }),
        ac: common_vendor.o(onInput),
        ad: common_vendor.p({
          type: "time",
          value: common_vendor.unref(todoValue).currentDate,
          title: dianTitle.value,
          itemHeight: 30,
          visibleItemCount: 12,
          confirmButtonText: "",
          cancelButtonText: ""
        }),
        ae: common_vendor.p({
          title: "\u65F6\u95F4\u70B9"
        }),
        af: common_vendor.o(($event) => common_vendor.unref(todoValue).datetimerange = ""),
        ag: common_vendor.o(($event) => common_vendor.unref(todoValue).datetimerange = $event),
        ah: common_vendor.p({
          type: "datetimerange",
          rangeSeparator: "\u81F3",
          modelValue: common_vendor.unref(todoValue).datetimerange
        }),
        ai: common_vendor.p({
          title: "\u65F6\u95F4\u6BB5"
        }),
        aj: common_vendor.o(onChange2),
        ak: common_vendor.p({
          active: active2.value
        }),
        al: common_vendor.o(($event) => isSheet.value = false),
        am: common_vendor.p({
          show: isSheet.value,
          closeOnClickOverlay: true,
          zIndex: "200"
        }),
        an: common_vendor.f(todoSort.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item,
            c: common_vendor.o(($event) => selectSort(item))
          };
        }),
        ao: common_vendor.o(($event) => isSortSheet.value = false),
        ap: common_vendor.p({
          show: isSortSheet.value,
          closeOnClickOverlay: true,
          zIndex: "200"
        }),
        aq: common_vendor.unref(todoValue).importIndex === 0
      }, common_vendor.unref(todoValue).importIndex === 0 ? {} : {}, {
        ar: common_vendor.o(($event) => selectImport(0)),
        as: common_vendor.unref(todoValue).importIndex === 1
      }, common_vendor.unref(todoValue).importIndex === 1 ? {} : {}, {
        at: common_vendor.o(($event) => selectImport(1)),
        av: common_vendor.unref(todoValue).importIndex === 2
      }, common_vendor.unref(todoValue).importIndex === 2 ? {} : {}, {
        aw: common_vendor.o(($event) => selectImport(2)),
        ax: common_vendor.unref(todoValue).importIndex === 3
      }, common_vendor.unref(todoValue).importIndex === 3 ? {} : {}, {
        ay: common_vendor.o(($event) => selectImport(3)),
        az: common_vendor.o(($event) => isImportSheet.value = false),
        aA: common_vendor.p({
          show: isImportSheet.value,
          closeOnClickOverlay: true,
          zIndex: "200"
        }),
        aB: common_vendor.o(($event) => isInput.value = false),
        aC: common_vendor.p({
          show: isInput.value,
          zIndex: "50"
        }),
        aD: common_vendor.unref(todoValue).importIndex === 0
      }, common_vendor.unref(todoValue).importIndex === 0 ? {
        aE: common_vendor.o(($event) => isImportSheet.value = true)
      } : {}, {
        aF: common_vendor.unref(todoValue).importIndex === 1
      }, common_vendor.unref(todoValue).importIndex === 1 ? {
        aG: common_vendor.o(($event) => isImportSheet.value = true)
      } : {}, {
        aH: common_vendor.unref(todoValue).importIndex === 2
      }, common_vendor.unref(todoValue).importIndex === 2 ? {
        aI: common_vendor.o(($event) => isImportSheet.value = true)
      } : {}, {
        aJ: common_vendor.unref(todoValue).importIndex === 3
      }, common_vendor.unref(todoValue).importIndex === 3 ? {
        aK: common_vendor.o(($event) => isImportSheet.value = true)
      } : {}, {
        aL: common_vendor.o(addTodoChange),
        aM: common_vendor.p({
          type: "text",
          maxlength: "15",
          customStyle: "font-size: 16px;",
          value: setItemData.value.title
        }),
        aN: common_vendor.f(setItemData.value.subTodoList, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.o(($event) => closeSubTodo(item)),
            c: item.id
          };
        }),
        aO: isAddSub.value
      }, isAddSub.value ? {
        aP: common_vendor.o(addSubChange),
        aQ: common_vendor.o(pushSubtodo),
        aR: common_vendor.p({
          type: "text",
          placeholder: "\u5B50\u4EFB\u52A1~",
          focus: true,
          value: addSubTitle.value
        })
      } : {}, {
        aS: common_vendor.o(addSubTodo),
        aT: common_vendor.t(setItemData.value.currentDate),
        aU: common_vendor.t(setItemData.value.datetimerange),
        aV: common_vendor.t(setItemData.value.oneDay),
        aW: common_vendor.o(($event) => isSheet.value = true),
        aX: common_vendor.o(saveTodo),
        aY: common_vendor.o(onClose),
        aZ: common_vendor.p({
          show: isPopup.value,
          position: "bottom",
          round: true
        })
      });
    };
  }
});
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1badc801"]]);
wx.createPage(MiniProgramPage);
