<template>
  <div id="moreIdent">
    <!-- 转入 -->
    <div class="in" v-if="$route.params.type==0">
      <p>转入金额</p>
      <h2>￥<input type="number" class="count" v-model.number="money"></h2>
      <button class="btn" @click="submit">提交审核</button>
    </div>
    <!-- 转出 -->
    <div class="out" v-if="$route.params.type==1">
      <p>提现金额</p>
      <h2>￥<input type="number" class="count" v-model.number="money"></h2>
      <p style="color:#868686">资金金额12412.00 <span style="color:#003366">全部体现</span></p>
      <button class="btn" @click="submit">提交审核</button>
    </div>
    <!-- 账单 --> 
    <ul class="record-wrap" v-if="$route.params.type==2">
      <li v-for="(item,index) in recordList" :key="index">
        <div class="port-left">
          <p>{{item.FType | userType}}</p>
          <p class="time">12-20 12:20</p>
        </div>
        <span class="count">{{item.IsChecked?'审核中':'已到账'}}</span>
        <span class="count">{{item.FType==1 || item.FType==3?'+':'-'+item.FMoney}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getUserInfo ,getMoneyRecord, postUserMoney} from "~/api/getData.js";
import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  async asyncData({ query, store ,params}) {
    let ayData = {
      UserID: query.UserID
    };
    console.log(params.type)
    switch (params.type) {
      // 转入
      case '0':
        
        break;
    
      // 转出
      case '1':
        
        break;
    
      // 账单
      case '2':
        console.log(1)
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
  filters:{
    userType(val){
      switch (val) {
      // 转入
      case 0:
        return '转入'
        break;
    
      // 转出
      case 1:
        return '转出'
        break;
    
      // 2 放款转出
      case 2:
        return '放款转出'
        break;
    
      // 3  贷款转入
      case 3:
        return '贷款转入'
        break;
    
      default:
        break;
    }
    }
  },
  methods: {
    async submit(){
      if (!this.money) {
        this.$alert('请先输入金额！')
        return;
      }
      const loading = this.$loading();
      await postUserMoney({Data:{
        UserID:this.$route.query.UserID,
        FType:this.$route.params.type,
        FMoney:this.money
      }}).then(res=>{
        loading.clear();
        if (res.data.StatusCode==200) {
          this.$alert('提交成功,等待客服通知')
            .then(()=>{
              this.$router.back();
            })
        }else{
          console.error('postUserMoney',res.data.Data)
        }
      })
    }
  },
  data() {
    return {
      money:''
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