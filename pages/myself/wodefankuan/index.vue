<template>
  <div>
    <header>我要放款</header>
    <div class="content">
      <van-tabs v-model="active">
        <van-tab title="我的放款">
          <ul class="fang-wrap">
            <li v-for="(item,index) in passList" :key="index">
              <p class="time">放款时间：{{item.FDay}}天</p>
              <p class="person">放款人：{{item.FName}}</p>
              <p class="fang">放款金额：{{item.FMoney}}</p>
              <div class="prevMoney">
                <p>预计收益金额</p>
                <p class="money">￥<span>{{item.FMoney*1.05}}</span></p>
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="审核中">
          <ul class="fang-wrap">
            <li v-for="(item,index) in applingList" :key="index">
              <p class="time">放款时间：{{item.FDay}}天</p>
              <p class="person">放款人：{{item.FName}}</p>
              <p class="fang">放款金额：{{item.FMoney}}</p>
              <div class="prevMoney">
                <p>预计收益金额</p>
                <p class="money">￥<span>{{item.FMoney*1.05}}</span></p>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
      <van-button size="large" style="" class="submit" @click="goEdit">申请放款</van-button>

    </div>
  </div>
</template>

<script>
import {getFangkuan} from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  methods: {
    goEdit(){
      this.$router.push({path:'/myself/wodefankuan/shenqingfankuan',query:{UserID:this.$route.query.UserID}})
    }
  },
  data() {
    return {
      active:1
    };
  },
  head:{
    title:'中良科技'
  },
  components: {
  },
  async asyncData({query}) {
    let ayData={};
    // 审核中
    await getFangkuan({Data:{UserID:query.UserID,IsChecked:0}}).then(res=>{if(res.data.StatusCode==200){ayData.applingList = res.data.Data}});
    // 审核通过
    await getFangkuan({Data:{UserID:query.UserID,IsChecked:1}}).then(res=>{if(res.data.StatusCode==200){ayData.passList = res.data.Data}});
    return ayData
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
.fang-wrap
  min-height 'calc(100vh - %s)' % 84px
  padding 11px 0 0
  li
    position relative
    font-size 12px
    padding 11px
    display flex
    flex-direction column
    justify-content space-between
    width 350px
    height 80px
    border-radius 7.5px
    background #fff
    margin 0 auto
    &~li
      margin-top 10px
    .person
      color #AEAEC8
    .prevMoney
      position absolute
      right 10px
      bottom 10px
      font-size 9px
      color #AEAEC8
      p
        text-align right
      .money
        color #005AB4
        span 
          font-size 18px

  
</style>