<template>
  <div>
    <!-- <header>首页</header> -->
    <div class="content">
      <!-- <van-swipe>
        <van-swipe-item v-for="(item,index) in banner" :key="index">
          <div class="img-wrap" >
            <img class="pic" v-lazy="item.WebSite"/>
          </div>
        </van-swipe-item>
      </van-swipe> -->
      <!-- <div class="sort-bar"><span>价格</span></div> -->
      <van-search
        v-model="searchVal"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
      >
  <div slot="action" @click="onSearch">搜索</div>
</van-search>
      <div class="goods-wrap">
        <div class="port-left">
          <ul>
            <li v-for="(item,index) in goodsSort" :key="item.ID" :class="{active:sortActive==index}" @click="selectSort(index,item.ID)">
              {{item.ItemName}}
              <ul v-show="sortActive==index">
                <li v-for="(ite) in item.child" :key="ite.ID" :class="{'active-item':activeItem==ite.ID}" @click.prevent.stop="selectSort1(ite.ID)">{{ite.ItemName}}</li>
              </ul>
            </li>
            <li :class="{active:sortActive=='daikuan'}" @click="selectDaikuan">贷款</li>
          </ul>

        </div>
        <div class="port-right">
          <ul>
            <li v-for="(item,index) in goodsList" :key="index" @click="goView(item.FInterID)">
              <img v-lazy="item.WebSite" alt="">
              <div class="text">
                <h2>{{item.FName}}</h2>
                <p class="weight">重量：{{item.FNumber}}{{item.FUnit}}</p>
                <p class="price">￥<span>{{item.price}}</span></p>
              </div>
            </li>
          </ul>
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
import { getSortList, getGuaPai, getPic,getDaiKuanAll } from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  data() {
    return {
      searchVal: "",
      active: 1,
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
  head: {
    title: "分类"
  },
  methods: {
    // 贷款
    selectDaikuan(){
      this.sortActive = 'daikuan';
      this.goodsList = this.daiKuanList;
    },
    // 搜索
    onSearch(){
      
    },
    goView(FInterID) {
      this.$router.push({ path: "/goodsDetail", query: { FInterID } });
    },
    async selectSort(index, ID) {
      this.loading = this.$loading();
      // 获取挂牌列表
      await getGuaPai({
        Data: {
          FType: ID,
          OrderPrice: 0
        }
      }).then(res => {
        this.loading.clear();
        if (res.data.StatusCode == 200) {
          if (res.data.Data.length) {
            this.goodsList = res.data.Data;
          }
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
      this.sortActive = index;
    },
    async selectSort1(ID) {
      this.loading = this.$loading();
      // 获取挂牌列表
      await getGuaPai({
        Data: {
          FType: ID,
          OrderPrice: 0
        }
      }).then(res => {
        this.loading.clear();
        if (res.data.StatusCode == 200) {
          // if (res.data.Data.length) {
          this.goodsList = res.data.Data;
          // }
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
      this.activeItem = ID;
    }
  },
  async asyncData() {
    let ayData = {};
    // 获取贷款列表
    await getDaiKuanAll()
      .then(res=>{
        if (res.data.StatusCode==200) {
          ayData.daiKuanList = res.data.Data;
        }else{
          console.log('getDaiKuanAll',res.data.Data)
        }
      })
    await getSortList({
      Data: {
        ItemParentID: 10
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.goodsSort = res.data.Data;
      } else {
        console.log(res.data.Data);
      }
    });
    //获取轮播
    await getPic({
      Data: {
        PicID: "lunbo"
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.banner = res.data.Data;
      } else {
        console.error(res.data.Data);
      }
    });
    // 获取分类子项
    ayData.goodsSort.forEach(async (element, index) => {
      await getSortList({
        Data: {
          ItemParentID: element.ID
        }
      }).then(res => {
        if (res.data.StatusCode == 200) {
          // console.log(res.data.Data)
          ayData.goodsSort[index].child = res.data.Data;
        } else {
          console.log(res.data.Data);
        }
      });
    });
    // 获取挂牌列表
    await getGuaPai({
      Data: {
        FType: 0,
        OrderPrice: 0
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.goodsList = res.data.Data;
      } else {
        console.log(res.data.Data);
      }
    });

    return ayData;
  }
};
</script>
<style lang='stylus' src="~/assets/styl/index.styl" scoped>
</style>