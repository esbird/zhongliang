<template>
  <div>
    <header>商品详情</header>
    <div class="content">
      <van-swipe>
        <van-swipe-item v-for="(item,index) in picArr" :key="index">
          <div class="img-wrap" v-lazy:background-image="item.WebSite">
            <!-- <div class="img-wrap">
              <img class="pic" src="~/static/index-swiper.png" />-->
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="infoDetail">
        <p class="price">￥<span>{{goodsDt.price}}</span></p>
        <p class="title">{{goodsDt.FName}}</p>
        <p class="count">数量：{{goodsDt.FNumber+goodsDt.FUnit}}</p>
      </div>
      <div class="line"></div>
      <div class="desc">
        <h2>商品详情</h2>
        <p class="cont">{{goodsDt.body}}</p>
      </div>
    </div>
    <van-button size="large" style="background:#003366;color:#fff" class="submit" @click="tel">联系对方</van-button>
  </div>
</template>
<script>
import { getGuaPaiDt, getPic } from "~/api/getData.js";
export default {
  methods: {
    tel(){
      location.href=`tel:${this.goodsDt.UserPhone}`
    }
  },
  data() {
    return {
      active: 0
    };
  },
  components: {},
  async asyncData({ query }) {
    let ayData = {};
    await getGuaPaiDt({ Data: { FInterID: query.FInterID } })
      .then(result => {
        // console.log(result)
        if (result.data.StatusCode == 200) {
          ayData.goodsDt = result.data.Data[0];
        }
      })
      .catch(err => {});
    await getPic({ Data: { PicID: ayData.goodsDt.PicID } })
      .then(result => {
        if (result.data.StatusCode == 200) {
          ayData.picArr = result.data.Data;
        }
      })
      .catch(err => {});

    return ayData;
  }
};
</script>
<style lang='stylus' scoped>
.img-wrap{
  height 350px;
  background-position top center
  background-size contain
  background-repeat no-repeat
  background-color #f2f2f2
}
.content
  padding-bottom 43px
.line
  height 10px
  background #f2f2f2
.desc
  padding 10px
  font-size 14px
.submit
  border-radius 2em
  position fixed
  bottom 0
  left 50%
  transform translateX(-50%)
.infoDetail
  padding 8px 18px
  .price
    font-family 'Arial'
    color #003366
    font-size 15px
    span
      font-size 23px
  .title
    font-size 14px
    margin-bottom:8px
  .count
    font-size 12px
    color #868686
.desc
  font-size 20px
  .cont
    margin-top 10px
    font-size 14px

</style>