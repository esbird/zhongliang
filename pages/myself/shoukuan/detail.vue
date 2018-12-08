<template>
  <div class="content">
    <div class="broad">
      <div class="top">
        <p>预计收益</p>
        <h2>￥<span>{{shouyiSum | toDecimal2(2)}}</span></h2>
      </div>
      <div class="bottom">
        <p>贷款方：{{list[0].RealName}}</p>
        <p>还款方式：每月利息，到期还本</p>
        <p>起息时间：{{list[0].AddTime | dateFormat}}</p>
        <p>到期时间：{{list[list.length-1].EndDate | dateFormat}}</p>
      </div>
    </div>
    <ul>
      <li :style="{'border-color':item.status?'#003366':'#A1A1A1'}" v-for="(item,index) in list" :key="index">
        <div class="left">
          <p>{{item.EndDate |dateFormat}}</p>
          <h2 :style="{color:item.status?'#003366':'#A1A1A1'}">{{item.status?'已回款':'未回款'}}</h2>
        </div>
        <div class="right">
          <p><span>应收利息</span><span>¥{{item.shouyi*item.FMoneyBili/100 | toDecimal2(2)}}</span></p>
          <p><span>未收本金</span><span>¥{{item.FMoneyBili  | toDecimal2(2)}}</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {getfangkuanByID,getFenQiByID} from '~/api/getData.js'
export default {
  async asyncData({query}){
    let ayData = {}
    await getfangkuanByID({
      Data:{
        UserFKID:query.UserFKID
      }
    })
      .then(res=>{
        if (res.data.StatusCode==200) {
          ayData.list = res.data.Data;
          ayData.shouyiSum=0;
          ayData.list.forEach(element => {
            ayData.shouyiSum+=element.shouyi
          });
          // console.log(res.data.Data)
        }else{
          // console.log(res.data.Data)
        }
      })
    return ayData;
  }
}
</script>
<style lang="stylus" src="~/assets/styl/fenqi.styl" scoped>

</style>

