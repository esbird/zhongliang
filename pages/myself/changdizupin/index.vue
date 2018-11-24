<template>
  <div>
    <header>场地租赁</header>
    <div class="content">
      <van-tabs v-model="active">
        <van-tab title="已入库">
          <ul class="fang-wrap">
            <li v-for="(item,index) in state3List" :key="index"> 
              <div class="port-top">
                <p class="time"><span style="color:#949494">订单编号：{{item.GoodsNumber}}</span><span>租赁天数：{{item.FDays}}个天</span></p>
                <p class="product">{{item.FName}}</p>
                <p class="pingfan">所需平方：{{item.pingfang}}</p>
                <div class="count">
                  <span>所需租金</span><p class="price">￥<span>{{item.Price}}</span></p>

                </div>
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="通过审核">
          <ul class="shenhe-wrap">
            <li v-for="(item,index) in state2List" :key="index">
              <div class="port-top">
                <p class="time"><span style="color:#949494">订单编号：{{item.GoodsNumber}}</span><span>租赁天数：{{item.FDays}}个天</span></p>
                <p class="product">{{item.FName}}</p>
                <p class="pingfan">所需平方：{{item.pingfang}}</p>
                <div class="count">
                  <span>所需租金</span><p class="price">￥<span>{{item.Price}}</span></p>

                </div>
              </div>
              <div class="btn-wrap">
                <button @click="goDetail(item.UserGoodsID)">查看详情</button>
                <!-- <nuxt-link tag="button" :to="">查看详情</nuxt-link> -->
                <button class="jiaona">缴纳租金</button>
              </div>
            </li>

          </ul>
        </van-tab>
        <van-tab title="审核中">
          <ul class="shenheing-wrap">
            <li v-for="(item,index) in state1List" :key="index">
              <div class="port-top">
                <p class="time"><span style="color:#949494">订单编号：{{item.GoodsNumber}}</span><span>租赁天数：{{item.FDays}}个天</span></p>
                <p class="product">{{item.FName}}</p>
                <p class="pingfan">所需平方：{{item.pingfang}}</p>
                <div class="count">
                  <span>所需租金</span><p class="price">￥<span>{{item.Price}}</span></p>

                </div>
              </div>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
      <van-button size="large" style="" class="submit" @click="goEdit">申请场地</van-button>

    </div>
  </div>
</template>

<script>
import { getZuLin } from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  methods: {
    goEdit() {
      this.$router.push({ path: "/myself/changdizupin/zudishenqin" ,query:{UserID:this.UserID}});
    },
    goDetail(UserGoodsID){
      console.log(1)
      this.$router.push({path:'/myself/changdizupin/shenhexiangqin',query:{UserGoodsID}})
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
  components: {},
  async asyncData({ query }) {
    let ayData = {
      UserID:query.UserID
    };
    // 审核中
    await getZuLin({ Data: { UserID: query.UserID, IsChecked: 0 } }).then(
      res => {
        if (res.data.StatusCode == 200) {
          ayData.state1List = res.data.Data;
        }
      }
    );
    // 通过审核
    await getZuLin({
      Data: { UserID: query.UserID, IsChecked: 1, IsPay: 0 }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.state2List = res.data.Data;
      }
    });
    // 已入库
    await getZuLin({ Data: { UserID: query.UserID, IsPay: 1 } }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.state3List = res.data.Data;
      }
    });
    return ayData
  }
};
</script>
<style lang='stylus' src="~/assets/styl/changdizupin.styl" scoped>
</style>