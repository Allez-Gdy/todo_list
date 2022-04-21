<script>
import { reactive, ref, watch } from 'vue'
import api from '../../../api/index'
export default {
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    },
    sort: {
      type: Object,
      default() {
        return {
          id: -1
        }
      }
    },
    checked: {
      type: Boolean,
      default: ()=> false
    }
  },
	setup(props,context) {
    const filterTodos = ref([]);
    let iszhuan = ref(true)
    const setList = ()=> {
      props.dataList.map(item=> {
        if(props.sort.id === -1) {
          filterTodos.value.push(item)
        }
        if(item.sort == props.sort.id) {
          filterTodos.value.push(item)
        }
      })
      // console.log(filterTodos.value);
    }
    setList()
    watch(()=> props.dataList,()=> {
      filterTodos.value = []
      setList()
    },{
      deep: true,
      immediate: true
    })
    const itemMore = (id)=> {
      isOpen.value[id] = !isOpen.value[id]
    }
    const isOpen = ref([]);
    for(let i = 0;i < props.dataList.length;i++) {
      isOpen.value[i] = false;
    }
    const setItem = (item)=> {
      context.emit('setItem',item)
    }
    const updataTodoStatus = (todoId, isFinish)=> {
      context.emit('updataTodoStatus',todoId, isFinish)
    }
    const updataSubTodoStatus = (subTodoId, isFinish)=> {
      // console.log(subTodoId, +isFinish);
      api.updataSubTodoStatus({subTodoId: subTodoId, isFinish: +isFinish}).then(res=> {
        context.emit('updateSubTodoStatus')
      })
    }
    return {
      itemMore,
      isOpen,
      filterTodos,
      iszhuan,
      setItem,
      updataTodoStatus,
      updataSubTodoStatus
    }
  }
}
</script>

<template>
<div class="list">
	<ul class="todo-list" v-if="filterTodos.length > 0">
    <li v-for="item in filterTodos" :key="item.id">
      <div class="flex todo-item" v-if="item.isFinish == false || checked == false">
        <div class="todo-btn" @click="updataTodoStatus(item.id, !item.isFinish)" v-if="item.isFinish"><span class="iconfont icon-zhengque-correct"></span></div>
        <div class="todo-btn" @click="updataTodoStatus(item.id, !item.isFinish)" v-else><span class="iconfont icon-big-circle"></span></div>
        <div class="todo-content"  :class="{'finish': item.isFinish==1}" @click="setItem(item)">
          <span class="todo-title">{{item.title}}</span>
          <span v-if="item.import == 0" class="import">
            <span style="color: #f25042;margin-right: 7px;">紧急且重要</span>
            <span >{{item.oneDay}}</span>
            <span >{{item.currentDate}}</span>
            <span >{{item.datetimerange}}</span>
          </span>
          <span v-if="item.import == 1" class="import">
            <span style="color: #ff8906;margin-right: 7px;">重要不紧急</span>
            <span >{{item.oneDay}}</span>
            <span >{{item.currentDate}}</span>
            <span >{{item.datetimerange}}</span>
          </span>
          <span v-if="item.import == 2" class="import">
            <span style="color: #2cb67d;margin-right: 7px;">不重要紧急</span>
            <span >{{item.oneDay}}</span>
            <span >{{item.currentDate}}</span>
            <span >{{item.datetimerange}}</span>
          </span>
          <span v-if="item.import == 3" class="import">
            <span style="color: #7f5af0;margin-right: 7px;">不重要不紧急</span>
            <span >{{item.oneDay}}</span>
            <span >{{item.currentDate}}</span>
            <span >{{item.datetimerange}}</span>
          </span>
        </div>
        <div class="item-more" v-if="item.subTodoList.length !== 0" @click.stop="itemMore(item.id)">
          <span 
            class="iconfont icon-xuanzeqizhankai" 
            :class="{'open': iszhuan && isOpen[item.id],'close': !iszhuan || !isOpen[item.id]}"
          ></span>
        </div>
      </div>
      <ul class="sub-list" v-if="item.subTodoList && isOpen[item.id]">
        <li class="sub-list-item flex" v-for="subitem in item.subTodoList" :key="subitem.id">
          <span @click="updataSubTodoStatus(subitem.id, !subitem.isFinish)" v-if="subitem.isFinish" class="sub-btn iconfont icon-zhengque-correct"></span>
          <span @click="updataSubTodoStatus(subitem.id, !subitem.isFinish)" v-else class="sub-btn iconfont icon-big-circle"></span>
          <div class="sub-title">{{subitem.title}}</div>
        </li>
      </ul>
    </li>
    <li style="height: 200rpx"></li>
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
    color: #666;
  }
  .close {
    display: inline-block;
    transform: rotate(0deg);
    transition: all .5s;
  }
  .open {
    display: inline-block;
    transform: rotate(-180deg);
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
  /*.todo-item:last-child {
    margin-bottom: 50rpx;
  }*/
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