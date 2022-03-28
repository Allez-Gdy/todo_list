<script>
import UserTop from "./components/userTop.vue"
export default {
  setup() {

  },
  components: { UserTop }
}
</script>
<template>
  <div class="user-info">
    <div class="user-top">
      <div class="avatar"><img src="" alt=""></div>
      <div class="user-name">
        <span style="font-size: 20px;">Single</span>
        <span style="font-size: 15px;">用一句话介绍自己~</span>
      </div>
    </div>
    <ul class="user-fun-list">
      <li class="fun-item">
        <span class="user-icon iconfont icon-mianxingshuazifenshua"></span>
        <span class="fun-title">外观</span>
        <span class="r user-icon iconfont icon-xuanzeqizhankai"></span>
      </li>
      <li class="fun-item">
        <span class="user-icon iconfont icon-shezhi"></span>
        <span class="fun-title">更多设置</span>
        <span class="r user-icon iconfont icon-xuanzeqizhankai"></span>
      </li>
      <li class="fun-item">
        <span class="user-icon iconfont icon-shuomingshu"></span>
        <span class="fun-title">新手指南</span>
        <span class="r user-icon iconfont icon-xuanzeqizhankai"></span>
      </li>
      <li class="fun-item">
        <span class="user-icon iconfont icon-guanyu"></span>
        <span class="fun-title">关于</span>
        <span class="r user-icon iconfont icon-xuanzeqizhankai"></span>
      </li>
    </ul>
    <div class="logout">退出登录</div>
  </div>
</template>
<style lang="less">
  .r {
    transform: rotate(-90deg);
  }
  .user-top {
    display: flex;
    padding: 0 25px;
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
      background-color: antiquewhite;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-name {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .user-fun-list {
    background-color: #fff;
    margin: 20px;
    border-radius: 10px;
    padding: 0 15px;
    .fun-item {
      display: flex;
      height: 60px;
      line-height: 60px;
      color: rgb(65, 65, 65);
      border-bottom: 1px solid rgba(0, 0, 0, .05);
      .fun-title {
        flex: 1;
        margin: 0 17px;
      }
    }
  }
  .logout {
    text-align: center;
    padding: 20px;
    background-color: #fff;
    margin: 0 20px;
    color: red;
    border-radius: 10px;
  }
</style>
