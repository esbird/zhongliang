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
        <!-- <div class="right-wrap"> -->
          <!-- <span class="status">审核中</span><br> -->
          <template v-if="!item.TotalPay">
            
            <van-tag  style="background:#1989FA;color:#fff">{{item.IsChecked | statusComputed(item.IsPay,item.TotalPay)}}</van-tag><br>
          </template>
          <span style="color:#003366">剩余{{item.FOrderNumber | leftDays(item.FDays)}}天</span>
        <!-- </div> -->
      </van-cell>
      <div class="btn-wrap">
        <nuxt-link tag="button" :to="{path:'/myself/kucun/kucunDetail',query:{UserID,UserGoodsID:item.UserGoodsID}}">查看详情</nuxt-link>
        <button
          @click="goDebt(item.UserGoodsID)"
          style="background:#fff;color:#000"
        >抵押贷款</button>
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
  filters:{
    statusComputed(IsChecked,IsPay,TotalPay){
      if (!IsChecked) {
        return '审核中'
      }
      if (!IsPay) {
        return '代付押金'
      
      }
      if (!TotalPay) {
        return '代付租金'
      }else{
        return ''
      }
    }
  },
  async asyncData({ query, store }) {
    let ayData = {
      UserID: query.UserID
    };
    await getZuLin({
      Data: {
        UserID: query.UserID,
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
  methods: {
    goDebt(UserGoodsID){
      switch(this.userInfo.UserType){
        case 1:
        // 仓储用户
          this.$dialog.confirm({
            title:'提醒',
            message:'申请贷款后，将不能成为出借人！'
          })
            .then(()=>{
              this.$router.push({path:'/myself/daikuan/shenqingdaikuan',query:{UserID:this.$route.query.UserID}})
            })
            .catch(()=>{

            })
          break;
        case 2:
        // 出借用户
          this.$alert('出借用户，不能使用贷款服务！')
          break;
        case 3:
          // 贷款用户
           this.$router.push({path:'/myself/daikuan/shenqingdaikuan',query:{UserID:this.$route.query.UserID}})

      }
      // if (this.userInfo.UserType) {
        
      // }
    }
  },
  data() {
    return {
      //   active: 2
      userInfo:{}
    };
  },
  head: {
    title: "我的库存"
  },
  components: {},
  mounted() {
    this.userInfo = JSON.parse(storage.get('userInfo'))
  }
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
  
  .status
    padding 4px 8px
    border 1px solid #003366
    border-radius 3px
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