<template>
  <div>
    <header>出库记录</header>
    <div class="content">
      <ul class="shenhe-wrap">
        <li v-for="(item,index) in outList " :key="index">
          <div class="port-top">
            <p class="order"><span style="color:#949494">订单编号：{{item.GoodsNumber}}</span><button>{{ item.IsChecked | judgeState}}</button></p>
            <p class="product">{{item.GoodsName}}</p>
            <p class="count">出库数量：{{item.FNumber}}</p>
            <p class="person"><span>创建人：{{item.FName}}</span> <span class="time">{{item.AddTime | dateFormat('YYYY-MM-DD HH:mm')}}</span></p>
          </div>
        </li>
      </ul>
      <van-button size="large" style="" class="submit" @click="goEdit">申请场地</van-button>

    </div>
  </div>
</template>

<script>
import { getChuKu } from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  methods: {
    goEdit() {
      this.$router.push({ path: "/myself/changdizupin/zudishenqin",query:{UserID:this.$route.query.UserID}});
    }
  },
  data() {
    return {
      active: 0
    };
  },
  head: {
    title: "中良科技"
  },
  filters:{
    judgeState(val){
      let state ='';
      switch(val){
        case 0:
          state ='审核中';
          break;
        case 1:
          state ='审核通过';
          break;
        case 2:
          state="审核不通过";
          break;
        default:
          break;
      }
      return state;

    }
  },
  components: {},
  async asyncData({query}) {
    // 
    let ayData={};
    await getChuKu({Data:{UserID:query.UserID}}).then(res=>{
      // console.log(res)
      if (res.data.StatusCode==200) {
        ayData.outList = res.data.Data;
      }
    })
    return ayData
  }
};
</script>
<style lang='stylus' scoped>
.content
  min-height 'calc(100vh - %s)' % 84px
  background #f2f2f2
  overflow auto
.shenhe-wrap
  // padding 11px 0 0
  li
    width: 350px
    border-radius: 7.5px
    background #fff
    margin: 11px auto 0 
    overflow hidden
    // height 
    .port-top
      padding 10px 10px 6px
      font-size: 12px
      p
        line-height: 2
      .order
        display flex
        justify-content: space-between
        button 
          padding 0 10px
          border-radius 5px
          border 1.2px solid #797979
          background #fff
          font-size 12px
      .person
        display flex
        justify-content space-between
.submit
  color #fff;
  background #003366
  font-weight bold
  position fixed
  bottom 0;
  left 0;
</style>