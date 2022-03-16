<template>
  <view class="content">
    <van-tabs 
      active="active" 
      @click="onChange" 
      sticky 
      animated
      swipeable
      >
      <van-tab title="标签 1">
        <div class="h">1</div>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 4</van-tab>
      <van-tab title="标签 6">添加</van-tab>
    </van-tabs>
    

  </view>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const active = ref(1);
    const goLogin = function() {
      uni.navigateTo({
        url: "/pages/login/login",
      })
    }
    const onChange = function(event) {
      console.log(event.detail);
      // uni.showToast({
      //   title: `标签 ${event.detail.name} `,
      //   icon: 'none',
      // });
    }
    const aa = function() {
      console.log('aaa');
    }
    return {
      goLogin,
      active,
      onChange,
      aa
    }
  }
}
</script>

<style>
van-tabs {
  height: 100% !important;
}
.content {
  height: 500px;
}
.h {
  height: 500px;
}
</style>
