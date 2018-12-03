<template>
  <div>
    <header>租赁申请</header>
    <div class="content">
      <!-- <van-cell-group>
        <van-cell title is-link arrow-direction="down"/>
        <van-field
          v-model="postData.val"
          type="number"
          label="产品数量"
          input-align="right"
          placeholder="请输入产品数量"
        />
      </van-cell-group> -->
      <h2 class="van-doc-demo-block__title">产品种类</h2>
      <van-cell-group>
        <table border="1" width="100%" frame="void">
          <tbody>
            <tr>
              <td>品种</td>
              <td>详情</td>
            </tr>
            <tr v-for="(item,index) in EntryData" :key="index" >
              <td>{{item.FGoodsName}}</td>
              <td>
                <img @click="del(index)" src="~/static/cuo.png" alt>
                <span>{{item.SecondName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{item.xinghaoName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>{{item.guigeName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span>x{{item.FNumber}}</span>
              </td>
            </tr>
            <tr><td colspan='2' @click="showBase=true"><i class="iconfont icon-jia"></i></td></tr>
          </tbody>
        </table>
      </van-cell-group>
      <van-cell-group>
        <!-- <h2 class="van-doc-demo-block__title">所需平方</h2> -->
        <van-field v-model="postData.val" label="所需平方" input-align="right" placeholder="请输入所需平方"/>
        <van-field v-model="postData.val" label="所需天数" input-align="right" placeholder="请输入所需天数"/>

        <!-- <h2 class="van-doc-demo-block__title">联系方式</h2> -->
        <van-field v-model="postData.val" label="联系方式" input-align="right" placeholder="请输入联系方式"/>
      </van-cell-group>
      <!-- <h2 class="van-doc-demo-block__title">所需租金</h2> -->
      <van-cell-group>
        <van-cell title="所需押金" :value="computPrice" />
        <van-cell title="预计租金" :value="computPrice/2" />
        <!-- <van-field
          v-model="postData.val"
          label="所需押金"
          input-align="right"
          readonly
          disabled
          style="color:#003366"
          placeholder="所需押金"
        />
        <van-field
          v-model="postData.val"
          label="预计租金"
          input-align="right"
          readonly
          disabled
          style="color:#003366"
          placeholder="预计租金"
        /> -->
      </van-cell-group>
      <van-button size="large" style class="submit" @click="submit">提交订单</van-button>
    </div>
    <scc-sku v-model="showBase" :baseData="baseData" :selectedIndex="selectedIndex" @submit="setItem"></scc-sku>
  </div>
</template>
<script>
import {
  getZuLinDt,
  getPic,
  getDicParent,//获取父级分类
  getSortList,//获取分类
  postZuLin,
} from "~/api/getData.js";
import SccSku from "~/components/sccSku.vue";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  data() {
    return {
      selectedIndex:0,
      EntryData:[],
      postData: {
        UserID: 1,  
        PicID: 1,  //
        pingfang: 1,  //  平方
        Price: 1,  
        FDays: 1,   //所需天数
        FName: 1,  //  联系人
        UserPhone: 1, // 电话
        remark: 1, // 
        FOrderNumber: 1,  //订单编号  时间戳

        val: ""
      },
      goods: {
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg"
      },
      showBase: false
    };
  },
  computed:{
    computPrice(){
      if (this.postData.pingfang && this.postData.FDays) {
        return  this.postData.pingfang*this.postData.FDays;
      }else{
        return 0

      }
    }
  },
  methods: {
    // 删除
    del(index){
      this.$dialog.confirm({
        title:'提醒',
        message:'确定删除这条吗？'
      })
        .then(()=>{
          this.EntryData.splice(index,1)
        }).catch(()=>{
          console.log('取消了删除')
        })
    },
    setItem(item){
      this.EntryData.push(item);
    },
    // 提交审核
    async submit() {
      
      await postZuLin

    }
  },
  head: {
    title: "中良科技"
  },
  components: {
    "scc-sku": SccSku
  },
  async asyncData({ query }) {
    let ayData = {
      baseData:{}
    };
    // 获取一级分类：管材，板材
    await getSortList({
      Data: {
        ItemParentID: 10
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.baseData.sortLv1Arr = res.data.Data;
      }
    });
    // 获取二级分类
    await getSortList({
      Data: {
        ItemParentID: 11
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.baseData.sortLv2Arr = res.data.Data;
      }
    });
    
    // 获取规格分类
    await getSortList({
      Data: {
        ItemParentID: 21
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.baseData.sizeArr = res.data.Data;
      }
    });
    // 获取标准型号分类
    await getSortList({
      Data: {
        ItemParentID: 23
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.baseData.typeStandardArr = res.data.Data;
      }
    });
    // 获取型号分类
    await getSortList({
      Data: {
        ItemParentID: 36
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.baseData.typeArr = res.data.Data;
      }
    });



    // 分类信息 GoodsType
    // ayData.sortArr = [];
    // let presID = ayData.dataInfo.GoodsType || 10;
    // console.log(ayData)
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
      i.iconfont 
        font-size 30px
        color #C1C1C1
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
  height 'calc(100vh - %s)' % 100px
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