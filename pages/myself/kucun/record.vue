<template>
  <div>
    <header>出入库记录</header>
    <div class="content">
      <ul>
        <li>
          <p class="order_num" style="color:#949494">出库订单编号：</p>
          <p>
            <span>品种</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>型号</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>规格</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>数量</span>
          </p>
          <p>
            <span>品种</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>型号</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>规格</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>数量</span>
          </p>
          <p class="port-bottom"><span class="name">创建人：</span><span class="time">2018-08-08</span></p>
          <span class="van-sku-row__item statue">审核中</span>
        </li>
        <li>
          <p class="order_num" style="color:#949494">入库订单编号：</p>
          <p>
            <span>品种</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>型号</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>规格</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>数量</span>
          </p>
          <p>
            <span>品种</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>型号</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>规格</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>数量</span>
          </p>
          <p class="port-bottom"><span class="name">创建人：</span><span class="time">2018-08-08</span></p>
          <span class="van-sku-row__item statue">审核中</span>
        </li>
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
  components: {
    "scc-sku": SccSku
  },
  async asyncData({ query }) {
    let ayData = {};
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