<template>
  <div>
    <header>我的挂牌</header>

    <van-tabs v-model="active">
      <van-tab title="通过审核">
        <div class="content">
          <ul>
            <li v-for="(item,index) in passList" :key="index">
              <img src="~/static/cuo.png" alt="" class="cuo" @click="goDel(item.FInterID,'passList',index)">
              <div class="port-top">
                <img v-lazy="item.WebSite" alt="">
                <div class="text">
                  <h2>{{item.FName}}</h2>
                  <p class="weight">重量：{{item.FNumber}} {{item.FUnit}}</p>
                  <p class="price">￥<span>{{item.price}}</span></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="审核中">
        <div class="content">
          <ul>
            <li v-for="(item,index) in applyingList" :key="index">
              <div class="port-top">
                <img v-lazy="item.WebSite" alt="">
                <div class="text">
                  <h2>{{item.FName}}</h2>
                  <p class="weight">重量：{{item.FNumber}} {{item.FUnit}}</p>
                  <p class="price">￥<span>{{item.price}}</span></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="未通过">
        <div class="content">
          <ul>
            <li v-for="(item,index) in cutList" :key="index">
              <img src="~/static/cuo.png" alt="" class="cuo" @click="goDel(item.FInterID,'cutList',index)">
              <div class="port-top">
                <img v-lazy="item.WebSite" alt="">
                <div class="text">
                  <h2>{{item.FName}}</h2>
                  <p class="weight">重量：{{item.FNumber}} {{item.FUnit}}</p>
                  <p class="price">￥<span>{{item.price}}</span></p>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getUserGuapai,delUserGuapai } from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  methods: {
    goDel(FInterID,arrName,index) {
      this.$dialog
        .confirm({
          title: "提醒",
          message: "您确定删除这条记录吗？"
        })
        .then(async () => {
          // on confirm
          await delUserGuapai({Data:{FInterID}}).then(res=>{
            if (res.data.StatusCode==200) {
              this.$dialog.alert({
                title:'提醒',
                message:'删除成功'
              }).then(()=>{
                  //点击回调
                  this[arrName].splice(index,1);
                  this[arrName] = this[arrName];

              })
            }else{
                this.$dialog.alert({
                  title:'提醒',
                  message:res.data.Data
                }).then(()=>{
                    //点击回调
                })

            }
          })
        })
        .catch(() => {
          // on cancel
        });
    },
    goEdit() {
      this.$router.push({ path: "/myself/wodeguapai/goodsEdit" });
    }
  },
  data() {
    return {
      active: 1
    };
  },
  head: {
    title: "中良科技"
  },
  components: {},
  async asyncData({ query }) {
    let ayData = {};
    // 通过审核
    await getUserGuapai({ Data:{UserID:query.UserID, IsChecked: 1} }).then(res => {
      // console.log(res.data)
      if (res.data.StatusCode == 200) {
        ayData.passList = res.data.Data;
      }
    });
    // 审核中
    await getUserGuapai({ Data:{UserID:query.UserID, IsChecked: 0} }).then(res => {
      // console.log(res.data)
      if (res.data.StatusCode == 200) {
        ayData.applyingList = res.data.Data;
      }
    });
    // 未通过
    await getUserGuapai({ Data:{UserID:query.UserID, IsChecked: 2} }).then(res => {
      // console.log(res.data)
      if (res.data.StatusCode == 200) {
        ayData.cutList = res.data.Data;
      }
    });
    // console.log(ayData);
    return ayData;
  }
};
</script>

<style lang='stylus' scoped>
.content
  background: #f2f2f2;
  padding: 20px 12px;
  min-height: 'calc(100vh - %s)' % 80px;
  ul
    li
      border-radius: 7.5px;
      overflow: hidden;
      position: relative;
      &~li
        margin-top 12px
      .cuo
        position: absolute;
        right: 5px;
        top: 5px;
        width: 20px;
        height: 20px;
        &:active
          opacity: 0.6;
      .port-top
        width: 100%;
        height: 100px;
        background: #fff;
        display: flex;
        align-items: center;
        padding: 7.5px;
        img
          width: 85px;
          height: 85px;
          background: fff;
          // margin-left: 7.5px
        .text
          display: flex;
          flex-direction: column;
          margin-left: 9px;
          height: 100%;
          h2
            font-size: 16px;
          .weight
            font-size: 12px;
            margin-top: 28px;
            color: #949494;
          .price
            font-size: 10px;
            color: #003366;
            margin-top: 3px;

            span
              font-size: 18px;
      .port-bottom
        display: flex;
        border-top: 1.2px solid #eee;
</style>