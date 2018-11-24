<template>
  <div>
    <header>贷款记录</header>
    <div class="content">
      <ul>
        <li v-for="(item,index) in stateList1" :key="index" @click="goDetail(item.FInterID,item.FMoney,item.lixi,item.EndDay)">
          <div><span>预留卡号:{{item.BankCard}}</span><p class="money">￥<span>{{item.FMoney}}</span></p></div>
          <div><span>贷款天数:{{item.FDays}}</span></div>
          <div><span class="last-count">预留号码:{{item.FPhone}}</span><span class="time">{{item.AddTime | dateFormat('YYYY-MM-DD HH:mm')}}</span> </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang='stylus' scoped>
.content
  min-height 'calc(100vh - %s)' % 40px
  background #F2F2F2
  padding 0 10px
  overflow auto
  li
    width 100%
    // height 60px
    padding 10px
    margin 10px auto 0
    border-radius 7.5px
    box-shadow 2px 2px 2px #ADADAD
    background #fff
    display flex
    flex-direction column
    justify-content space-between
    // padding 10px 0
    &:active
      opacity .6
    div
      display flex
      justify-content space-between
      font-size 12px
      .money
        color #003366
        font-size 11px
        span
          font-size 18px
      .time
        color #9494A6
</style>
<script>
import { getDaikuan } from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  methods: {
    goDetail(FInterID,FMoney,lixi,EndDay){
      this.$router.push({path:'/myself/wodehuankuan',query:{FInterID,FMoney,lixi,EndDay}})
    }
  },
  data() {
    return {
      active: 1
    };
  },
  head: {
    title: "中良科技"
  },
  components: {},
  async created() {},
  async asyncData({query}){
    let ayData={
      
    }
    // 通过审核
    await getDaikuan({Data:{UserID:query.UserID,IsChecked:1}}).then(res=>{if(res.data.StatusCode==200){ayData.stateList1 = res.data.Data}})
    return ayData
  }
};
</script>