<template>
  <div>
    <header>登录</header>
    <div class="content" style>
      <div class="regs-wrap">
        <h2>登录</h2>
        <p>手机</p>
        <input
          type="text"
          v-model.number="postData.UserPhone"
          placeholder="请输入手机号"
          readonly
          @click="show=true"
        >

        <!-- <p>密码</p>
        <input type="password" placeholder="请输入密码">
        <p>确认密码</p>
        <input type="password" placeholder="请再次输入密码">-->
        <div class="checkCode-wrap">
          <div class="wrap">
            <p>验证码</p>
            <input type="text" v-model="postData.Code" placeholder="请输入验证码">
          </div>
          <button @click="getMsgCode" class="code" :disabled="disableSent">{{sendBtnMsg}}</button>
        </div>
        <div class="xieyi">
          <input type="checkbox" id="xieyi" v-model="agree">
          <label for="xieyi">用户协议</label>
        </div>
        <!-- <button  >注册</button> -->
        <van-button size="large" class="submit" :disabled="!(agree && postData.subscribe)" @click="submit">登录</van-button>
      </div>
    </div>
    <van-number-keyboard
      :show="show"
      theme="custom"
      extra-key
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { getSendMessage, getWxUserInfo, postLogin } from "~/api/getData.js";
import storage from "~/api/storage.js";
import axios from "axios";
let timer = "";
export default {
  methods: {
    async getMsgCode() {
      let partten = /^1[34578]\d{9}$/;
      if (partten.test(this.postData.UserPhone)) {
        let loading = this.$loading();
        await getSendMessage({
          Data: { UserPhone: this.postData.UserPhone }
        }).then(res => {
          loading.clear();
          if (res.data.StatusCode == 200) {
            this.disableSent = true;
            let count = 60;
            timer = setInterval(() => {
              count--;
              this.sendBtnMsg = count + "s";
              if (count == 0) {
                clearInterval(timer);
                this.sendBtnMsg = "重发验证码";
                this.disableSent = false;
              }
            }, 1000);
            this.$dialog
              .alert({
                title: "提醒",
                message: "发送成功"
              })
              .then(() => {
                //点击回调
              });
          }
        });
      } else {
        this.$dialog
          .alert({
            title: "提醒",
            message: "手机号不正确！"
          })
          .then(() => {
            //点击回调
          });
      }
    },
    onInput(value) {
      this.postData.UserPhone += value;
    },
    onDelete() {
      this.postData.UserPhone = this.postData.UserPhone.substr(
        0,
        this.postData.UserPhone.length - 1
      );
    },
    async submit() {
      if (!this.postData.UserPhone) {
        this.$dialog
          .alert({
            title: "提醒",
            message: "手机号不能为空"
          })
          .then(() => {
            //点击回调
          });
        return;
      }
      if (!this.postData.Code) {
        this.$dialog
          .alert({
            title: "提醒",
            message: "验证码不能为空"
          })
          .then(() => {
            //点击回调
          });
        return;
      }
      let loading = this.$loading();
      await postLogin({ Data: this.postData }).then(async res => {
        loading.clear();
        if (res.data.StatusCode == 200) {
          await storage.set("UserID", res.data.Data.UserID);
          this.$dialog
            .alert({
              title: "提醒",
              message: "登录成功"
            })
            .then(() => {
              //点击回调
              this.$router.replace({
                path: "/home",
                query: { UserID: res.data.Data.UserID }
              });
            });
        } else {
          this.$dialog
            .alert({
              title: "提醒",
              message: res.data.Data
            })
            .then(() => {
              //点击回调
            });
        }
      });
    }
  },
  mounted() {
    storage.set("openid", this.$route.query.openid);
    if (!this.postData.subscribe) {
      this.$alert('请先关注公众号');
    }
  },
  async asyncData({ query }) {
    let ayData = {
      postData: {
        UserPhone: "",
        Code: "",
        UserType: 0,
        OpenID: query.openid,
        WechatName: "",
        WechatPic: ""
      }
    };
    await getWxUserInfo({ Data: { openid: query.openid } }).then(res => {
      // console.log( typeof res.data.Data)

      if (res.data.StatusCode == 200) {
        let userInfo = JSON.parse(res.data.Data);
        // console.log('getWxUserInfo',userInfo);

        ayData.postData.WechatPic = userInfo.headimgurl;
        ayData.postData.WechatName = userInfo.nickname;
        // 判断是否关注
        ayData.postData.subscribe = userInfo.subscribe;
      }
    });
    return ayData;
  },
  data() {
    return {
      show: false,
      active: 0,
      agree: false,
      telRight: false,
      disableSent: false,
      sendBtnMsg: "获取验证码"
    };
  },
  components: {}
};
</script>

<style lang='stylus' scoped>
P = 37.5
.content
  // background #f2f2f2
  background url('~/static/register-bg.png') no-repeat top center / cover
  min-height 'calc(100vh - %s)' % (40 / P)rem
  overflow auto
  .regs-wrap
    width (350 / 37.5)rem
    padding (28 / 37.5)rem (25 / 37.5)rem (21 / 37.5)rem
    background rgba(255, 255, 255, 0.95)
    border-radius (7.5 / P)rem
    // margin:  auto
    position fixed
    left 50%
    top 50%
    transform translate3d(-50%, -50%, 0)
    h2
      font-size (24 / 37.5)rem
      font-weight bold
      text-align center
    p
      font-size 12px
      color #003366
      margin-top (17 / 37.5)rem
    input[type=text], input[type=number]
      font-size (16 / 37.5)rem
      border-width 0 0 (1 / 37.5)rem 0
      width 100%
      background transparent
      line-height (30 / 37.5)rem
      margin-top (10 / 37.5)rem
      border-color #000
      text-indent (5 / 37.5)rem
    .checkCode-wrap
      width 100%
      display flex
      justify-content space-between
      .wrap
        width (175 / 37.5)rem
      .code
        width (107 / 37.5)rem
        height (37 / 37.5)rem
        line-height (37 / 37.5)rem
        background #0066CC
        color #fff
        border-radius (7.5 / 37.5)rem
        align-self flex-end
        border none
        font-size (18 / 37.5)rem
    .submit
      width (300 / 37.5)rem
      height (42 / 37.5)rem
      border-radius (7.5 / 37.5)rem
      color #ffffff
      background #004198
      font-size (16 / 37.5)rem
      border none
      margin-top (10 / 37.5)rem
.xieyi
  display flex
  align-items center
  font-size (14 / 37.5)rem
  margin-top (10 / 37.5)rem
  label
    margin-left (10 / 37.5)rem
    color #A1A1A1
</style>