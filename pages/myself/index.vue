<template>
  <div>
    <!-- <header></header> -->
    <div class="content">
      <div class="section1">
        <img :src="userinfo.WechatPic" alt="">
        <span>用户：{{userinfo.WechatName}}</span>
        <span style="margin-top:0;">{{userinfo.UserType | judgeLevel}}</span>
      </div>
      <div class="section2">
        <van-cell-group>
          <van-cell title="我要挂牌" is-link :to="{path:'/myself/woyaoguapai',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-shangjiazuhe van-cell__left-icon" style="color:#003366"></i>
            </template>
          </van-cell>
          <van-cell title="我的挂牌" is-link :to="{path:'/myself/wodeguapai',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-kucun van-cell__left-icon" style="color:#87C38F"></i>
            </template>
          </van-cell>
          <van-cell title="我要放款" is-link :to="{path:'/myself/wodefankuan',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-fukuanjine van-cell__left-icon" style="color:#3F81C1"></i>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell-group v-if="userinfo.UserType >= 1">
          <van-cell title="场地租赁" is-link :to="{path:'/myself/changdizupin',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-changdizulin van-cell__left-icon" style="color:#EEB173"></i>
            </template>
          </van-cell>
          <van-cell title="我要出库" is-link :to="{path:'/myself/woyaochuku',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-chuku van-cell__left-icon" style="color:#079BEF"></i>
            </template>
          </van-cell>
          <van-cell title="出库记录" is-link :to="{path:'/myself/chukujilu',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-jilu01 van-cell__left-icon" style="color:#0B988F"></i>
            </template>
          </van-cell>
          <van-cell title="我的库存" is-link :to="{path:'/myself/wodekucun',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-round_depot_fill van-cell__left-icon" style="color:#E98F36"></i>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell-group  v-if="userinfo.UserType>=2">
          <van-cell title="我要贷款" is-link :to="{path:'/myself/wodedaikuan',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-daikuan van-cell__left-icon" style="color:#87A7D6"></i>
            </template>
          </van-cell>
          <van-cell title="我要还款" is-link :to="{path:'/myself/wodehuankuan/huankuanjilu',query:{UserID:userinfo.UserID}}">
            <template slot="icon">
              <i class="iconfont icon-huankuankuai van-cell__left-icon" style="color:#E16531"></i>
            </template>
          </van-cell>
        </van-cell-group>
        <van-cell-group v-if="userinfo.UserType!=2">
          <van-cell title="会员等级申请" is-link :to="{path:'/myself/huiyuanshenji',query:{UserID:userinfo.UserID,level:userinfo.UserType}}">
            <template slot="icon">
              <i class="iconfont icon-huiyuan van-cell__left-icon" style="color:#E98F36"></i>
            </template>
          </van-cell>
        </van-cell-group>
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
import {getUserInfo} from "~/api/getData.js";
import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  async fetch(){

  },
  async asyncData({query,store}){
    let ayData ={};
    // console.log(store.state)
    await getUserInfo({
      Data:{
        UserID: query.UserID
      }
    })
      .then(res=>{
        // console.log(res.data)
        if (res.data.StatusCode == 200) {
          ayData.userinfo = res.data.Data
          
        }else if(res.data.StatusCode == 400){
          console.log('用户还未注册');
          console.log('getUserInfo',res.data.data)
        }
        return res
      })
    return ayData;
  },
  methods: {
  },
  data() {
    return {
      active:2
    };
  },
  head:{
    title:'个人中心'
  },
  components: {
  },
  mounted() {
    storage.set('UserID',this.$route.query.UserID);
    storage.set('userInfo',this.userinfo);
    
  }
};
</script>

<style lang='stylus' scoped>
.van-cell-group
  margin-top 9px
.van-cell__left-icon
  font-size 20px
.content
  background #f2f2f2
  padding-bottom 60px
  min-height 'calc(100vh - %s)' % 40px
.section1
  width 100%;
  height 150px
  background url('~/static/center-bg.png') no-repeat top center/cover;
  display flex
  flex-direction column
  align-items center
  justify-content center
  // margin-bottom 20px
  img 
    width 60px
    height 60px
    border-radius 50%
    background #fff
  span 
    font-size 16px
    margin-top 10px
    color #fff
.section2
  // height 'calc(100vh - %s)' % 200px
  // overflow auto



</style>