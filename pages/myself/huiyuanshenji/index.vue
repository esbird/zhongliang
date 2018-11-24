<template>
  <div>
    <header>会员升级</header>
    <div class="content">
      <ul>
        <li v-for="(item,index) in applyRecord" :key="index">
          <div><span class="time">{{item.AddTime | dateFormat('YYYY-MM-DD HH:mm')}}</span></div>
          <div><span>会员等级{{item.NowLevel}}-{{item.NowLevel | levelName}}</span> <span class="state">{{item.IsChecked | judgeState}}</span></div>
        </li>
      </ul>
    </div>
    <van-button :disabled="$route.query.level==2" size="large" style="" class="submit" @click="goPromote">{{$route.query.level==2?'已是最高等级':'升级会员'}}</van-button>

  </div>
</template>
<style lang='stylus' scoped>
.submit
  color #fff;
  background #003366
  font-weight bold
  position fixed
  bottom 0;
  left 0;
.content
  min-height 'calc(100vh - %s)' % 40px
  background #F2F2F2
  padding 0 14px
  overflow auto
  li
    width 100%
    height 80px
    padding 10px
    margin 10px auto 0
    background #fff
    display flex
    flex-direction column
    justify-content space-between
    border-radius 7.5px
    div
      display flex
      justify-content space-between
      font-size 12px
      align-items center
      .time
        color #9494A6
        font-size 12px
        span
          font-size 18px
      .state
        font-size 18px
        color #003366
        font-weight 600






</style>

<script>
import { getUserLevel } from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  filters:{
    levelName(val){
      let newVal ='';
      switch (val){
        case 1:
          newVal = '租地会员';
          break;
        case 2:
          newVal = '贷款会员';
          break;
        default:
          break;
      }
      return newVal;
    }
  },
  methods: {
    goPromote(){
      this.$router.push({path:'/myself/huiyuanshenji/xuanzehuiyuan',query:{UserID:this.$route.query.UserID,level:this.$route.query.level}})
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
  async asyncData({query}) {
    let ayData={};
    await getUserLevel({Data:{UserID:query.UserID}}).then(res=>{
      if(res.data.StatusCode==200){
        ayData.applyRecord = res.data.Data;
      }else{
        console.log(res.data.Data)
      }
    }).catch(err=>{
      console.log(err)
    })
    return ayData;
  }
};
</script>