<script>
  export default {
    methods: {
      showDrawer() {
        this.$refs.showRight.open();
      },
    },
    components: { Todolist, AddTodo, uniDatetimePicker, uniNavBar, uniDrawer }
  }
</script>
<script setup>
import { onBeforeMount, onMounted, reactive, ref, watch } from 'vue'
import Todolist from './components/todolist.vue'
import AddTodo from '../../components/addTodo.vue'
import uniDatetimePicker from '../../components/uni-datetime-picker/uni-datetime-picker.vue'
import uniNavBar from '../../components/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue'
import uniDrawer from '../../components/uni-drawer/components/uni-drawer/uni-drawer.vue'
// import Notify from '../../wxcomponents/vant/dist/notify/notify'
import api from '../../api/index'

let uid = uni.getStorageSync('uid')

const finishList = ref([]);
const noFinishList = ref([]);
const allTodoList = ref([]);
const todoSort = ref([]);
const active = ref(0); // 主页面tab 索引
const active2 = ref(0); // 选择时间 tab 索引
const isHeight = ref(true)
const checked = ref(false)
const isPopup = ref(false);
const setItemData = ref({});
const isAddSub = ref(false);
const addSubTitle = ref('')
// 编辑todo
const itemDateTime = ref('')
let myDate = new Date();
let hours = myDate.getHours();
let minutes = myDate.getMinutes();
let month = myDate.getMonth()+1;
let date = myDate.getDate();
let day = myDate.getDay();
switch (day) {
  case 1:
    day = '一'
    break;
  case 2:
    day = '二'
    break;
  case 3:
    day = '三'
    break;
  case 4:
    day = '四'
    break;
  case 5:
    day = '五'
    break;
  case 6:
    day = '六'
    break;
  case 0:
    day = '日'
    break;
  default:
    break;
}
// 整体事项信息
const todoValue = reactive({
  title: '',
  currentDate: `${hours}:${minutes}`,
  datetimerange: '',
  sort: '',
  importIndex: 0
});

const findAllTodo = async (userId)=> {
  await api.findAll({userId: userId}).then(res=> {
    if(res.data.code === 200) {
      allTodoList.value = res.data.data
    }
  })
}
findAllTodo(uid);
watch(()=> allTodoList.value,(value)=> {
  allTodoList.value = value
},{
  deep: true,
  immediate: true
})

const findAllSort = (userId)=> {
  api.findSort({
    userId: userId
  }).then(res=> {
    todoSort.value = [...res.data.data.sortList]
  }).catch(err=> {
    // console.log(err);
  })
}


findAllSort(uid)

onBeforeMount(()=> {
  todoValue.sort = todoSort.value[0]
})

// 清空数据
const clearTodoValue = ()=> {
  todoValue.title = '';
  todoValue.currentDate = '';
  todoValue.datetimerange = '';
  todoValue.sort = todoSort.value[0];
  todoValue.importIndex = 0;
}
// 时间点标题
const dianTitle = ref(`${month}/${date}周${day}`)

// 拖动时间点触发
const onInput = (event) => {
  todoValue.currentDate = event.detail
}

watch(()=> todoValue.datetimerange,(val)=> {
  todoValue.datetimerange = val
})

const onChange = function (event) {
  // 切换主tabs 事件
  // if(event.detail.name !== 0 && event.detail.name !== todoSort.length + 1) {
  //   // todoValue.sort = todoSort[event.detail.name - 1];
  // }else {
  // }
  // console.log(todoValue.sort);
};
const onChange2 = function (event) {
  // 切换时间tabs 事件
  active2.value = event.detail.name
  if(event.detail.name === 0) {
    // 选择时间点
    todoValue.datetimerange=''
  }else if(event.detail.name === 1) {
    // 选择范围时间
    todoValue.currentDate=`${hours}:${minutes}`
  }
};
    
const isInput = ref(false);
// input 距离底部距离
const iptBottom = ref(0) 
const getFocus = (e)=> {
  iptBottom.value = e.detail.height;
}
const outFocus =(e)=> {
  iptBottom.value = 85
}
// 动作面板
const isSheet = ref(false); 
const isSortSheet = ref(false);
const isImportSheet = ref(false);

