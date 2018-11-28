<template>
  <div id="moreIdent">
      <!-- <header></header> -->
    <div class="notifity">
      <h1><span style="font-weight:bold">1</span>项认证已完成</h1>
      <p class="tip">认证有助于提升信用度快速通过审核</p>
    </div>
    <ul class="base-fun-wrap">
      <li>
        <i class="iconfont icon-shouji1" style="color:#8A8A8A"></i>
        <span>手机认证</span>
      </li>
      <nuxt-link tag="li" :to="{path:'/myself/moreIdent/identifyCheck',query:{UserID}}">
        <i class="iconfont icon-shenfenzheng1" style="color:#8A8A8A"></i>
        <span>身份认证</span>
      </nuxt-link>
      <nuxt-link tag="li" :to="{path:'/myself/contacts',query:{UserID}}">
        <i class="iconfont icon-tuandui" style="color:#8A8A8A"></i>
        <span>亲密联系人</span>
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
        UserID:query.UserID
    };
    return ayData;
  },
  methods: {},
  data() {
    return {
      active: 2
    };
  },
  head: {
    title: "更多认证"
  },
  components: {},
  mounted() {
    // storage.set("UserID", this.$route.query.UserID);
    // storage.set("userInfo", this.userinfo);
  }
};
</script>

<style lang='stylus' scoped>
.notifity
  width 100%
  height 158px
  color #ffffff
  background #0099FF
  font-size 18px
  position relative
  h1
    position absolute
    left 8px
    top 50%
    transform translate3d(0,-50%,0)
    span
      font-size 60px
  .tip
    position absolute
    bottom 10px
    left 8px
#moreIdent
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