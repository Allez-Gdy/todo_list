<script>
import { reactive, ref } from 'vue'
export default {
  props: {
    dataList: Object,
    sort: {
      type: String,
      default: '全部'
    }
  },
	setup(props) {
    const filterTodos = ref([]);
    let iszhuan = ref(true)
    props.dataList.map(item=> {
      if(props.sort === '全部') {
        filterTodos.value.push(item)
      }
      if(item.sort === props.sort) {
        filterTodos.value.push(item)
      }
    })

    const itemMore = (id)=> {
      isOpen.value[id] = !isOpen.value[id]
    }
    const isOpen = ref([]);
    for(let i = 0;i < props.dataList.length;i++) {
      isOpen.value[i] = false;
    }

    return {
      itemMore,
      isOpen,
      filterTodos,
      iszhuan
    }
  }
}
</script>

<template>
<div class="list">
	<ul class="todo-list" v-if="filterTodos.length!=0">
    <li class="todo-item" v-for="item in filterTodos" :key="item.id">
      <div class="flex">
        <div class="todo-btn" v-if="item.isFinish"><span class="iconfont icon-zhengque-correct"></span></div>
        <div class="todo-btn" v-else><span class="iconfont icon-big-circle"></span></div>
        <div class="todo-content">
          <span class="todo-title" :class="{'finish': item.isFinish}">{{item.title}}</span>
          <span class="import"><span>日程：</span><span>紧急且重要</span></span>
        </div>
        <div class="item-more" v-if="item.subTodo" @click="itemMore(item.id)">
          <span 
            class="iconfont icon-xuanzeqizhankai" 
            :class="{'open': iszhuan && isOpen[item.id],'close': !iszhuan || !isOpen[item.id]}"
          ></span>
        </div>
      </div>
      <ul class="sub-list" v-if="item.subTodo && isOpen[item.id]">
        <li class="sub-list-item flex" v-for="subitem in item.subTodo" :key="subitem.id">
          <span v-if="subitem.isFinish" class="sub-btn iconfont icon-zhengque-correct"></span>
          <span v-else class="sub-btn iconfont icon-big-circle"></span>
          <div class="sub-title">{{subitem.title}}</div>
        </li>
      </ul>
    </li>
    <li style="height: 100rpx"></li>
	</ul>
  <van-empty v-else description="当前暂无内容" />
</div>
</template>

<style lang="less">
  .flex {
    display: flex;
  }
  .finish {
    text-decoration: line-through;
    font-style: italic;
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
  .todo-item {
    min-height: 100rpx;
    margin-bottom: 10rpx;
    .todo-btn, .item-more {
      width: 100rpx;
      text-align: center;
      line-height: 100rpx;
    }
    .todo-btn {
      color: rgb(68, 68, 246);
    }
    .sub-btn {
      color: rgb(135, 135, 255);
    }
    .todo-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid rgba(0, 0, 0, .05);
      .todo-title {
        
      }
      .import {
        font-size: 12px;
        color: rgb(144, 144, 144);
      }
    }
  }
  .todo-item:last-child {
    margin-bottom: 50rpx;
  }
  .sub-list {
    padding-left: 100rpx;
    .sub-list-item {
      height: 80rpx;
      align-items: center;
      .sub-btn {
        width: 70rpx;
        text-align: center;
      }
      .sub-title {
        height: 80rpx;
        line-height: 80rpx;
        width: 100%;
        border-bottom: 1px solid rgba(0, 0, 0, .05);
      }
    }
  }
</style>