const selectImport = (index)=> {
  todoValue.importIndex = index;
  setItemData.value.importIndex = index;
  isImportSheet.value = false;
  
}
const selectSort = (item)=> {
  todoValue.sort = item;
  isSortSheet.value = false;
  let todoInput = uni.createSelectorQuery().select('#todo-input');
  // todoInput.boundingClientRect((data)=>{
  //     console.log(data)
  // }).exec()
}

// 如果没有选择时间 那么就没有时间
let isTime = ref(false);
const closeTime = ()=> {
  isSheet.value = false;
  isTime.value = false;
}
const sureTime = ()=> {
  isSheet.value = false;
  isTime.value = true;
  if(active2.value === 0) {
    // 全天
    let oneDay = '';
    if(isTime.value) {
      oneDay = dianTitle.value;
    }else {
      oneDay = ''
    }
    itemDateTime.value = oneDay;
    setItemData.value.oneDay = oneDay
    setItemData.value.currentDate=''
    setItemData.value.datetimerange=''
  }else if(active2.value === 1) {
    // 时间点
    itemDateTime.value = dianTitle.value + todoValue.currentDate
    setItemData.value.currentDate = dianTitle.value + todoValue.currentDate
    setItemData.value.oneDay =''
    setItemData.value.datetimerange=''
  }else {
    // 时间段
    itemDateTime.value =  todoValue.datetimerange
    setItemData.value.datetimerange = todoValue.datetimerange
    setItemData.value.oneDay =''
    setItemData.value.currentDate=''
  }

}

//Checked
const onChangeChecked = ({ detail })=> {
  checked.value = detail
}

// 提交
const submitTodo = (e)=> {
  e.preventDefault();
  todoValue.title = todoValue.title.trim();
  if(todoValue.title === '') {
    Notify({ type: 'warning', message: '请输入内容' });
    return
  }
  // 先判断选择是时间类型
  if(active2.value === 0) {
    // 全天 
    let oneDay = '';
    if(isTime.value) { // 默认
      oneDay = dianTitle.value;
    }else {
      oneDay = ''
    }
    let params = {
      uid: uid,
      title: todoValue.title,
      sort: todoValue.sort.id,
      import: todoValue.importIndex,
      oneDay: oneDay,
      currentDate: '',
      datetimerange: '' 
    }
    api.addTodo(params).then(async res=> {
      if(res.data.code !== 200) {
        uni.showLoading({
          title: '加载中...'
        });
      }else {
        uni.hideLoading();
        uni.showToast({
          icon: "none",
          title: '添加成功',
          duration: 3000,
          position: 'top'
        })
      }
      findAllTodo(uid)
    })
  }else if(active2.value === 1) {
    // 时间点
    let params = {
      uid: uid,
      title: todoValue.title,
      sort: todoValue.sort.id,
      import: todoValue.importIndex,
      oneDay: '',
      currentDate: dianTitle.value + todoValue.currentDate,
      datetimerange: '' 
    }
    api.addTodo(params).then(async res=> {
      if(res.data.code !== 200) {
        uni.showLoading({
          title: '加载中...'
        });
      }else {
        uni.hideLoading();
        uni.showToast({
          icon: "none",
          title: '添加成功',
          duration: 3000,
          position: 'top'
        })
      }
      findAllTodo(uid)
    })
  }else if(active2.value === 2) {
    // 时间段
    let params = {
      uid: uid,
      title: todoValue.title,
      sort: todoValue.sort.id,
      import: todoValue.importIndex,
      oneDay: '',
      currentDate: '',
      datetimerange: todoValue.datetimerange
    }
    if(res.data.code !== 200) {
        uni.showLoading({
          title: '加载中...'
        });
      }else {
        uni.hideLoading();
        uni.showToast({
          icon: "none",
          title: '添加成功',
          duration: 3000,
          position: 'top'
        })
      }
    api.addTodo(params).then(async res=> {
      findAllTodo(uid)
    })
  }
  clearTodoValue()
  isInput.value = false;
  // todoValue.title = ''
  // todoValue.currentDate = `${hours}:${minutes}`
}
const setItem = (item)=> {
  const subItem = JSON.parse(JSON.stringify(item))
  isPopup.value = true
  setItemData.value = subItem
  // itemDateTime.value = item.dateTime
  // console.log(setItemData.value);
}
const updataTodoStatus = (todoId, isFinish) => {
  api.updataTodoStatus({todoId: todoId, isFinish: +isFinish}).then(res=> {
    findAllTodo(uid);
  })
}
const updateSubtodo = ()=> {
  findAllTodo(uid);
}
const onClose = ()=> {
  isPopup.value = false
  setItemData.value = {}
  addSubTitle.value = ''
  findAllTodo(uid);
  clearTodoValue()
}
const addTodoChange = (event)=> {
  setItemData.value.title = event.detail
}
const addSubChange = (event)=> {
  addSubTitle.value = event.detail
}
// 失去焦点 添加
const pushSubtodo = ()=> {
  // 添加子任务请求
  if(addSubTitle.value === '') return
  const param = {
    title: addSubTitle.value,
    isFinite: 0,
    todoId: setItemData.value.id,
    uid: setItemData.value.uid
  }
  api.insterSubtodo(param).then(res=> {
    
  }).catch(err=> {
    
  })
  setItemData.value.subTodoList.push(param)
  addSubTitle.value = ''
}

