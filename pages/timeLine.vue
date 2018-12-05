<template>
  <div class="content">
    <header>状态流程</header>
    <van-steps direction="vertical" :active="0" active-color="#000" class="steps">
      <van-step>
        <p style="color:#003366">2016-07-12 12:40</p>
        <h3>审核通过</h3>
      </van-step>
      <van-step>
        <!-- <p style="color:#003366">2016-07-11 10:00</p> -->
        <h3>待付款</h3>
      </van-step>
      <van-step>
        <!-- <p style="color:#003366">2016-07-10 09:30</p> -->
        <h3>待收款</h3>
      </van-step>
    </van-steps>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  }
};
</script>
<style lang="stylus" scoped>
.content
  background #f2f2f2
  height 100vh
.steps
  margin-top 10px
</style>

