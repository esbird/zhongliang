<template>
  <div>
    <!-- <header></header> -->
    <div class="content">
      <div class="section1">
        <div class="userinfo">
          <div class="port-top">
            <img :src="userinfo.WechatPic" class="head" alt="">
            <div class="info-text">
              <p class="name">用户：{{userinfo.WechatName}}</p>
              <p class="tag">
                <!-- <i class="iconfont icon-shenfenzheng"></i> -->
                <img v-if="userinfo.Listguanxi && userinfo.Listguanxi[0].IsChecked" src="~static/creditCard.png" class="icon" alt="">
                <img v-if="userinfo.UserPhone" src="~static/photoCheck.png" class="icon" alt="">
                <img v-if="userinfo.IdCardChecked" src="~static/identifity.png" class="icon" alt="">
                <!-- <i class="iconfont icon-contacts"></i> -->
                <nuxt-link tag="span" :to="{path:'/myself/moreIdent',query:{UserID:userinfo.UserID}}">更多认证</nuxt-link>
                <van-icon name="arrow" />
              </p>
            </div>
          </div>
          <div class="port-bottom">
            <div class="asset">
              <p>总资产(元)</p>
              <p class="count">{{userinfo.UserMoney}}</p>
            </div>
            <nuxt-link tag="span" :to="{path:'/myself/asset',query:{UserID:userinfo.UserID}}" style="display:flex;align-items:center"><i class="iconfont icon-yinxingqia"></i><van-icon name="arrow" /></nuxt-link>
          </div>
        </div>
      </div>
      <div class="section2">
        <!-- 贷款用户 -->
        <van-cell-group  v-if="userinfo.UserType==3">
          <van-cell title="贷款" is-link :to="{path:'/myself/daikuan',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-daikuan van-cell__left-icon" style="color:#87A7D6"></i>
            </template>
          </van-cell>
          <van-cell title="还款" is-link :to="{path:'/myself/wodehuankuan/huankuanjilu',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-huankuankuai van-cell__left-icon" style="color:#E16531"></i>
            </template>
          </van-cell>
        </van-cell-group>
        <!-- 出借用户 -->
        <van-cell-group  v-if="userinfo.UserType==2">
          <van-cell title="放款" is-link :to="{path:'/myself/wodefankuan',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-fukuanjine van-cell__left-icon" style="color:#3F81C1"></i>
            </template>
          </van-cell>
          <van-cell title="收款" is-link :to="{path:'/myself/shoukuan',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-huankuankuai van-cell__left-icon" style="color:#E16531"></i>
            </template>
          </van-cell>
        </van-cell-group>
        <!-- 仓储用户 -->
        <van-cell-group  v-if="userinfo.UserType>=1">
          <van-cell title="库管信息" is-link :to="{path:'/myself/kucun',query:{UserID:userinfo.UserID}}" class="factory">
          </van-cell>
          <!-- <van-cell is-link :to="{path:'/myself/wodefankuan',query:{UserID:userinfo.UserID}}" class="factory-wrap">
            <template slot="title">
              <p style="font-weight:500">场地编号</p>
              <p class="time">开始时间:</p>
              <p class="time">结束时间:</p>
            </template>
            <span style="color:#003366">剩余360天</span>
          </van-cell> -->
        </van-cell-group>
        <ul class="base-fun-wrap">
          <nuxt-link tag="li" :to="{path:'/myself/wodeguapai',query:{UserID:userinfo.UserID}}">
            <i class="iconfont icon-guapai-copy" style="color:#17ABE3"></i>
            <span>挂牌</span>
          </nuxt-link>
          <li @click="call">
            <i class="iconfont icon-kefu" style="color:#1AABA8"></i>
            <span>联系客服</span>
          </li>
          <li></li>
        </ul>

      </div>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home" :to="{path:'/home',query:{UserID:$route.query.UserID}}">首页</van-tabbar-item>
      <van-tabbar-item icon="home" :to="{path:'/sort',query:{UserID:$route.query.UserID}}">
        分类
        <i class="iconfont icon-chanpin" slot="icon" style="font-size:0.52rem"></i>
      </van-tabbar-item>
      <van-tabbar-item icon="contact" :to="{path:'/myself',query:{UserID:$route.query.UserID}}">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import { Tel } from "~/config/env.js";
import { getUserInfo,getSortList } from "~/api/getData.js";
import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  async fetch() {},
  async asyncData({ query, store ,redirect}) {
    let ayData = {};
    await getSortList({
      Data:{
        ItemParentID:55
      }
    })
      .then(res=>{
        if (res.data.StatusCode==200) {
          ayData.tel = res.data.Data[0].remark
        }else{
          console.log(res.data.Data)
        }
      })
    // console.log(store.state)
    await getUserInfo({
      Data: {
        UserID: query.UserID
      }
    }).then(res => {
      // console.log(res.data)
        // console.log("getUserInfo", res.data);
      if (res.data.StatusCode == 200) {
        ayData.userinfo = res.data.Data;
      } else if (res.data.StatusCode == 400) {
        // redirect({path:'/'})
        console.error("getUserInfo", res.data.Data);
        // console.log("用户还未注册");
      }
      return res;
    });
    return ayData;
  },
  methods: {
    call(){
      this.$dialog
          .confirm({
            title: "提醒",
            message: `还利息请联系客服！${this.tel}`
          })
          .then(() => {
            //点击回调
            location.href=`tel:${this.tel}`
          })
          .catch(()=>{

          })

    },
  },
  data() {
    return {
      active: 2
    };
  },
  head: {
    title: "个人中心"
  },
  components: {},
  mounted() {
    storage.set("UserID", this.$route.query.UserID);
    storage.set("userInfo", JSON.stringify(this.userinfo));
  }
};
</script>

<style lang='stylus' scoped src="~/assets/styl/myself.styl"></style>