const addSubTodo = ()=> {
  isAddSub.value = true

}

function removeArray(_arr, _obj) {
  let length = _arr.length
  for (let i = 0; i < length; i++) {
    if (_arr[i] === _obj) {
      if (i === 0) {
        _arr.shift() //删除并返回数组的第一个元素
        return _arr
      } else if (i === length - 1) {
        _arr.pop()  //删除并返回数组的最后一个元素
        return _arr
      } else {
        _arr.splice(i, 1) //删除下标为i的元素
        return _arr
      }
    }
  }
}

const closeSubTodo = (item)=> {
  api.deleteSubTodo({id: item.id}).then(res=> {
    // console.log(res);
  })
  setItemData.value.subTodoList = removeArray(setItemData.value.subTodoList,item)
}
const saveTodo = ()=> {
  console.log(setItemData.value);
  const params = JSON.stringify(setItemData.value)
  api.updateTodo({todoData: params}).then(async res=> {
    isPopup.value = false
    findAllTodo(uid);
  })
}


</script>

<template>
  <uni-nav-bar 
    @clickLeft="showDrawer"
    :statusBar="true"
    title="事项清单">
    <template v-slot:left>
      <span class="iconfont icon-liebiaomoshi_kuai" style="margin-left: 20px;"></span>
    </template>
  </uni-nav-bar>
  <uni-drawer left-icon="left" ref="showRight" mode="left" :width="300">
    <div class="status-nav-h"></div>
    <div class="status-nav-h"></div>
    <div class="drawer" style="width: 100%;">
      <ul class="drawer-list">
        <li class="drawer-item flex" style="justify-content: space-between;align-items: center;">
          <span>隐藏已完成</span>
          <van-switch :checked="checked" @change="onChangeChecked" />
        </li>
        <li class="drawer-item">
          <span style="color:#999; font-size: 14px;">按分类展示</span>
        </li>
        <li class="drawer-item">
          <span class="iconfont icon-fenlei1 drawer-icon"></span>
          分类管理  
        </li>
        <li class="drawer-item">
          <span style="color:#999; font-size: 12px;">功能</span>
        </li>
        <li class="drawer-item">
          <span class="iconfont icon-sousuotianchong drawer-icon"></span>
          搜索
        </li>
        <li class="drawer-item flex" @click="isHeight=!isHeight" style="display: flex;flex-wrap: wrap;">
          <span class="iconfont icon-guidang drawer-icon"></span>
          <span style="width: 100px; flex: 1;">归档</span>
          <span class="iconfont icon-xuanzeqizhankai"
            :class="{'open': !isHeight,'close': isHeight}"
          ></span>
        </li>
        <li :class="{'h_0': isHeight,'h_80': !isHeight}" class="guidang">
          <div class="guidang-item">
            <span class="iconfont icon-cuowu" style="margin-right: 15px;"></span>
            <span>未完成</span>
            <span class="guidang-num">1</span></div>
          <div class="guidang-item">
            <span class="iconfont icon-yidongduan_yanzhirenwuyiwancheng" style="margin-right: 15px;"></span>
            <span>已完成</span>
            <span class="guidang-num">10</span></div>
        </li>
        <li class="drawer-item">
          <span class="iconfont icon-tongji drawer-icon"></span>
          统计
        </li>
      </ul>
    </div>
  </uni-drawer>
  
  <div class="content">
  <van-notify id="van-notify" />
    <van-tabs
      :active="active" 
      @click="onChange" 
      sticky 
      animated
      swipeable
      zindex="2"
      >
      <van-tab title="全部">
        <template #default>
          <div class="h">
            <todolist v-if="allTodoList.length > 0" :dataList="allTodoList" :checked="checked" @setItem="setItem" @updataTodoStatus="updataTodoStatus" @updateSubTodoStatus="updateSubtodo" />
          </div>
        </template>
      </van-tab>
      <van-tab :title="item.title" v-for="item in todoSort" :key="item.id">
        <template #default>
          <div class="h">
            <todolist v-if="allTodoList.length > 0" :dataList="allTodoList" :sort="item" :checked="checked" @setItem="setItem" />
          </div>
        </template>
      </van-tab>
    </van-tabs>
    <!-- 添加按钮 -->
    <div class="add-btn" @click="isInput = true"><span class="iconfont icon-jia"></span></div>
    <!-- 输入框 -->
    <div v-if="isInput" class="add-input" :style="{bottom: iptBottom + 'px'}" style="background-color: #fff;">
      <!-- 输入框上显示的东西 -->
      <ul class="show-todo"> 
        <li class="show-todo-item" v-if="isTime">
          <span class="item-span" v-if="active2 == 0">{{dianTitle}}</span>
          <span class="item-span" v-if="active2 == 1">{{dianTitle}} {{todoValue.currentDate}}</span>
          <span class="item-span" v-if="active2 == 2 && todoValue.datetimerange.length !=0 && todoValue.datetimerange[0].substr(-8) == '00:00:00'">{{todoValue.datetimerange[0].substr(0,10)}}—{{todoValue.datetimerange[1].substr(0,10)}}</span>
          <span class="item-span" v-if="active2 == 2 && todoValue.datetimerange.length !=0 && todoValue.datetimerange[0].substr(-8) != '00:00:00'">{{todoValue.datetimerange[0]}}—{{todoValue.datetimerange[1]}}</span>
        </li>
        <li class="show-todo-item">
          <span class="item-span">{{todoValue.sort.title}}</span>
        </li>
        <li class="show-todo-item">
          <span class="item-span" v-if="todoValue.importIndex == 0">重要且紧急</span>
          <span class="item-span" v-if="todoValue.importIndex == 1">重要且不紧急</span>
          <span class="item-span" v-if="todoValue.importIndex == 2">不重要紧急</span>
          <span class="item-span" v-if="todoValue.importIndex == 3">不重要不紧急</span>
        </li>
      </ul>
      <!-- 提交按钮 -->
      <span class="submit-todo iconfont icon-feiji" @click.stop="submitTodo($event)"></span>
      <!-- 输入框 -->
      <div style="width: 80%;">
        <van-field
          id="todo-input"
          style="z-index: 20;"
          type="text" 
          @focus.prevent="getFocus" 
          @blur="outFocus" 
          focus
          :border="true"
          :autosize="true" 
          :adjust-position="false"
          @change="todoValue.title = $event.detail"
          :value="todoValue.title"
          placeholder="把事情记录下来~"></van-field>
      </div>
      <div class="add-set">
        <span class="set-item iconfont icon-shijian" style="color: #8a8a8a;" @click="isSheet = true"></span>
        <span class="set-item iconfont icon-fenlei" style="color: #e98f36;" @click="isSortSheet = true"></span>
        <span class="set-item iconfont icon-gantanhao" style="color: #f95843;" @click="isImportSheet = true"></span>
      </div>
    </div>
    <!-- 时间动作面板 -->
    <van-action-sheet 
      :show="isSheet" 
      :close-on-click-overlay="true" 
      @click-overlay="isSheet=false"
      z-index="200"
      >
      <view class="select-items">
        <div class="time-btn">
          <span @click="closeTime">清除时间</span>
          <span @click="sureTime">确定</span>
        </div>
        <van-tabs :active="active2" @click="onChange2">
          <van-tab title="全天">
            <template #default>
              <div style="text-align: center;margin-top: 20px;">
                {{dianTitle}}
              </div>
            </template>
          </van-tab>
          <van-tab title="时间点">
            <template #default>
              <div>
                <van-datetime-picker
                  type="time"
                  :value="todoValue.currentDate"
                  :title="dianTitle"
                  :item-height="30"
                  :visible-item-count="12"
                  :confirm-button-text="''"
                  :cancel-button-text="''"
                  @input="onInput"
                />
              </div>
            </template>
          </van-tab>
          <van-tab title="时间段">
            <template #default>
              <div class="t">
                <uni-datetime-picker
                  v-model="todoValue.datetimerange"
                  type="datetimerange"
                  rangeSeparator="至"
                  @maskClick="todoValue.datetimerange=''"
                />
              </div>
            </template>
          </van-tab>
        </van-tabs>
      </view>
    </van-action-sheet>
    <!-- 分类动作面板 -->
    <van-action-sheet
      :show="isSortSheet"
      :close-on-click-overlay="true"
      @click-overlay="isSortSheet = false"
      z-index="200"
    >
      <ul class="sort-list">
        <li class="sort-item" v-for="item in todoSort" :key="item" @click="selectSort(item)">
          <span>-</span>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </van-action-sheet>
    <!-- 重要程度动作面板 -->
    <van-action-sheet
      :show="isImportSheet"
      :close-on-click-overlay="true"
      @click-overlay="isImportSheet = false"
      z-index="200"
    >
      <ul class="imp-list">
        <li class="imp-item" style="color: red;" @click.stop="selectImport(0)">
          <span style="margin-right: 20px;" class="iconfont icon-a-shuizhipingjia3"></span>
          <span class="imp-tit">重要且紧急</span> 
          <span v-if="todoValue.importIndex === 0" style="color: blue;">√</span>
        </li>
        <li class="imp-item" style="color: orange;" @click.stop="selectImport(1)">
          <span style="margin-right: 20px;" class="iconfont icon-a-shuizhipingjia2"></span>
          <span class="imp-tit">重要不紧急</span> 
          <span v-if="todoValue.importIndex === 1" style="color: blue;">√</span>
        </li>
        <li class="imp-item" style="color: green;" @click.stop="selectImport(2)">
          <span style="margin-right: 20px;" class="iconfont icon-a-shuizhipingjia1"></span>
          <span class="imp-tit">不重要紧急</span> 
          <span v-if="todoValue.importIndex === 2" style="color: blue;">√</span>
        </li>
        <li class="imp-item" style="color: blue;" @click.stop="selectImport(3)">
          <span style="margin-right: 20px;" class="iconfont icon-a-shuizhipingjia"></span>
          <span class="imp-tit">不重要不紧急</span> 
          <span v-if="todoValue.importIndex === 3" style="color: blue;">√</span>
        </li>
      </ul>
    </van-action-sheet>
    
    <van-overlay :show="isInput" @click="isInput=false" z-index="50" />
  </div>

  <van-popup
    :show="isPopup"
    position="bottom"
    round
    @close="onClose"
  >
    <div class="set-todo">
      <div class="set-top" style="display: flex;align-items: center;">
        <span style="color: red;" @click="isImportSheet = true" class="iconfont icon-a-shuizhipingjia3" v-if="todoValue.importIndex === 0"></span>
        <span style="color: orange;" @click="isImportSheet = true" class="iconfont icon-a-shuizhipingjia2" v-if="todoValue.importIndex === 1"></span>
        <span style="color: green;" @click="isImportSheet = true" class="iconfont icon-a-shuizhipingjia1" v-if="todoValue.importIndex === 2"></span>
        <span style="color: blue;" @click="isImportSheet = true" class="iconfont icon-a-shuizhipingjia" v-if="todoValue.importIndex === 3"></span>
        <div class="set-title">
          <van-field
            type="text"
            maxlength=15
            custom-style="font-size: 16px;"
            :value="setItemData.title"
            @change="addTodoChange"
          >
          </van-field>
        </div>
      </div>
      <div class="set-mid">
        <ul>
          <li class="subtodoItem" v-for="item in setItemData.subTodoList" :key="item.id" style="margin-bottom: 3px;">
            <span class="iconfont icon-big-circle" style="color: blue;"></span>
            <span class="subtitle">{{item.title}}</span>
            <span @click="closeSubTodo(item)" class="iconfont icon-cuowuguanbiquxiao-xianxingyuankuang"></span>
          </li>
        </ul>
        <van-field 
          v-if="isAddSub" 
          type="text" 
          placeholder="子任务~" 
          focus
          :value="addSubTitle"
          @change="addSubChange"
          @blur="pushSubtodo"
        />
        <div class="add-sub-item" @click="addSubTodo" style="margin-bottom: 10px;">+添加子任务</div>
        <div>{{setItemData.currentDate}}</div>
        <div>{{setItemData.datetimerange}}</div>
        <div>{{setItemData.oneDay}}</div>
      </div>
      <div class="set-bottom">
        <span class="set-btn" @click="isSheet = true">设置时间</span>
        <span class="set-btn">完成</span>
        <span class="set-btn">未完成</span>
        <span class="set-btn">删除</span>
      </div>
      <div class="save" style="background-color: #cce6ff;" @click="saveTodo">保存</div>
    </div>
  </van-popup>
