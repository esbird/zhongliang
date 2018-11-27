<template>
  <div id="moreIdent">
      <!-- <header></header> -->
    <ul class="base-fun-wrap">
      <nuxt-link tag="li" :to="{path:'/myself/moreIdent/identifyCheck',query:{UserID}}">
        <i class="iconfont icon-shenfenzheng1" style="color:#8A8A8A"></i>
        <span>身份认证</span>
      </nuxt-link>
      <nuxt-link tag="li" :to="{path:'/myself/contacts',query:{UserID}}">
        <i class="iconfont icon-tuandui" style="color:#8A8A8A"></i>
        <span>亲密联系人</span>
      </nuxt-link>
      <li></li>
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