<template>
  <div id="moreIdent">
    <!-- <header></header> -->
    <div class="my-asset">
      <p>总资产（元）</p>
      <h1>20000</h1>
    </div>
    <ul class="base-fun-wrap">
      <nuxt-link tag="li" :to="{path:'/myself/asset/0',query:{UserID}}">
        <i class="iconfont icon-zhuanru" style="color:#8A8A8A"></i>
        <span>转入</span>
      </nuxt-link>
      <nuxt-link tag="li" :to="{path:'/myself/asset/1',query:{UserID}}">
        <i class="iconfont icon-zhuanchu" style="color:#8A8A8A"></i>
        <span>转出</span>
      </nuxt-link>
      <nuxt-link tag="li" :to="{path:'/myself/asset/2',query:{UserID}}">
        <i class="iconfont icon-zhangdan" style="color:#8A8A8A"></i>
        <span>账单</span>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
import { getUserInfo } from "~/api/getData.js";
import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  async fetch() {},
  async asyncData({ query, store }) {
    let ayData = {
      UserID: query.UserID
    };
    return ayData;
  },
  methods: {},
  data() {
    return {
      //   active: 2
    };
  },
  head: {
    title: "我的资产"
  },
  components: {},
  mounted() {
    // storage.set("UserID", this.$route.query.UserID);
    // storage.set("userInfo", this.userinfo);
  }
};
</script>

<style lang='stylus' scoped>
.my-asset
  width 365px
  height 55px
  background #fff
  font-size 12px
  color #868686
  border-radius 2.5px
  box-box-shadow 2.5px 2.5px 2.5px #C9C9C9
  margin 13px auto
  padding 5px 10px
  display flex
  flex-direction column
  justify-content space-between
  h1
    font-family 'Arial'
    color #000
    font-size 20px
#moreIdent
  overflow hidden
  background #EEEDF2
  min-height 100vh
.base-fun-wrap
  display flex
  background #f2f2f2
  width 100%
  justify-content space-between
  border-bottom 1.2px solid #BCBCBC
  li
    width 124px
    height 85px
    background #fff
    display flex
    flex-direction column
    align-items center
    justify-content center
    .iconfont
      font-size 40px
    span
      margin-top 8px
      font-size 12px
      color #868686
</style>