</template>

<style lang="less" scoped>
.subtodoItem {
  display: flex;
  align-items: center;
}
.subtitle {
  flex: 1;
  margin: 0 15px;
}
.save {
  margin: 0 20px;
  height: 40px;
  line-height: 40px;
  border-radius: 50px;
  text-align: center;
}
.set-todo {
  height: 100%;
  .set-top {
    display: flex;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, .05);
    padding: 10px 15px;
    .set-title {
      margin-left: 13px;
    }
  }
  .set-mid {
    padding: 0 15px;
  }
  .set-bottom {
    margin: 20px 0;
    display: flex;
    width: 100%;
    .set-btn {
      border-radius: 15px;
      flex: 1;
      text-align: center;
      height: 35px;
      line-height: 35px;
      background-color: #cce6ff;
      margin: 0 10px;
      width: 110px;
    }
  }
}
.close {
  display: inline-block;
  transform: rotate(0deg);
  transition: all .5s;
}
.open {
  display: inline-block;
  transform: rotate(180deg);
  transition: all .5s;
}
.h_0 {
  height: 0;
  overflow: hidden;
  transition: all .5s;
}
.h_80 {
  height: 80px;
  overflow: hidden;
  transition: all .5s;
}
.guidang {
  width: 100%;
  padding-left: 40px;
  .guidang-item {
    height: 40px;
    line-height: 40px;
    .guidang-num {
      color: rgb(83, 157, 255);
      margin-left: 50px;
      display: inline-block;
    }
  }
}
.status-nav-h {
  height: var(--status-bar-height);
}
.drawer {
  height: 95vh;
  overflow: auto;
  .drawer-list {
    .drawer-item {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      .drawer-icon {
        margin-right: 15px;
      }
    }
  }
}
.show-todo {
  position: absolute;
  bottom: 100px;
  z-index: 200;
  left: 15px;
  .show-todo-item {
    margin-top: 15px;
    .item-span {
      background-color: rgb(243, 243, 243);
      padding: 5px 15px;
      border-radius: 50px;
      font-size: 13px;
      color: rgb(85, 85, 85);
    }
  }
}

