<template>
  <div>
    <header>申请出库</header>
    <div class="content">
      <van-cell-group>
        <h2 class="van-doc-demo-block__title">出库时间</h2>
        <van-cell is-link :value="postData.AddTime | dateFormat('YYYY-MM-DD')" placeholder="请选择出库时间" @click="showDate = true"/>
        <!-- <van-field v-model="postData.val" type="number" label="产品数量" input-align="right" placeholder="请输入产品数量"/> -->
      </van-cell-group>
      <!-- <h2 class="van-doc-demo-block__title">产品种类</h2> -->
      <van-cell-group>
        <!-- <table border="1" width="100%" frame="void">
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
        </table> -->
        <van-checkbox-group v-model="result">
          <table width="100%" frame="void">
          <tbody>
            <tr style="background:#f2f2f2">
              <td>出库种类</td>
              <td>出库数量(吨)</td>
            </tr>
            <tr v-for="(item,index) in dataInfo.Entry" :key="index">
              <!-- <td></td> -->
              <td>
                <van-checkbox :name="index">
                </van-checkbox>
                <span>{{item.FGoodsName}}</span>
                <span>{{item.SecondName}}</span>
                <span>{{item.xinghaoName}}</span>
                <span>{{item.guigeName}}</span>
                <!-- <span>x{{item.FNumber}}</span> -->
              </td>
              <td style="background:#f2f2f2;color:#868686">
                <input type="number" v-model.number="item.FNumber1" :style="{color: !item.FNumber1 || item.FNumber1<=item.FNumber?'#000':'red'}">/{{item.FNumber}}</td>
            </tr>
          </tbody>
        </table>
          
        </van-checkbox-group>
      </van-cell-group>
      <van-cell-group>
        <h2 class="van-doc-demo-block__title">提交人</h2>
        <van-field v-model="postData.FName" label="提交人" input-align="right" placeholder="请输入提交人"/>
      </van-cell-group>
    </div>
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择出库时间"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <van-button size="large" style class="submit" @click="submit">提交申请</van-button>
  </div>
</template>
<script>
import { getZuLinDt, getPic, getDicParent,postChuKu } from "~/api/getData.js";
import SccSku from "~/components/sccSku.vue";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  data() {
    return {
      showDate:false,
      currentDate: new Date(),
      postData: {
        Entry:[]
      },
      result:[]
    };
  },
  methods: {
    onConfirm(val){
      console.log(val)
      this.postData.AddTime = val;
      this.showDate = false;
    },
    onCancel(){
      console.log(1)
      this.showDate = false;
    },
    async submit() {
      // 判断出库数据是否为空
      if(!this.result.length){
        this.$alert('出库内容不能为空！')
        return;
      }
      if (!this.postData.AddTime) {
        this.$alert('出库时间不能为空！')
        return;
      }
      if (!this.postData.FName) {
        this.$alert('提交人不能为空！')
        return;
      }
      this.postData.UserID = this.$route.query.UserID;
      this.postData.FOrderNumber = (new Date()).valueOf();
      this.postData.Type = 0;
      // 判断数量是否超出限量
      for (let index = 0; index < this.result.length; index++) {
        
        this.result[index];
        if (this.dataInfo.Entry[this.result[index]].FNumber1 > this.dataInfo.Entry[this.result[index]].FNumber ) {
          this.$alert('出库数量超出库存！');
          return;
        }
        
      }
      this.result.forEach(element => {
        this.dataInfo.Entry[element].FNumber = this.dataInfo.Entry[element].FNumber1;
        this.postData.Entry.push(this.dataInfo.Entry[element]);
        
      });
      await postChuKu({
        Data:this.postData
      })
        .then(res=>{
          if (res.data.StatusCode==200) {
            this.$alert('出库提交成功，等待审核').then(()=>{
              this.$router.back();
            })
          }else{
            console.log(res.data.Data);
          }
        })
    }
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
        }else{
          console.log('getZuLinDt',res.data.Data)
        }
      })
    return ayData;
  }
};
</script>
<style lang='stylus' scoped>
table
  tr
    display flex
    td
      height 40px
      text-align center
      font-size 14px
      img
        width 15px
        height 15px
        position absolute
        top 50%
        right 15px
        transform translate3d(0, -50%, 0)
      &:first-child
        display flex
        justify-content space-around
        align-items center
        position relative
        flex 250
      &:last-child
        display flex
        justify-content center
        align-items center
        flex 150
        // font-size 18px
        
        input 
          width 63px
          height 37px
          border-radius 3px
          background #fff
          border none
          text-indent  5px
          text-align center
          margin-right 3px
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
  background #f2f2f2
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