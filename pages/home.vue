<template>
  <div>
    <div class="content">
      <van-swipe>
        <van-swipe-item v-for="(item,index) in banner" :key="index">
          <div class="img-wrap" >
            <img class="pic" v-lazy="item.WebSite"/>
          </div>
        </van-swipe-item>
      </van-swipe>
      <ul class="nav-wrap">
        <li @click="goKuCun">
          <div class="img-wrap">
            <i class="iconfont icon-shangpinkucuncangkudunhuojiya"></i>
          </div>
          <span>仓储</span>
        </li>
        <li @click="goDaiKuan">
          <div class="img-wrap">
            <i class="iconfont icon-daikuan_huaban"></i>
          </div>
          <span>贷款</span>
        </li>
        <li @click="goFanKuan">
          <div class="img-wrap">
            <i class="iconfont icon-daikuan1"></i>
          </div>
          <span>放贷</span>
        </li>
      </ul>
      <div class="cont">
        <div class="news-block">
          <h2>新闻公告</h2>
          <div class="news-cont">
            <div class="port-left">
              <p>xxxxx</p>
            </div>
            <ul class="port-right">
              <li><span>xxxxxx</span><span class="date">10-06</span></li>
              <li><span>xxxxxx</span><span class="date">10-06</span></li>
              <li><span>xxxxxx</span><span class="date">10-06</span></li>
              <li><span>xxxxxx</span><span class="date">10-06</span></li>
            </ul>
          </div>
        </div>
        <div class="desc-block">
          <h2>公司简介</h2>
          <p>中良科技集团有限公司是中国人民解放军总装部指北针唯一列装生产厂。</p>
          <p>中良科技集团是一家以军工仪器、焊接设备、电气设备、工程机械为核心产业，集科研、生产、贸易、投资、房地产开发为一体的无区域企业集团，拥有五个控股子公司，九个成员企业。</p>
          <p>母公司中良科技集团有限公司坐落在株洲市荷塘区金山工业园，注册资金8000万元，员工300多人，拥有一批优秀的管理、技术人才，和一支高素质的职工队伍。</p>
          <p>光电仪器事业部主要生产各类便携式指北针，先后完成了62式、80型、97型、97A型的生产和更新换代，是中国人民解放军总装部指北针唯一列装生产厂。</p>
        </div>
      </div>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home" :to="{path:'/home',query:{UserID:$route.query.UserID}}">首页</van-tabbar-item>
      <van-tabbar-item icon="home" :to="{path:'/sort',query:{UserID:$route.query.UserID}}">
        分类
        <i class="iconfont icon-chanpin" slot="icon" style="font-size:0.52rem"></i>
      </van-tabbar-item>
      <van-tabbar-item icon="contact" :to="{path:'/myself',query:{UserID:$route.query.UserID}}">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { getSortList, getGuaPai, getUserInfo,getPic } from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  data() {
    return {
      active: 0,
      activeItem: 0,
      loading: "",
      sortActive: 0,
      goodsSort: [],
      goodsList: [],
      postData: {
        FType: "1",
        OrderTime: "",
        OrderPrice: ""
      }
    };
  },
  components: {},
  head() {
    return{

      title: "首页"
    }
  },
  methods: {
    //跳放款
    goFanKuan() {
      this.$router.push({
        path: "/myself/wodefankuan",
        query: { UserID: this.$route.query.UserID }
      });
    },
    //跳代款
    goDaiKuan() {
      if (this.userInfo.UserType >= 2) {
        this.$router.push({
          path: "/myself/wodedaikuan",
          query: { UserID: this.$route.query.UserID }
        });
      }else{
        this.$dialog
          .alert({
            title: "提醒",
            message: '请先提升会员等级'
          })
          .then(() => {
            //点击回调
          });
      }
    },
    //跳库存
    goKuCun() {
      if (this.userInfo.UserType >= 1) {
        this.$router.push({
          path: "/myself/wodekucun",
          query: { UserID: this.$route.query.UserID }
        });
      }else{
        this.$dialog
          .alert({
            title: "提醒",
            message: '请先提升会员等级'
          })
          .then(() => {
            //点击回调
          });
      }
    },
    goView(FInterID) {
      this.$router.push({ path: "/goodsDetail", query: { FInterID } });
    }
  },
  async asyncData({ query }) {
    let ayData = {};
    await getUserInfo({
      Data: {
        UserID: query.UserID
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.userInfo = res.data.Data;
      }else{
        console.error( res.data.Data);

      }
    });
    //获取轮播
    await getPic({
      Data: {
        PicID: 'lunbo'
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.banner = res.data.Data;
      }else{
        console.error( res.data.Data);

      }
    });


    return ayData;
  }
};
</script>
<style lang='stylus' src="~/assets/styl/home.styl" scoped>
</style>