<template>
  <div>
    <header>我要还款</header>
    <div class="content">
      <div class="section1">
        <div class="port">
          <p>贷款金额(元)</p>
          <h2>{{FMoney}}</h2>
          <button @click='notif'>还本金</button>
        </div>

        <div class="port">
          <p>待还利息(元)</p>
          <h2>{{lixi}}</h2>
          <button @click="rechargeLixi">还利息</button>
        </div>
        <!-- <van-dialog
          v-model="show"
          show-cancel-button
          @confirm="onConfirm"
        >
          <van-field
            v-model.number="postData.FMoney"
            type="number"
            readonly
            label="金额"
            placeholder="请输入金额"
          />
        </van-dialog> -->
      </div>
      <!-- <div class="section2">
        <p class="title"><span></span></p>
        <ul>
          <template v-if="detaInfo.length">
            <li v-for="(item,index) in detaInfo" :key="index"><span class="month">1月</span><p><span class="money">1999.00</span><span class="state">已还款</span></p></li>
            
          </template>
          <li v-else>暂无记录</li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
<style lang='stylus' scoped>
.content
  min-height 'calc(100vh - %s)' % 40px
  background #363636
  padding 0 14px
  overflow auto
  .section1
    width 100%
    display flex
    height 135px
    .port
      flex 1
      color #fff
      display flex
      flex-direction column
      align-items center
      height 100%
      justify-content center
      p
        font-size 12px
      h2
        font-size 32px
        margin 6px 0
      button
        font-size 16px
        width 113px
        height 35px
        border-radius 7.5px
        box-shadow 2.5px 2.5px 1.5px #000;
        background #0066CC
        color #fff
        border none
  .section2
    background #fff
    border-radius 7.5px
    overflow hidden
    margin-bottom 13px
    ul
      li
        line-height 43px
        display flex
        font-size 12px
        text-align center
        &~li
          border-top 1px solid #D7D7D7
        .month
          display block
          width 65px
          border-right 1px solid #D7D7D7
          align-items center
          justify-content center
          text-align center
          height 100%
        p
          flex 1
          display flex
          justify-content space-between
          padding 0 15px
          color #797979

    .title
      font-size 16px

      height 43px
      display flex
      align-items center
      justify-content center
      padding 0 11px
      background #F2F2F2



</style>

<script>
import { getHuankuan,postHuankuan } from "~/api/getData.js";
import {Tel} from '~/config/env.js'
import storage from "~/api/storage.js";
import dayjs from 'dayjs'
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  methods: {
    async onConfirm(){
      
      // if(!this.postData.FMoney || this.postData.FMoney>this.$route.query.lixi){
      //   this.$dialog.alert({
      //     title:'提醒',
      //     message:'金额输入有误！'
      //   }).then(()=>{
      //       //点击回调
      //   });
      //   return false;
      // }
      // let loading = this.$loading();
      // await postHuankuan({Data:this.postData}).then(res=>{
      //   loading.clear();
      //   if (res.data.StatusCode==200) {
      //     this.$dialog.alert({
      //       title:'提醒',
      //       message:'还款成功！'
      //     }).then(()=>{
      //         //点击回调
      //         this.lixi = this.lixi-this.postData.FMoney;
      //         this.postData.FMoney='';
      //     })
      //   }else{
      //       this.$dialog.alert({
      //         title:'提醒',
      //         message:res.data.Data
      //       }).then(()=>{
      //           //点击回调
      //       })

      //   }
      // })

    },
    rechargeLixi(){
      // this.show = true;
      this.$dialog.alert({
        title:'提醒',
        message:`还利息请联系客服！${Tel}`
      }).then(()=>{
          //点击回调
      })
    },
    notif(){
      this.$dialog.alert({
        title:'提醒',
        message:`还利息请联系客服！${Tel}`
      }).then(()=>{
          //点击回调
      })
    }
  },
  data() {
    return {
      show: false,
      postData:{
        "FInterID": "",  //我要贷款的那条ID
        "UserID": "",
        "FMoney": ""

      }
    };
  },
  async asyncData({query}){
    let ayData = {
      FMoney:query.FMoney,
      lixi:query.lixi,
      EndDay:query.EndDay
    };
    let overEnd=false;
    console.log('EndDay',dayjs(ayData.EndDay).endOf('day').format('YYYY-MM-DD'));
    console.log('now',dayjs().endOf('day').format('YYYY-MM-DD'));
    
    dayjs(ayData.EndDay)

    await getHuankuan({Data:{FInterID:query.FInterID}}).then(res=>{
      // console.log(res)
      if (res.data.StatusCode==200) {
        ayData.detaInfo=res.data.Data;
      }
    });
    return ayData
  },
  mounted() {
    this.postData.FInterID=this.$route.query.FInterID;
    this.postData.UserID = storage.get('UserID');
  },
  
  head: {
    title: "中良科技"
  },
  components: {},
};
</script>