<template>
  <div>
    <header>库存详情</header>
    <div class="content">
      <van-cell-group>
        <van-cell title="平方" :value="parseInt(dataInfo.pingfang)"/>
        <van-cell>
          <span slot="title">时间</span>
          开始时间：{{parseInt(dataInfo.FOrderNumber) | dateFormat('YYYY-MM-DD')}}<br>
          结束时间：{{dataInfo.FOrderNumber | endTime(dataInfo.FDays) | dateFormat('YYYY-MM-DD')}}
        </van-cell>
        <!-- <van-field v-model="postData.val" type="number" label="产品数量" input-align="right" placeholder="请输入产品数量"/> -->
      </van-cell-group>
      <!-- <h2 class="van-doc-demo-block__title">产品种类</h2> -->
      <van-cell-group>
        <table border="1" width="100%" frame="void">
          <tbody>
            <tr>
              <td>品种</td>
              <td>详情</td>
            </tr>
            <tr v-for="(item,index) in dataInfo.Entry" :key="index">
              <td>{{item.FGoodsName}}</td>
              <td>
                <span>{{item.SecondName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{item.xinghaoName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{item.guigeName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>x{{item.FNumber}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </van-cell-group>
      <van-cell-group>
        <!-- <h2 class="van-doc-demo-block__title">所需平方</h2> -->
        <!-- <van-field v-model="postData.val" label="所需平方" input-align="right" placeholder="请输入所需平方"/>
        <van-field v-model="postData.val" label="所需天数" input-align="right" placeholder="请输入所需天数"/> -->

        <!-- <h2 class="van-doc-demo-block__title">联系方式</h2> -->
        <van-field v-model="dataInfo.FName" label="提交人" readonly input-align="right" placeholder="请输入提交人"/>
        <van-field v-model="dataInfo.UserPhone" label="联系方式" readonly input-align="right" placeholder="请输入联系方式"/>
      </van-cell-group>
      <!-- <h2 class="van-doc-demo-block__title">所需租金</h2> -->
      <van-cell-group>
        <van-cell title="所需押金" :value="computPrice" />
        <van-cell title="预计租金" :value="computPrice/2" />
      </van-cell-group>
      <ul class="base-fun-wrap">
        <nuxt-link tag="li" :to="{path:'/myself/kucun/putIn/add',query:{UserID:$route.query.UserID,UserGoodsID:$route.query.UserGoodsID}}">
          <i class="iconfont icon-zhuanru" style="color:#8A8A8A"></i>
          <span>入库</span>
        </nuxt-link>
        <nuxt-link tag="li" :to="{path:'/myself/kucun/putOut',query:{UserGoodsID:$route.query.UserGoodsID}}">
          <i class="iconfont icon-zhangdan" style="color:#8A8A8A"></i>
          <span>出库</span>
        </nuxt-link>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getZuLinDt, getPic, getDicParent } from "~/api/getData.js";
import SccSku from "~/components/sccSku.vue";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  data() {
    return {
      postData: {
        val: ""
      }
    };
  },
  methods: {
    async submit() {}
  },
  head: {
    title: "库存详情"
  },
  computed:{
    computPrice(){
      if (this.dataInfo.pingfang && this.dataInfo.FDays) {
        return  this.dataInfo.pingfang*this.dataInfo.FDays;
      }else{
        return 0

      }
    }
  },
  components: {
    "scc-sku": SccSku
  },
  async asyncData({ query }) {
    let ayData = {};
    await getZuLinDt({Data:{UserGoodsID:query.UserGoodsID}})
      .then(res=>{
        if (res.data.StatusCode==200) {
          ayData.dataInfo = res.data.Data;
        }
      })
    // // 获取图片
    // await getPic({Data:{PicID:ayData.dataInfo.PicID}}).then(res=>{
    //   if (res.data.StatusCode==200) {
    //     ayData.picArr = res.data.Data;
    //   }
    // })

    // // 分类信息 GoodsType
    // ayData.sortArr =[];
    // let presID = ayData.dataInfo.GoodsType || 10;
    // // console.log(ayData)
    // while (presID!=10) {
    //   await getDicParent({Data:{ID:presID}}).then(async res=>{

    //     if (res.data.StatusCode==200) {
    //       // console.log(res.data)
    //       ayData.sortArr.unshift(res.data.Data[0].ItemName);
    //       presID = res.data.Data[0].ItemParentID;
    //     }
    //   })
    // }
    return ayData;
  }
};
</script>
<style lang='stylus' scoped>
table
  tr
    td
      height 40px
      text-align center
      font-size 16px
      // display inline-flex
      // justify-content space-around
      position relative
      img
        width 15px
        height 15px
        position absolute
        top 50%
        right 15px
        transform translate3d(0, -50%, 0)
      &:first-child
        width 100px
      &:last-child
        width 300px
.van-cell-group
  margin-top 10px
.desc
  width 350px
  height 110px
  border-radius 7.5px
  color #949494
  padding 11px
  font-size 14px
  margin 0 auto
  display block
.submit
  color #fff
  background #003366
  font-weight bold
  position fixed
  bottom 0
  left 0
.van-doc-demo-block__title
  margin 0
  font-weight 400
  font-size 14px
  color #000
  padding 0 15px 0
  line-height 35px
.van-cell__left-icon
  font-size 20px
.content
  background #f2f2f2
  height 'calc(100vh - %s)' % 40px
  overflow-y auto
.section1
  width 100%
  height 150px
  background url('~/static/center-bg.png') no-repeat top center / cover
  display flex
  flex-direction column
  align-items center
  justify-content center
  // margin-bottom 20px
  img
    width 60px
    height 60px
    border-radius 50%
    background #fff
  span
    font-size 16px
    margin-top 10px
    color #fff

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

.section3
  // height 2.(5px/2)
  background #fff
  // box-sizing: border-box
  padding 10px
  display flex
  // margin-top: (10px/2)
  ul
    display flex
    flex-wrap wrap
    li
      box-sizing border-box
      width (130px / 2)
      height (130px / 2)
      border-radius (10px / 2)
      background-position center
      background-repeat no-repeat
      background-size contain
      margin (20px / 2)
      text-align center
      position relative
      box-shadow 0 0 3px #797979
      .close
        position absolute
        right 0
        top 0
        color #fff
        background red
        border-radius 50%
        font-size 20px
        transform translate3d(50%, -50%, 0)
      img
        height 100%
        width auto
      &.add
        background url('~static/add-gray.png') no-repeat center / 37px 37px
        border (2px / 2) solid #BCBCBC
        input[type=file]
          width 100%
          height 100%
          opacity 0
</style>