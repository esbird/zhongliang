<template>
  <div>
    <header>出入库记录</header>
    <div class="content">
      <ul>
        <li v-for="(item,index) in zuLingList" :key="index">
          <p class="order_num" style="color:#949494">{{item.Type?'出库':'入库'}}订单编号：{{item.FOrderNumber}}</p>
          <p v-for="(ite,idx) in item.Entry" :key="idx">
            <span>{{ite.FGoodsName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{ite.xinghaoName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{ite.guigeName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>x{{ite.FNumber}}</span>
          </p>
          <!-- <p>
            <span>品种</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>型号</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>规格</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>数量</span>
          </p> -->
          <p class="port-bottom"><span class="name">预留电话：{{item.UserPhone}}</span><span class="time">{{parseInt(item.FOrderNumber) | dateFormat('YYYY-MM-DD')}}</span></p>
          <span class="van-sku-row__item statue">{{item.IsChecked | judgeState}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getKuCunRecord } from "~/api/getData.js";
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
  components: {
    "scc-sku": SccSku
  },
  async asyncData({ query }) {
    let ayData = {};
    await getKuCunRecord({
      Data: {
        UserID: query.UserID,
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.zuLingList = res.data.Data;
      } else {
        console.log("getZuLin", res.data.Data);
      }
    });
    return ayData;
  }
};
</script>
<style lang='stylus' scoped>
.content
  height 'calc(100vh - %s)' % 40px
  background #EEEDF2
  overflow auto
ul
  li
    position relative
    width 350px
    min-height 100px
    background #fff
    border-radius 7.5px
    padding 10px 10px 35px
    margin 12px auto 0
    font-size 12px
    .order_num
      margin-bottom 3px
    p
      line-height 1.7
    .port-bottom
      position absolute
      bottom 10px
      left 0
      padding 0 10px
      display flex
      justify-content space-between
      width 100%
    .statue
      position absolute
      right 0px
      top 10px

</style>