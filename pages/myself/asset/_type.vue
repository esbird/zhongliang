<template>
  <div id="moreIdent">
    <!-- 转入 -->
    <div class="in">
      <p>转入金额</p>
      <h2>￥<input type="text" class="count" value="99"></h2>
      <button class="btn">提交审核</button>
    </div>
    <!-- 转出 -->
    <div class="out">
      <p>提现金额</p>
      <h2>￥<input type="text" class="count" ></h2>
      <p style="color:#868686">资金金额12412.00 <span style="color:#003366">全部体现</span></p>
      <button class="btn">提交审核</button>
    </div>
    <!-- 账单 --> 
    <ul class="record-wrap">
      <li>
        <div class="port-left">
          <p>用途</p>
          <p class="time">12-20 12:20</p>
        </div>
        <span class="count">审核中</span>
        <span class="count">-222200.00</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUserInfo ,getMoneyRecord,postUserMoney} from "~/api/getData.js";
import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  async asyncData({ query, store ,params}) {
    let ayData = {
      UserID: query.UserID
    };
    switch (params.type) {
      // 转入
      case 0:
        
        break;
    
      // 转出
      case 1:
        
        break;
    
      // 账单
      case 2:
        await getMoneyRecord({
          Data:{
            UserID:query.UserID
          }
        })
          .then(res=>{
            if (res.data.StatusCode==200) {
              ayData.recordList = res.data.Data;
            }else{
              console.error('getMoneyRecord',res.data.Data)
            }
          })
        break;
    
      default:
        break;
    }

    return ayData;
  },
  methods: {},
  data() {
    return {
    };
  },
  head: {
    title: "我的资产"
  },
};
</script>

<style lang='stylus' scoped>

#moreIdent
  overflow hidden
  background #EEEDF2
  min-height 100vh
  .record-wrap
    margin-top 16px
    li
      height 50px
      padding 10px
      display flex
      justify-content space-between
      align-items center
      background #fff
      border-bottom 1px solid #A1A1A1
      .port-left
        display flex
        flex-direction column
        height 100%
        justify-content space-between
        p
          font-size 12px
        .time 
          font-size 9px
      .count
        font-size 18px
        color #003366

  .btn
    width 315px
    height 37px
    font-size 16px
    background #003366
    color #fff
    border none 
    border-radius 5px
    margin 20px auto  0
    display block
  .in,.out
    width 355px
    // height 130px
    background #fff
    border-radius 5px
    margin 31px auto 0
    padding 11px
    // text-align center
    // display flex
    // flex-direction column
    // align-items center
    p
      font-size 12px
    h2
      text-align left
      font-size 20px
      font-weight bold
      display flex
      border-bottom 1px solid #C9C9C9
      margin 15px 0 5px
      input
        font-size 24px
        border none

</style>