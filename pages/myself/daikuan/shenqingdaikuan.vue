<template>
  <div>
    <header>贷款信息</header>
    <div class="content">
      <div class="daikuan-box">
        <p>可贷款金额</p>
        <h2>
          <span>￥</span>
          {{userInfo.FMoney}}
        </h2>
      </div>
      <h2 class="van-doc-demo-block__title">贷款金额</h2>
      <van-field
        v-model.number="dataInfo.FMoney"
        :style="{color:userInfo.FMoney<dataInfo.FMoney?'red':'#000'}"
        type="number"
        placeholder="请输入贷款金额"
      />
      <h2 class="van-doc-demo-block__title">贷款天数</h2>
      <van-field v-model.number="dataInfo.FDays" type="number" placeholder="请输入贷款天数"/>
      <h2 class="van-doc-demo-block__title">贷款人联系方式</h2>
      <van-field v-model.number="dataInfo.FPhone" type="number" placeholder="请输入方式"/>
      <h2 class="van-doc-demo-block__title">银行卡</h2>
      <van-field v-model.number="dataInfo.BankCard" disabled readonly type="number" placeholder="银行卡"/>
      <h2 class="van-doc-demo-block__title">银行卡开户行</h2>
      <van-field v-model="dataInfo.kaihuhang" disabled readonly type="text" placeholder="银行卡开户行"/>
      <div class="xieyi">
        <input type="checkbox" name id="xieyi" v-model="xieyi">
        <label for="xieyi">贷款协议</label>
      </div>

      <van-button size="large" style class="submit" @click="submit">提交申请</van-button>
    </div>
  </div>
</template>

<script>
import { getUserInfo, postDaikuan,getZuLinDt } from "~/api/getData.js";
import { checkBankno, phoneTest } from "~/api/utils.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
import axios from "axios";

export default {
  computed: {
    checkBank() {
      return checkBankno(this.dataInfo.BankCard.toString());
    }
  },
  methods: {
    async submit() {
      if (
        this.dataInfo.FMoney > this.userInfo.FMoney ||
        this.dataInfo.FMoney == 0
      ) {
        this.$dialog
          .alert({
            title: "提醒",
            message: "贷款金额不足！"
          })
          .then(() => {
            //点击回调
          });
        return;
      }
      if (!this.xieyi) {
        this.$dialog
          .alert({
            title: "提醒",
            message: "请先阅读贷款协议，并同意"
          })
          .then(() => {
            //点击回调
          });
        return;
      }
      let state = true;
      for (const key in this.dataInfo) {
        if (this.dataInfo.hasOwnProperty(key)) {
          if (!this.dataInfo[key]) state = false;
        }
      }
      // 校验银行卡
      let { data: backCheck } = await axios
        .get(
          `https://ccdcapi.alipay.com/validateAndCacheCardInfo.json?_input_charset=utf-8&cardNo=${
            this.dataInfo.BankCard
          }&cardBinCheck=true`
        )

      if (!backCheck.validated) {
        // console.log(this.dataInfo.BankCard.toString())
        this.$alert("银行卡格式错误！");
        return;
      }
      if (!phoneTest(this.dataInfo.FPhone)) {
        this.$alert("手机号格式错误！");
        return;
      }
      if (!state) {
        this.$dialog
          .alert({
            title: "提醒",
            message: "请先完善信息"
          })
          .then(() => {
            //点击回调
          });
        return;
      }
      await postDaikuan({ Data: this.dataInfo }).then(res => {
        if (res.data.StatusCode == 200) {
          this.$dialog
            .alert({
              title: "提醒",
              message: "提交成功！"
            })
            .then(() => {
              //点击回调
              this.$router.back();
            });
        } else {
          this.$dialog
            .alert({
              title: "提醒",
              message: res.data.Data
            })
            .then(() => {
              //点击回调
            });
        }
      });
    }
  },
  data() {
    return {
      xieyi: false,
      // userinfo:{},
      
    };
  },
  head: {
    title: "中良科技"
  },
  components: {},
  mounted() {
    // this.userinfo=JSON.parse(storage.get('userInfo'));
    this.dataInfo.UserID = this.userInfo.UserID;
  },
  async asyncData({ query }) {
    let ayData = {
      dataInfo: {
        UserID: "",
        FMoney: "",
        BankCard: "",
        FPhone: "",
        FDays: "",
        UserGoodsID:query.UserGoodsID
      }
    };
    await getUserInfo({
      Data: {
        UserID: query.UserID
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.userInfo = res.data.Data;
      } else {
        console.error("getUserInfo", res.data.Data);
      }
    });
    await getZuLinDt({
      Data: {
        UserGoodsID: query.UserGoodsID
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.zuPingInfo = res.data.Data;
      } else {
        console.error("getZuLinDt", res.data.Data);
      }
    });
    ayData.userInfo.FMoney = parseInt(ayData.zuPingInfo.DMoney)
    // console.log(ayData.zuPingInfo);
    ayData.dataInfo.BankCard = ayData.userInfo.BankCard;
    ayData.dataInfo.kaihuhang = ayData.userInfo.kaihuhang;
    return ayData;
  }
};
</script>

<style lang='stylus' scoped>
.xieyi
  display flex
  font-size 14px
  padding-left 16px
  line-height 30px
  align-items center
  label
    margin-left 7px
.daikuan-box
  width 350px
  height 100px
  background #003366
  color #fff
  display flex
  flex-direction column
  align-items center
  border-radius 10px
  justify-content center
  margin 13px auto
  p
    font-size 14px
  h2
    font-size 24px
    margin-top 15px
    span
      font-size 12px
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
  height 'calc(100vh - %s)' % 84px
  padding-bottom 15px
  overflow auto
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