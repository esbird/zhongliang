<template>
  <van-popup
    v-model="show"
    :close-on-click-overlay="false"
    position="bottom"
    class="van-sku-container"
  >
    <!-- header -->
    <div class="van-hairline--bottom van-sku-header">
      <div class="van-sku-header__img-wrap">
        <img :src="selectGoodsImg">
      </div>
      <div class="van-sku-header__goods-info">
        <div class=" van-ellipsis van-sku__price-num">{{selectGoodsName}}</div>
        <div class="van-sku__goods-price">
          <!-- <span class="van-sku__price-symbol">￥</span> -->
          <span class="van-sku__goods-name">堆码高度不超过1.5m</span>
        </div>
        <i class="van-sku__close-icon van-icon van-icon-close" @click="$emit('change',false)"></i>
      </div>
    </div>

    <div class="van-sku-body" style="max-height: 10.1rem;">
      <div class="van-sku-group-container van-hairline--bottom">
        <div class="van-sku-row">
          <div class="van-sku-row__title">钢材类别：</div>
          <span class="van-sku-row__item" @click="selectFun(0,index)" :class="{'van-sku-row__item--active':index==selectedArr[0]}" v-for="(item,index) in baseData.sortLv1Arr" :key="item.ID">{{item.ItemName}}</span>
        </div>
        <div class="van-sku-row">
          <div class="van-sku-row__title">钢材品种：</div>
          <span class="van-sku-row__item" @click="selectFun(1,index)" :class="{'van-sku-row__item--active':index==selectedArr[1]}" v-for="(item,index) in baseData.sortLv2Arr" :key="item.ID">{{item.ItemName}}</span>
        </div>
        <div class="van-sku-row">
          <div class="van-sku-row__title">型号：<span class="van-sku-row__item" style="float:right" @click="showType=true">{{selectedType.value.ItemName}}</span></div>
          <span class="van-sku-row__item" @click="selectFun(2,index)" :class="{'van-sku-row__item--active':index==selectedArr[2]}" v-for="(item,index) in baseData.typeArr" :key="item.ID">{{item.ItemName}}</span>
          <!-- <span class="van-sku-row__item">2</span> -->
        </div>
        <div class="van-sku-row">
          <div class="van-sku-row__title">规格：</div>
          <span class="van-sku-row__item" @click="selectFun(3,index)" :class="{'van-sku-row__item--active':index==selectedArr[3]}" v-for="(item,index) in baseData.sizeArr" :key="item.ID">{{item.ItemName}}</span>
          <!-- <span class="van-sku-row__item">2</span>
          <span class="van-sku-row__item">1</span>
          <span class="van-sku-row__item">2</span>
          <span class="van-sku-row__item">1</span>
          <span class="van-sku-row__item">2</span> -->
        </div>
      </div>
      <div class="van-sku-stepper-stock">
        <div class="van-sku-stepper-container">
          <div class="van-sku__stepper-title">数量：</div>
          <!-- 选择数量 -->
          <van-stepper v-model="count" class="van-sku__stepper"/>
        </div>
      </div>
    </div>
    <!-- 显示按钮 -->
    <div class="van-sku-actions">
      <button class="van-button van-button--primary van-button--normal van-button--bottom-action" @click="submit">
        <span class="van-button__text">确定</span>
      </button>
    </div>
      <van-popup
      v-model="showType"
      :close-on-click-overlay="false"
      position="bottom"
      class="van-sku-container"
    >
    <van-picker
      show-toolbar
      title="选择标准"
      :columns="baseData.typeStandardArr"
      value-key="ItemName"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
    </van-popup>
  </van-popup>
</template>
<script>
import {
  getSortList//获取分类
} from "~/api/getData.js"
export default {
  model: {
    prop: "show",
    event: "change"
  },
  props: {
    show: Boolean,
    defaultImg:{
      type:String,
      default:'https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg'
    },
    baseData:{
      type:Object
    },
    selectedIndex:{
      type:Number
    }
  },
  data() {
    return {
      count: 0,
      showType:false,
      returnData:{
        FEntryID: 1, //货物的分录ID (0,1,2,3,4)
        FNumber: 1, //数量
        FGoodsName: 1, //品种
        FGoodsType: 1,//品种类型 
        guige: 1, //规格
        SecondType: 1,//第二分类 
        xinghaoType: 1, //型号
      },
      selectedArr:[null,null,null,null],
      selectedType:{
        index:null,
        value:{}
      }
    };
  },
  computed:{
    selectGoodsName(){
      if (this.selectedArr[1]===null) {
        return '选择商品'
      }else{
        return this.baseData.sortLv2Arr[this.selectedArr[1]].ItemName || '选择商品'
      }
    },
    selectGoodsImg(){
      if (this.selectedArr[1]===null) {
        return this.defaultImg
      }else{
        return this.baseData.sortLv2Arr[this.selectedArr[1]].WebSite || this.defaultImg
      }
    }
  },
  methods: {
    // 选择 钢材，管材
    async selectFun(pIndex,index){
      if (pIndex==0 && index != this.selectedArr[0]) {
        await getSortList({Data:{
          ItemParentID:this.baseData.sortLv1Arr[index].ID
        }})
          .then(res=>{
            if (res.data.StatusCode==200) {
              this.$set(this.baseData,'sortLv2Arr',res.data.Data)
              this.$set(this.selectedArr,1,null)
            }
          })
      }
      this.$set(this.selectedArr,pIndex,index);
    },
    // 提交
    async submit() {
      // 判断是否为空
      let isOK = true;
      this.selectedArr.forEach(element => {
        if (element===null) {
          isOK = false;
        }
      });
      if (!isOK) {
        this.$toast('请选择完整信息！');
        return;
      }
      this.returnData.FNumber = this.count;
      this.returnData.FGoodsName = this.baseData.sortLv1Arr[this.selectedArr[0]].ItemName;
      this.returnData.FGoodsType = this.baseData.sortLv1Arr[this.selectedArr[0]].ID;
      this.returnData.guigeName = this.baseData.sizeArr[this.selectedArr[3]].ItemName;
      this.returnData.guige = this.baseData.sizeArr[this.selectedArr[3]].ID;
      this.returnData.SecondName = this.baseData.sortLv2Arr[this.selectedArr[1]].ItemName;
      this.returnData.SecondType = this.baseData.sortLv2Arr[this.selectedArr[1]].ID;
      this.returnData.xinghaoName = this.baseData.typeArr[this.selectedArr[2]].ItemName;
      this.returnData.xinghaoType = this.baseData.typeArr[this.selectedArr[2]].ID;
      this.$emit("submit", this.returnData);
      this.$emit("change", false);
    },
    onCancel(){
      this.showType=false;
    },
    async onConfirm(val ,index){
      // console.log(val,index)
      this.selectedType.index = index;
      this.selectedType.value = val;

      // 获取规格分类
      await getSortList({Data:{
        ItemParentID:val.ID
      }})
        .then(res=>{
          if (res.data.StatusCode==200) {
            this.baseData.typeArr = res.data.Data;
          }
          this.$set(this.selectedArr,2,null);
          this.showType= false;
        })
    },
  },
  mounted() {
    // this.selectedArr = [null,null,null,null];
  },
  created() {
    // let index = this.itemArr.indexOf(this.selectedItem);
    this.selectedType.index = 0;
    this.selectedType.value = this.baseData.typeStandardArr[0];

    this.returnData.FEntryID = this.selectedIndex;
  }
};
</script>
<style lang="stylus" scoped>
.van-sku-row ~.van-sku-row
  border-top 1px solid #BCBCBC
  padding-top 5px
</style>


