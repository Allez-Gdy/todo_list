<script>
export default {
  
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
@import "./assets/style/global.css";
@import "./wxcomponents/vant/dist/common/index.wxss";
page {
  background-color: #f5f5ff;
}
</style>
