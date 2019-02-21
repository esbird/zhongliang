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
      </van-swipe>-->
      <!-- <div class="sort-bar"><span>价格</span></div> -->
      <van-search placeholder="请输入搜索关键词" show-action readonly @click="searchShow=true" >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-popup v-model="searchShow" position="right" :overlay="false" style="width:100%;height:100%">
          <form action="/">
          <van-search v-model="searchVal" placeholder="请输入搜索关键词" :focus="searchShow" show-action @search="onSearch">
            <div slot="action" @click="onCancel">返回</div>
            <van-icon slot="left-icon" name="arrow-left" />
          </van-search>
          </form>
        
        <ul class="sort-wrap" v-if="searchGoodsList.length && searchVal">
          <li v-for="(item,index) in searchGoodsList" :key="index" @click="goView(item.FInterID)">
            <img v-lazy="item.WebSite" alt>
            <div class="text">
              <h2>{{item.FName}}</h2>
              <p class="weight">重量：{{item.FNumber}}{{item.FUnit}}</p>
              <p class="price">
                ￥
                <span>{{item.price}}</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="search-box" v-else>
          <div class="search-history">
            <p style="color:#BFBFBF">
              <i class="iconfont icon-lishi-"></i>
              <span>历史搜索</span>
              <i class="iconfont icon-shanchu delete" @click="deleteHistory"></i>
            </p>
            <span v-for="(item,index) in searchHistory" :key="index" @click="searchVal=item;onSearch()">{{item}}</span>
          </div>
        </div>
      </van-popup>
      <div class="goods-wrap">
        <div class="port-left">
          <ul class="lv1">
            
            <li>贷款
              <ul>
                <li
                  v-for="(ite) in daikuanTypeSort"
                  :key="ite.ID"
                  :class="{'active-item':activeItem==ite.ID}"
                  @click="selectDaikuan(ite.ID)"
                >{{ite.ItemName}}</li>
              </ul>
            </li>
            <li>挂牌
              <ul>
                <li
              v-for="(item,index) in goodsSort"
              :key="item.ID"
              :class="{'active-item':activeItem==item.ID}"
              @click="selectSort(index,item.ID)"
            >
              {{item.ItemName}}
            </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="port-right">
          <!-- 二级分类 -->
          <div class="sortNav2" v-if="sortActive != 'daikuan'">
            <ul class>
              <li
                v-for="(item) in goodsSort2"
                :key="item.ID"
                :class="{'active-item':activeItem2==item.ID}"
                @click.prevent.stop="selectSort1(item.ID)"
              >{{item.ItemName}}</li>
            </ul>
          </div>
          <ul class="daikuan-wrap" v-if="sortActive=='daikuan'">
            <li @click="goDetail(item.FInterID)" v-for="(item,index) in daiKuanList" :key="index">
              <h2>{{item.RealName}}</h2>
              <p style="display:flex;align-items:center" class="star">
                <van-rate readonly :size="14" v-model="starCount"/>
                <span style="color:#94A5C5;margin-left:3px">{{starCount}}</span>
              </p>
              <p style="color:#94A5C5;margin-left:3px">借款金额</p>
              <p class="money">￥
                <span>{{item.FMoney}}</span>
              </p>
              <div class="extend">
                <p class="lixi">18.1%&nbsp;1.5%</p>
                <p class="fDay">{{item.FDays}}天</p>
              </div>
            </li>
          </ul>
          <ul v-else class="sort-wrap">
            <li v-for="(item,index) in goodsList" :key="index" @click="goView(item.FInterID)">
              <img v-lazy="item.WebSite" alt>
              <div class="text">
                <h2>{{item.FName}}</h2>
                <p class="weight">重量：{{item.FNumber}}{{item.FUnit}}</p>
                <p class="price">
                  ￥
                  <span>{{item.price}}</span>
                </p>
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
import {
  getSortList,
  getGuaPai,
  getPic,
  getDaiKuanAll,
  getUserInfo
} from "~/api/getData.js";
import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  data() {
    return {
      searchShow:false,//控制搜索弹窗显示
      searchHistory:[],//搜索历史
      starCount: 5,
      searchVal: "",
      active: 1,
      activeItem: 0,//一级分类
      activeItem2:0,//挂牌二级分类
      loading: "",
      sortActive: 0,
      daikuanTypeSort:[],
      goodsSort: [],
      goodsSort2: [],
      goodsList: [],
      searchGoodsList:[],
      daiKuanList:[],//贷款里列表
      postData: {
        FType: "1",
        OrderTime: "",
        OrderPrice: ""
      }
    };
  },
  head: {
    title: "分类"
  },
  async mounted(){
    let searchHistory= await storage.get('searchHistory')
    if (!searchHistory) {
      searchHistory='[]'
    }
    await storage.set('searchHistory',searchHistory);
    this.searchHistory = JSON.parse(searchHistory);
    // console.log('searchHistory',searchHistory);
  },
  watch:{
    searchVal(newVal,oldVal){
      if (newVal) {
        return
      }
      this.searchGoodsList = []
    }
  },
  methods: {
    // 删除历史纪录
    deleteHistory(){
      this.$alert('你确定删除搜索纪录吗？')
        .then(()=>{
          storage.set('searchHistory','[]');
          this.searchHistory=[]
        })
    },
    // 贷款详情页面
    goDetail(FInterID) {
      switch (this.userInfo.UserType) {
        // 普通用户
        case 0:
          break;
        //仓储用户
        case 1:
          break;
        //出借用户
        case 2:
          this.$router.push({
            path: "/daikuanDetail",
            query: { UserID: this.$route.query.UserID, FInterID: FInterID }
          });
          break;
        //贷款用户
        case 3:
          break;
        default:
          break;
      }
    },
    // 贷款
    async selectDaikuan(ID) {
      this.sortActive = "daikuan";
      this.activeItem = ID;
      // 获取贷款列表
    await getDaiKuanAll({
      Data:{
        FType:ID
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        this.daiKuanList = res.data.Data;
      } else {
        console.log("getDaiKuanAll", res.data.Data);
      }
    });
      // this.goodsList = this.daiKuanList;
    },
    // 搜索
    async onSearch() {
      if (!this.searchVal) {
        return;
      }
      //设置历史纪录
      let searchHistory= await storage.get('searchHistory')
      searchHistory= JSON.parse(searchHistory);
      // console.log(searchHistory);
      if(searchHistory.indexOf(this.searchVal) == '-1'){
        searchHistory.push(this.searchVal)
      }
      storage.set('searchHistory',JSON.stringify(searchHistory));
      this.searchHistory=searchHistory
      await getGuaPai({
        Data:{
          FName:this.searchVal
        }
      })
        .then(res=>{
          if (res.data.StatusCode==200) {
            this.searchGoodsList = res.data.Data
          }
        });
    },
    onCancel(){
      this.searchShow=false;
    },
    goView(FInterID) {
      this.$router.push({ path: "/goodsDetail", query: { FInterID } });
    },
    // 选择一级挂牌
    async selectSort(index,ID) {
      console.log(index);
      // let ID;
      this.loading = this.$loading();
      await getSortList({
        Data: {
          ItemParentID: ID
        }
      }).then(res => {
        if (res.data.StatusCode == 200) {
          // console.log(res.data.Data)
          this.goodsSort2 = res.data.Data;
        } else {
          console.log(res.data.Data);
        }
      });
      
      this.activeItem = this.goodsSort2[0].ID;
      // 获取挂牌列表
      await getGuaPai({
        Data: {
          FType: this.activeItem,
          OrderPrice: 0
        }
      }).then(res => {
        this.loading.clear();
        if (res.data.StatusCode == 200) {
          // if (res.data.Data.length) {
          //   }
          this.goodsList = res.data.Data;
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
      this.sortActive = 'guapai'
    },
    // 选择二级挂牌，获取挂牌纪录

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
      this.activeItem2 = ID;
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
      }
    });
    // 获取贷款分类列表
    await getSortList({
      Data:{
        ItemParentID:10
      }
    })
      .then(res=>{
        if (res.data.StatusCode==200) {
          ayData.daikuanTypeSort = res.data.Data
        }
      })
    
    
    await getSortList({
      Data: {
        ItemParentID: 66
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
    // ayData.goodsSort.forEach(async (element, index) => {
    //   ayData.goodsSort[index].child=[];
    //   await getSortList({
    //     Data: {
    //       ItemParentID: element.ID
    //     }
    //   }).then(res => {
    //     if (res.data.StatusCode == 200) {
    //       // console.log(res.data.Data)
    //       ayData.goodsSort[index].child = res.data.Data;
    //     } else {
    //       console.log(res.data.Data);
    //     }
    //   });
    // });
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