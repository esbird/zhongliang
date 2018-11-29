<template>
  <div>
    <header>租赁申请</header>
    <div class="content">
      <van-cell-group>
        <van-cell title="" is-link arrow-direction="down" />
        <van-cell title="产品数量"  value="0"/>
      </van-cell-group>
      <h2 class="van-doc-demo-block__title">产品种类</h2>
      <van-cell-group>
        <table border="1" width="100%" frame="void">
          <tbody>
            <tr>
              <td>品种</td>
              <td>详情</td>
            </tr>
            <tr>
              <td>管材</td>
              <td><img src="~/static/arrow.png" alt=""><span>品种</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>型号</span>&nbsp;&nbsp;&nbsp;&nbsp; <span>规格</span>&nbsp;&nbsp;&nbsp;&nbsp; <span>数量</span></td>
            </tr>
          </tbody>
        </table>
      </van-cell-group>
      <!-- <h2 class="van-doc-demo-block__title">所需平方</h2>
      <van-field v-model="dataInfo.pingfang" readonly placeholder="请输入所需平方" />
      <h2 class="van-doc-demo-block__title">数量(数量)</h2>
      <van-field v-model="dataInfo.FNumber" readonly placeholder="请输入数量" />
      <h2 class="van-doc-demo-block__title">所需天数</h2>
      <van-field v-model="dataInfo.FDays" readonly placeholder="请输入所需天数" />

      <h2 class="van-doc-demo-block__title">联系方式</h2>
      <van-field v-model="dataInfo.UserPhone" readonly placeholder="请输入联系方式" />
      <h2 class="van-doc-demo-block__title">产品图片</h2>
      <div class="section3">
        <ul>
          <li style="" v-for="(item,index) in picArr" :key="index"  v-lazy:background-image="item.WebSite">
            <van-icon name="close" class="close" style="" @click="rmvPic(item.id,index)" />
          </li>
        </ul>
      </div>
      <h2 class="van-doc-demo-block__title">备注</h2>
      <textarea name="" class="desc" id="" readonly cols="30" rows="5" placeholder="备注" v-model="dataInfo.remark"></textarea>
      <h2 class="van-doc-demo-block__title">所需租金</h2>
      <van-field v-model="dataInfo.Price" readonly disabled style="color:#003366" placeholder="所需租金" />
      <van-button size="large" style="" class="submit" @click="submit">支付租金</van-button> -->
    </div>
  </div>
</template>

<script>
import {getZuLinDt,getPic,getDicParent} from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  methods: {
    async submit(){

    },
  },
  data() {
    return {
    };
  },
  head:{
    title:'中良科技'
  },
  components: {
  },
  async asyncData({query}) {
    let ayData={};
    // await getZuLinDt({Data:{UserGoodsID:query.UserGoodsID}})
    //   .then(res=>{
    //     if (res.data.StatusCode==200) {
    //       ayData.dataInfo = res.data.Data;
    //     }
    //   })
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
    return ayData
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
        transform translate3d(0,-50%,0)

      &:first-child
        width 100px
      &:last-child
        width 300px
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
  color #fff;
  background #003366
  font-weight bold
  position fixed
  bottom 0;
  left 0;

.van-doc-demo-block__title
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  color: #000;
  padding: 0 15px 0;
  line-height 35px
.van-cell__left-icon
  font-size 20px
.content
  background #f2f2f2
  padding-bottom 70px
.section1
  width 100%;
  height 150px
  background url('~/static/center-bg.png') no-repeat top center/cover;
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
// .section2
  // height 'calc(100vh - %s)' % 200px
  // overflow auto
.section3
    // height 2.(5px/2)
    background #fff
    // box-sizing: border-box
    padding:10px
    display: flex
    // margin-top: (10px/2)
    ul
        display flex
        flex-wrap: wrap
        li
            box-sizing: border-box
            width: (130px/2)
            height (130px/2)
            border-radius: (10px/2)
            background-position: center
            background-repeat: no-repeat
            background-size: contain
            margin: (20px/2)
            text-align: center
            position relative
            box-shadow: 0 0 3px #797979
            .close
              position:absolute;
              right:0;
              top:0;
              color:#fff;
              background:red
              border-radius: 50%
              font-size: 20px
              transform: translate3d(50%,-50%,0)
            img 
                height 100%
                width: auto
            &.add
                background url('~static/add-gray.png') no-repeat center /37px 37px
                border: (2px/2) solid #BCBCBC
                input[type=file]
                    width: 100%
                    height 100%
                    opacity 0



</style>