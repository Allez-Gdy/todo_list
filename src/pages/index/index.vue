<script>
import { reactive, ref } from 'vue'
import Todolist from './components/todolist.vue';
import AddTodo from '../../components/addTodo.vue';
export default {
  setup() {
    const active = ref(0); // tag 索引
    const onChange = function (event) {
      
    };

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
    const iptBottom = ref(0)
    const getFocus = (e)=> {
      iptBottom.value = e.detail.height - 80;
    }
    const outFocus =(e)=> {
      iptBottom.value = 0
    }
    const todoValue = ref('');
    const isSheet = ref(true)
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
    /*1、通过用户id 查询所有当前用户的todolist*/
    
    /*2、查询当前用户所有的分类*/
    /*3、用当前用户的分类去查询当前用户的所有todolist*/

    /*
      操作
      1、页面初始化时用用户id 去请求所有属于这个用户的todolist
      2、todolist有分类，点击不同的分类显示当前用户不同分类下的todolist
    */
  },
  components: { Todolist, AddTodo }
}
</script>

<template>
  <div class="content">
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
    
    <div class="add-btn" @click="isInput = true">add</div>

    <van-action-sheet 
      :show="isSheet" 
      :close-on-click-overlay="true" 
      @click-overlay="isSheet=false"
   
      >
      <view class="select-items">
        <div class="time-btn">
          <span>取消</span>
          <span>确定</span>
          
        </div>
      </view>
    </van-action-sheet>

    <van-overlay :show="isInput" @click="isInput=false" />
    <div v-if="isInput" class="add-input" :style="{bottom: iptBottom + 'px'}">
    <!-- :focus="isInput" @focus="getFocus" @blur="outFocus" adjust-position='{{false}}' -->
      <van-field type="text" @focus="getFocus" @blur="outFocus" focus :border="true" :autosize="true" :adjust-position="false" v-model.trim="todoValue" placeholder="把事情记录下来~"></van-field>
      <div class="add-set">
        <span class="set-item iconfont icon-shijian" style="color: #8a8a8a;"></span>
        <span class="set-item iconfont icon-fenlei" style="color: #e98f36;"></span>
        <span class="set-item iconfont icon-gantanhao" style="color: #f95843;"></span>
      </div>
    </div>
  </div>
</template>

<style lang="less">
van-tabs {
  height: 100% !important;
  
}
.content {
  background-color: antiquewhite;
  height: 100vh;
  overflow-y: auto;
  position: relative;
}
.h {
  height: 93vh;
  background-color: aliceblue;
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
  position: absolute;
  right: 30px;
  bottom: 120px;
  width: 50px;
  height: 50px;
  background-color: #ccc;
}
.add-input {
  z-index: 100;
  position: absolute;
  bottom: 0;
  height: 80px;
  width: 100%;
  /*input {
    height: 45px;
    line-height: 45px;
    background-color: #ccc;
    width: 100%;
    padding: 5px 20px;
    box-sizing: border-box;
  }*/
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
}
</style>
