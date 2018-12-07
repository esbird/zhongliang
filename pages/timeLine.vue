<template>
  <div class="content">
    <header>审核流程</header>
    <van-steps direction="vertical" :active="activeIndex" active-color="#000" class="steps">
      <van-step v-for="(item,index) in dicArr" :key="index">
        <p style="color:#003366">{{checkTime[index]?checkTime[index].AddTime:'' | dateFormat('YYYY-MM-DD HH:mm') }}</p>
        <h3>{{item.ItemName}}{{checkTime[index] && checkTime[index].Reason?':'+checkTime[index].Reason:''}}</h3>
      </van-step>
      <!-- <van-step>
        <p style="color:#003366">2016-07-12 12:40</p>
        <h3>审核通过</h3>
      </van-step> -->
      
    </van-steps>
  </div>
</template>
<script>
import {getSortList ,getCheckTime} from '~/api/getData.js'
export default {
  data() {
    return {
      activeIndex:0
    };
  },
  async asyncData({query}){
    let ayData = {}
    let dicNum;
    switch ( parseInt(query.type)) {
      case 1:
        dicNum= 50;
        break;
      case 2:
        dicNum= 19;
        break;
      case 3:
        dicNum= 29;
        break;
      default:

        break;
    }
    // 获取基础资料
    await getSortList({
      Data:{
        ItemParentID:dicNum
      }
    })
      .then(res=>{
        if (res.data.StatusCode==200) {
          ayData.dicArr = res.data.Data
        }else{
          console.log(res.data.Data)
        }
      })
    // 获取审核状态
    await getCheckTime({
      Data:{
        FInterID:query.FInterID
      }
    })
      .then(res=>{
        if (res.data.StatusCode==200) {
          ayData.checkTime = res.data.Data
        }else{
          console.log(res.data.Data)
        }
      })
    ayData.activeIndex = ayData.checkTime.length
    return ayData
  }
};
</script>
<style lang="stylus" scoped>
.content
  background #f2f2f2
  height 100vh
.steps
  margin-top 10px
</style>

