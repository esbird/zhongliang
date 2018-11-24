<template>
  <div>
    <header>我要出库</header>
    <div class="content">
      <ul>
      <van-radio-group v-model="radio">
        <!-- <van-radio name="2"></van-radio> -->
          <van-radio :name="index" v-for="(item,index) in stateList" :key="index" class="box" style="display: flex;align-items: center">
            <div class="port-top">
              <img v-lazy="item.WebSite" alt="">
              <div class="text">
                <h2>{{item.FName}}</h2>
                <p class="weight">数量：{{item.FNumber}}{{item.FUnit}}</p>
                <p class="price">￥<span>{{item.Price}}</span></p>
              </div>
            </div>
          </van-radio>
      </van-radio-group>
      </ul>
    </div>
      <van-button size="large" style="" class="submit" @click="submit">申请出库</van-button>

  </div>
</template>

<script>
import {getZuLin} from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  methods: {
    submit(){
      this.$router.push({path:'/myself/woyaochuku/shenqinchuku',query:{UserGoodsID:this.stateList[this.radio].UserGoodsID}})
    },
  },
  data() {
    return {
      radio:0
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
    await getZuLin({ Data: { UserID: query.UserID, IsPay: 1 } }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.stateList = res.data.Data;
      }
    });
    return ayData;
  }
};
</script>

<style lang='stylus' scoped>
.submit
  color #fff;
  background #003366
  font-weight bold
  position fixed
  bottom 0;
  left 0;
.content
  background #f2f2f2
  padding 20px 12px
  min-height 'calc(100vh - %s)' % 80px
  ul
    .box.van-radio
      border-radius: 7.5px
      margin-bottom 10px
      overflow hidden
      background #fff
      padding-left 9px
      .van-icon-checked
        color #003366
      .van-radio__label
        flex:1
      .port-top
        width: 100%
        height 100px
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