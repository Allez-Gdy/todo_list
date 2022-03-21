<script>
export default {
  setup() {
    const show = ref(true)

    return {
      show
    }
  }
}
</script>
<template>
  <div class="add">
    +
  </div>
  
</template>
<style>
  .add {
    position: absolute;
    bottom: 100px;
    right: 30px;
    z-index: 100;
    border: 1px solid red;
    width: 45px;
    height: 45px;
    line-height: 45px;
    border-radius: 50%;
    text-align: center;
  }
</style>