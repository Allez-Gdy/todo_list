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


    /*1、通过用户id 查询所有当前用户的todolist*/
    
    /*2、查询当前用户所有的分类*/
    /*3、用当前用户的分类去查询当前用户的所有todolist*/

    /*
      操作
      1、页面初始化时用用户id 去请求所有属于这个用户的todolist
      2、todolist有分类，点击不同的分类显示当前用户不同分类下的todolist
    */

    return {
        active,
        onChange,
        allTodoList,
        sortTodList,
        todoSort
    };
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
        <div class="h">
          <Todolist :dataList="allTodoList" />
        </div>
      </van-tab>
      <van-tab :title="item" v-for="item in todoSort" :key="item">
        <div class="h">
          <todolist :dataList="sortTodList" :sort="item" />
        </div>
      </van-tab>
      <van-tab title="添加">添加</van-tab>
    </van-tabs>
    
    <AddTodo></AddTodo>
  </div>
</template>

<style>
van-tabs {
  height: 100% !important;
}
.content {
  background-color: antiquewhite;
  height: 100vh;
  overflow-y: auto;
}
.h {
  height: 94vh;
  background-color: aliceblue;
}
</style>
