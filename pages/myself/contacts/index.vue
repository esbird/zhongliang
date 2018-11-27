<template>
  <div id="contacts">
      <ul class="contact-wrap">
          <li>
              <div class="port-left">
                  <h2>姓名</h2>
                  <p>关系:</p>
                  <h2>12123115415136</h2>
                  <img src="~/static/contact-bg.png" class="contact-bg" alt="">
                  <span class="status">审核中</span>
              </div>
              <!-- <div class="port-right">
                  <span style="text-align:center">
                      修改<br>
                      联系人
                  </span>
              </div> -->
          </li>
      </ul>
      <van-popup v-model="show" class="contact-edit">
          <ul>
            <li>
                <i class="iconfont icon-lianxiren" slot="left-icon"></i>
                <input type="text">
            </li>
            <li>
                <i class="iconfont icon-shouji" slot="left-icon"></i>
                <input type="text">
            </li>
            <li>
                <i class="iconfont icon-guanxi" slot="left-icon"></i>
                <input type="text">
            </li>
            <button></button>
            
        </ul>
      </van-popup>
      <van-button size="large" class="add">修改联系人</van-button>
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
  methods: {
  },
  data() {
    return {
        show:true,
        value:''
    };
  },
  head: {
    title: "联系人"
  },
  components: {},
  mounted() {
    // storage.set("UserID", this.$route.query.UserID);
    // storage.set("userInfo", this.userinfo);
  }
};
</script>

<style lang='stylus' src="~/assets/styl/contact-edit.styl" scoped>
</style>