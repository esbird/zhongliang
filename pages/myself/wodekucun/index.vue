<template>
  <div>
    <header>我的库存</header>
    <div class="content">
      <ul>
        <li v-for="(item,index) in stateList" :key="index">
          <div class="port-top">
            <img v-lazy="item.WebSite" alt="">
            <div class="text">
              <h2>{{item.GoodsName}}</h2>
              <p class="weight">重量：{{item.FNumber}}{{item.FUnit}}</p>
              <p class="price">￥<span>{{item.Price}}</span></p>
            </div>
          </div>
          <!-- <div class="port-bottom">
            <van-button size="large" style="border-radius:0;border:none" @click="goEdit">编辑</van-button>
            <van-button size="large" style="color:red;border-radius:0;border-width:0 0 0 1px">删除</van-button>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getZuLin} from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  methods: {
  },
  data() {
    return {
    };
  },
  head:{
    title:'中良科技'
  },
  components: {
  },
  async asyncData({query}) {
    let ayData={};
    // 已入库
    await getZuLin({ Data: { UserID: query.UserID,IsChecked:1,IsPay:1} }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.stateList = res.data.Data;
      }
    });
    return ayData;
  }
};
</script>

<style lang='stylus' scoped>
.content
  background #f2f2f2
  padding 20px 12px
  min-height 'calc(100vh - %s)' % 40px
  ul
    li
      border-radius: 7.5px
      overflow hidden
      margin-bottom 10px
      .port-top
        width: 100%
        height 100px
        background #fff
        display: flex
        align-items: center
        padding 7.5px
        img 
          width: 85px
          height 85px
          background fff
          // margin-left: 7.5px
        .text
          display flex
          flex-direction: column
          margin-left: 9px
          height 100%
          h2
            font-size: 16px
          .weight
            font-size: 12px
            margin-top: 28px
            color: #949494
          .price
            font-size: 10px
            color: #003366
            margin-top: 3px
            span 
              font-size: 18px
      .port-bottom
        display flex
        border-top:1.2px solid #eee

  
</style>