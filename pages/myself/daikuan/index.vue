<template>
  <div>
    <header>我的贷款</header>
    <div class="content">
      <!-- <van-tabs v-model="active">
        <van-tab title="我的贷款">
          <ul class="fang-wrap" v-if="stateList1.length">
            <li v-for="(item,index) in stateList1" :key="index">
              <p class="product">
                <span>联系号码：{{item.FPhone}}</span>
                <van-button size="mini" type="primary" round>{{item.IsChecked | judgeState}}</van-button>
              </p>
              <p class>贷款天数:{{item.FDays}}</p>
              <p class="count">银行卡号：{{item.BankCard}}</p>
              <div class="prevMoney">
                <p>贷款金额</p>
                <p class="money">￥
                  <span>{{item.FMoney}}</span>
                </p>
              </div>
            </li>
          </ul>
          <wu-view v-else/>
        </van-tab>
        <van-tab title="审核中">
          <ul class="fang-wrap" v-if="stateList2.length">
            <li v-for="(item,index) in stateList2" :key="index">
              <p class="product">
                <span>联系号码：{{item.FPhone}}</span>
                <van-button size="mini" type="primary" round>{{item.IsChecked | judgeState}}</van-button>
              </p>
              <p class>贷款天数:{{item.FDays}}</p>
              <p class="count">银行卡号：{{item.BankCard}}</p>
              <div class="prevMoney">
                <p>贷款金额</p>
                <p class="money">￥
                  <span>{{item.FMoney}}</span>
                </p>
              </div>
            </li>
          </ul>
          <wu-view v-else/>
        </van-tab>
      </van-tabs>-->
      <ul class="fang-wrap" v-if="stateList1.length">
        <li v-for="(item,index) in stateList1" :key="index" @click="goTimeLine(item.FInterID)" >
          <p class="product">
            <span>联系号码：{{item.FPhone}}</span>
            <!-- <van-button size="mini" type="primary" round>{{item.IsChecked | judgeState}}</van-button> -->
          </p>
          <p class>贷款天数:{{item.FDays}}</p>
          <p class="count">银行卡号：{{item.BankCard}}</p>
          <div class="prevMoney">
            <p>贷款金额</p>
            <p class="money">
              ￥
              <span>{{item.FMoney}}</span>
            </p>
          </div>
        </li>
      </ul>
      <wu-view v-else/>
      <van-button size="large" style class="submit" @click="goEdit">申请贷款</van-button>
    </div>
  </div>
</template>

<script>
import { getDaikuan, getUserInfo } from "~/api/getData.js";
import Wu from "~/components/wu.vue";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  methods: {
    goEdit() {
      if (this.userInfo.FMoney) {
        this.$router.push({
          path: "/myself/daikuan/shenqingdaikuan",
          query: { UserID: this.$route.query.UserID }
        });
      } else {
        // 需要有货物仓储才可使用贷款服务
        this.$dialog
          .alert({
            title: "提醒",
            message: "需要有货物仓储才可使用贷款服务"
          })
          .then(() => {
            //点击回调
          });
      }
    },
    // 查看流程状态
    goTimeLine(FInterID){
      this.$router.push({path:'/timeLine',query:{UserID:this.$route.query.UserID,FInterID,type:3}})
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
  components: {
    "wu-view": Wu
  },
  async asyncData({ query }) {
    let ayData = {};
    // 获取用户信息
    await getUserInfo({ Data: { UserID: query.UserID } }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.userInfo = res.data.Data;
        console.log(res.data.Data);
      } else {
        console.log("error", res.data.Data);
      }
    });
    // 通过审核
    await getDaikuan({ Data: { UserID: query.UserID } }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.stateList1 = res.data.Data;
      } else {
        console.log(res.data);
      }
    });
    // 审核不通过
    // await getDaikuan({ Data: { UserID: query.UserID, IsChecked: 2 } }).then(
    //   res => {
    //     if (res.data.StatusCode == 200) {
    //       ayData.stateList1 = [...ayData.stateList1, ...res.data.Data];
    //     } else {
    //       console.log(res.data);
    //     }
    //   }
    // );
    // 审核中
    // await getDaikuan({ Data: { UserID: query.UserID, IsChecked: 0 } }).then(
    //   res => {
    //     if (res.data.StatusCode == 200) {
    //       ayData.stateList2 = res.data.Data;
    //     } else {
    //       console.log(res.data);
    //     }
    //   }
    // );
    return ayData;
  }
};
</script>
<style lang='stylus' scoped>
.submit
  color #fff
  background #003366
  font-weight bold
  position fixed
  bottom 0
  left 0
.content
  background #f2f2f2
.fang-wrap
  height 'calc(100vh - %s)' % 84px
  overflow auto
  // padding 11px 0 0
  li
    position relative
    font-size 12px
    padding 11px
    display flex
    flex-direction column
    justify-content space-between
    width 350px
    height 90px
    border-radius 7.5px
    background #fff
    margin 10px auto 0
    .product
      display flex
      justify-content space-between
    .type
      color #AEAEC8
    .prevMoney
      position absolute
      right 10px
      bottom 10px
      font-size 9px
      color #AEAEC8
      p
        text-align right
      .money
        color #005AB4
        span
          font-size 18px
</style>