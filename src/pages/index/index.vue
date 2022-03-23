<script>
import { reactive, ref, watch } from 'vue'
import Todolist from './components/todolist.vue';
import AddTodo from '../../components/addTodo.vue';
import uniDatetimePicker from '../../components/uni-datetime-picker/uni-datetime-picker.vue';
import Notify from '../../wxcomponents/vant/dist/notify/notify';
export default {
  setup() {
    const active = ref(0); // tab 索引
    const active2 = ref(0);

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
      datetimerange: ''
    });
    // 时间点标题
    const dianTitle = ref(`${month}/${date}周${day}`)

    // 拖动时间点触发
    const onInput = (event) => {
      todoValue.currentDate = event.detail
    }

    /*选择范围时间*/
    const updatatimerange = ()=> {
      console.log(todoValue.datetimerange);
    }
    watch(()=> todoValue.datetimerange,(val)=> {
      todoValue.datetimerange = val
    })


    const onChange = function (event) {
      // 切换主tabs 事件
      console.log(event.detail.name);
    };
    const onChange2 = function (event) {
      // 切换时间tabs 事件
      console.log(event.detail.name);

      if(event.detail.name === 0) {
        // 选择时间点
        todoValue.datetimerange=''
      }else if(event.detail.name === 1) {
        // 选择范围时间
        todoValue.currentDate=`${hours}:${minutes}`
      }
    };

    // 模拟数据
    const allTodoList = reactive([
      {id: 0, title: '吃饭', isFinish: true, sort: '生活',subTodo: [{id: 0, title: '子任务1',isFinish: false},{id: 1, title: '子任务1',isFinish: true}],uid: 0},
      {id: 1, title: '睡觉', isFinish: false, sort: '生活',uid: 0},
      {id: 2, title: '上课', isFinish: false, sort: '学习',subTodo: [{id: 0, title: '子任务1',isFinish: false},{id: 1, title: '子任务1',isFinish: false},{id: 2, title: '子任务1',isFinish: false}],uid: 0},
      {id: 3, title: '写作业', isFinish: false, sort: '学习',subTodo: [{id: 0, title: '子任务1',isFinish: false}],uid: 0},
    ])
    const sortTodList = reactive([
      {id: 0, title: '吃饭1', isFinish: false, sort: '生活',subTodo: [{id: 0, title: '子任务1',isFinish: false},{id: 1, title: '子任务1',isFinish: false}],uid: 0},
      {id: 1, title: '睡觉1', isFinish: false, sort: '生活',subTodo: [{id: 0, title: '子任务1',isFinish: false}],uid: 0},
      {id: 2, title: '上课1', isFinish: false, sort: '学习',subTodo: [{id: 0, title: '子任务1',isFinish: false},{id: 1, title: '子任务1',isFinish: false},{id: 2, title: '子任务1',isFinish: false}],uid: 0},
      {id: 3, title: '写作业1', isFinish: false, sort: '学习',subTodo: [{id: 0, title: '子任务1',isFinish: false}],uid: 0},
    ])
    const todoSort = ['生活', '学习', '工作'];
    
    const isInput = ref(false);
    const iptBottom = ref(0) // input 距离底部距离

    const getFocus = (e)=> {
      iptBottom.value = e.detail.height - 80;
    }
    const outFocus =(e)=> {
      iptBottom.value = 0
    }

    const isSheet = ref(false); // 动作面板
    const onAddBtn = ()=> {
      isInput.value = true;
      
    }

    // 动作面板
    const setTime = ()=> {
      isSheet.value = true
    }

    const submitTime = ()=> {
      console.log(todoValue);
    }
    const submitTodo = (e)=> {
      
      if(todoValue.title==='') {
        Notify({ type: 'warning', message: '请输入内容' });
      }
      console.log(todoValue);
    }

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
    /*1、通过用户id 查询所有当前用户的todolist*/
    
    /*2、查询当前用户所有的分类*/
    /*3、用当前用户的分类去查询当前用户的所有todolist*/

    /*
      操作
      1、页面初始化时用用户id 去请求所有属于这个用户的todolist
      2、todolist有分类，点击不同的分类显示当前用户不同分类下的todolist
    */
  },
  components: { Todolist, AddTodo, uniDatetimePicker }
}
</script>

<template>
  <div class="content">
  <van-notify id="van-notify" />
    <van-tabs 
      :active="active" 
      @click="onChange" 
      sticky 
      animated
      swipeable
      >
      <van-tab title="全部">
        <template #default>
          <div class="h">
            <todolist :dataList="allTodoList" />
          </div>
        </template>
      </van-tab>
      <van-tab :title="item" v-for="item in todoSort" :key="item">
        <template #default>
          <div class="h">
            <todolist :dataList="sortTodList" :sort="item" />
          </div>
        </template>
      </van-tab>
      <van-tab title="添加">添加</van-tab>
    </van-tabs>
    <!-- 添加按钮 -->
    <div class="add-btn" @click="onAddBtn">+</div>
    <!-- 动作面板 -->
    <van-action-sheet 
      :show="isSheet" 
      :close-on-click-overlay="true" 
      @click-overlay="isSheet=false"
      z-index="200"
      >
      <view class="select-items">
        <div class="time-btn">
          <span @click="isSheet=false">取消</span>
          <span @click="submitTime">确定</span>
        </div>
        <van-tabs :active="active2" @click="onChange2">
          <van-tab title="时间点">
            <template #default>
              <div class="t">
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
                  @change="updatatimerange"
                  @maskClick="todoValue.datetimerange=''"
                />
              </div>
            </template>
          </van-tab>
        </van-tabs>
      </view>
    </van-action-sheet>
    <!-- 输入框 -->
    <div v-if="isInput" class="add-input" :style="{bottom: iptBottom + 'px'}">
      <span class="submit-todo" style="background-color: red; height: 40px; width: 50px;" @tap="submitTodo($event)">feiji</span>
      <van-field 
        style="z-index: 20;" 
        type="text" 
        @focus="getFocus" 
        @blur="outFocus" 
        focus 
        :border="true" 
        :autosize="true" 
        :adjust-position="false" 
        v-model.trim="todoValue.title" 
        placeholder="把事情记录下来~"></van-field>
      <div class="add-set">
        <span class="set-item iconfont icon-shijian" style="color: #8a8a8a;" @click="setTime"></span>
        <span class="set-item iconfont icon-fenlei" style="color: #e98f36;"></span>
        <span class="set-item iconfont icon-gantanhao" style="color: #f95843;"></span>
      </div>
    </div>
    <van-overlay :show="isInput" @click="isInput=false" />
  </div>
</template>

<style lang="less">
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
  background-color: aliceblue;
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
    right: 20px;
    top: 10px;
  }
}
</style>