.sort-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
  .sort-item {
    background-color: rgb(215, 231, 250);
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
  }
}

.imp-list {
  padding: 10px 20px;
  .imp-item {
    height: 50px;
    line-height: 50px;
    display: flex;
    padding: 0 20px;
    border-bottom: 1px solid rgba(0, 0, 0, .05);
    .imp-tit {
      flex: 1;
    }
  }
}


van-tabs {
  height: 100% !important;
}

.content {
  height: 100vh;
  overflow-y: auto;
  position: relative;
}
.h {
  height: 93vh;
}
.t {
  height: 70vh;
}
.select-items {
  padding: 15px 20px;
  box-sizing: border-box;
  .time-btn {
    display: flex;
    justify-content: space-between;
  }
}
.add-btn {
  border-radius: 50%;
  position: absolute;
  right: 30px;
  bottom: 120px;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-color: #ccc;
  color: #fff;
  background-color: rgb(126, 193, 255);
}
.add-input {
  z-index: 100;
  position: absolute;
  bottom: 0;
  height: 80px;
  width: 100%;
  .add-set {
    display: flex;
    background-color: #fff;
    height: 35px;
    align-items: center;
    .set-item {
      margin: 0 15px;
      font-size: 20px;
    }
  }
  .submit-todo {
    position: absolute;
    z-index: 150;
    right: 30px;
    top: 10px;
    font-size: 30px;
    color: rgb(98, 178, 253);
  }
}
</style>
