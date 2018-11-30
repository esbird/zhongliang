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
        <img
          src="https://img.yzcdn.cn/upload_files/2017/02/21/FjKTOxjVgnUuPmHJRdunvYky9OHP.jpg!100x100.jpg"
        >
      </div>
      <div class="van-sku-header__goods-info">
        <div class=" van-ellipsis van-sku__price-num">测试商品</div>
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
          <div class="van-sku-row__title">钢材品种：</div>
          <span class="van-sku-row__item van-sku-row__item--active">天蓝色</span>
        </div>
        <div class="van-sku-row">
          <div class="van-sku-row__title">型号：</div>
          <span class="van-sku-row__item">1</span>
          <span class="van-sku-row__item">2</span>
        </div>
        <div class="van-sku-row">
          <div class="van-sku-row__title">规格：<span class="van-sku-row__item" style="float:right">中国|GB</span></div>
          <span class="van-sku-row__item">1</span>
          <span class="van-sku-row__item">2</span>
          <span class="van-sku-row__item">1</span>
          <span class="van-sku-row__item">2</span>
          <span class="van-sku-row__item">1</span>
          <span class="van-sku-row__item">2</span>
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
      <button class="van-button van-button--primary van-button--normal van-button--bottom-action">
        <span class="van-button__text">确定</span>
      </button>
    </div>
  </van-popup>
</template>
<script>
export default {
  model: {
    prop: "show",
    event: "change"
  },
  props: {
    show: Boolean,
    skuData:{
      type:Object
    }
  },
  data() {
    return {
      index: 0,
      count: 0
    };
  },
  methods: {
    onSelect(item) {
      // this.index = this.itemArr.indexOf(item);
      // this.$emit("bindselect", item, this.selectIndex);
      // this.$emit("change", false);
    }
  },
  created() {
    // let index = this.itemArr.indexOf(this.selectedItem);
    // this.index = index;
  }
};
</script>
<style lang="stylus" scoped>
.van-sku-row ~.van-sku-row
  border-top 1px solid #BCBCBC
  padding-top 5px
</style>


