<template>
  <div id="moreIdent">
    <!-- <header></header> -->
    <van-cell-group v-for="(item,index) in zuLingList" :key="index" >
      <van-cell class="factory-wrap">
        <template slot="title">
          <p style="font-weight:500">场地编号:{{item.FOrderNumber}}</p>
          <p
            class="time"
          >开始时间:&nbsp;&nbsp;{{parseInt(item.FOrderNumber) | dateFormat('YYYY-MM-DD')}}</p>
          <p
            class="time"
          >结束时间:&nbsp;&nbsp;{{item.FOrderNumber | endTime(item.FDays) | dateFormat('YYYY-MM-DD')}}</p>
        </template>
        <span style="color:#003366">剩余{{item.FOrderNumber | leftDays(item.FDays)}}天</span>
      </van-cell>
      <div class="btn-wrap">
        <nuxt-link tag="button" :to="{path:'/myself/kucun/kucunDetail',query:{UserID,UserGoodsID:item.UserGoodsID}}">查看详情</nuxt-link>
        <nuxt-link
          tag="button"
          :to="{path:'/myself/daikuan/shenqingdaikuan',query:{UserID,UserGoodsID:item.UserGoodsID}}"
          style="background:#fff;color:#000"
        >抵押贷款</nuxt-link>
      </div>
    </van-cell-group>
    <ul class="base-fun-wrap">
      <nuxt-link tag="li" :to="{path:'/myself/kucun/putIn',query:{UserID}}">
        <i class="iconfont icon-zhuanru" style="color:#8A8A8A"></i>
        <span>新增入库</span>
      </nuxt-link>
      <!-- <nuxt-link tag="li" :to="{path:'/myself/asset/1',query:{UserID}}">
        <i class="iconfont icon-zhuanchu" style="color:#8A8A8A"></i>
        <span>出库</span>
      </nuxt-link>-->
      <nuxt-link tag="li" :to="{path:'/myself/kucun/record',query:{UserID}}">
        <i class="iconfont icon-zhangdan" style="color:#8A8A8A"></i>
        <span>记录</span>
      </nuxt-link>
      <li></li>
    </ul>
  </div>
</template>

<script>
import { getUserInfo, getZuLin } from "~/api/getData.js";
import dayjs from "dayjs";
import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  async fetch() {},
  filters: {
    
  },
  async asyncData({ query, store }) {
    let ayData = {
      UserID: query.UserID
    };
    await getZuLin({
      Data: {
        UserID: query.UserID,
        IsChecked: 1,
        IsPay: 1
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.zuLingList = res.data.Data;
      } else {
        console.log("getZuLin", res.data.Data);
      }
    });

    return ayData;
  },
  methods: {},
  data() {
    return {
      //   active: 2
    };
  },
  head: {
    title: "我的库存"
  },
  components: {},
  mounted() {}
};
</script>

<style lang='stylus' scoped>
.btn-wrap
  border-top 1px solid #838482
  button
    width 50%
    height 40px
    font-size 14px
    color #fff
    background #003366
    border none
    &:active
      opacity 0.6
.factory-wrap
  display flex
  align-items center
  p
    line-height 1.5
    &.time
      font-size 10px
      color #6B6B6B
#moreIdent
  overflow hidden
  background #EEEDF2
  min-height 100vh
  // padding-top 15px
  .van-cell-group
    margin-top 15px
.base-fun-wrap
  display flex
  background #f2f2f2
  width 100%
  justify-content space-between
  border-bottom 1.2px solid #BCBCBC
  margin-top 15px
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