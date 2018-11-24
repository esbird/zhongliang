<template>
  <div>
    <header>编辑产品</header>
    <div class="content">
      <h2 class="van-doc-demo-block__title">产品分类</h2>
        <van-cell-group>
          <van-cell title="产品分类" is-link arrow-direction="down" value="产品分类">
          </van-cell>
          <van-cell title="详细分类" is-link arrow-direction="down" value="详细分类">
          </van-cell>
        </van-cell-group>
      <h2 class="van-doc-demo-block__title">产品名称</h2>
      <van-field v-model="dataInfo.FName" placeholder="请输入产品名称" />
      <h2 class="van-doc-demo-block__title">单位</h2>
      <van-field v-model="dataInfo.FUnit" placeholder="请输入单位" />
      <h2 class="van-doc-demo-block__title">数量</h2>
      <van-field v-model="dataInfo.FNumber" placeholder="请输入数量" />

      <h2 class="van-doc-demo-block__title">本人联系方式</h2>
      <van-field v-model="dataInfo.UserPhone" placeholder="请输入本人联系方式" />
      <h2 class="van-doc-demo-block__title">产品图片</h2>
      <div class="section3">
        <ul>
          <li style="" v-for="(item,index) in picArr" :key="index" :style="{'background-image':'url('+item.imgURL+')'}">
            <van-icon name="close" class="close" style="" @click="rmvPic(item.id,index)" />
          </li>
          <!-- <li ><input type="file" name="" id=""></li> -->
          <li class="add">
            <van-uploader :after-read="uploadFile">
              <!-- <van-icon name="photograph" /> -->
            </van-uploader>
          </li>
        </ul>
      </div>
      <h2 class="van-doc-demo-block__title">产品描述</h2>
      <textarea name="" class="desc" id="" cols="30" rows="5" placeholder="请输入产品描述" v-model="dataInfo.body"></textarea>
      <h2 class="van-doc-demo-block__title">挂牌价格</h2>
      <van-field v-model="dataInfo.price" placeholder="请输入挂牌价格"/>
      <van-button size="large" style="" class="submit" @click="submit">确认修改</van-button>
    </div>
  </div>
</template>

<script>
import {postGuaPai} from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  methods: {
    async submit(){

    },
    uploadFile(){

    },
    rmvPic(){}
  },
  data() {
    return {
      picArr:[],
      dataInfo:{
        FInterID:"",
        FType:"",
        body:"",
        price:"",
        FNumber:"",
        FUnit:"",
        FName:"",
        PicID:"",
        UserPhone:'',
        GoodsNumber:'',
        UserID:''
      }
    };
  },
  head:{
    title:'中良科技'
  },
  components: {
  },
  async created() {
  }
};
</script>

<style lang='stylus' scoped>
.desc
  width 350px
  height 110px
  border-radius 7.5px
  color #949494
  padding 11px
  font-size 14px
  margin 0 auto
  display block
.submit
  color #fff;
  background #003366
  font-weight bold
  position fixed
  bottom 0;
  left 0;

.van-doc-demo-block__title
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  color: #000;
  padding: 15px 15px 15px;
.van-cell__left-icon
  font-size 20px
.content
  background #f2f2f2
  padding-bottom 70px
.section1
  width 100%;
  height 150px
  background url('~/static/center-bg.png') no-repeat top center/cover;
  display flex
  flex-direction column
  align-items center
  justify-content center
  // margin-bottom 20px
  img 
    width 60px
    height 60px
    border-radius 50%
    background #fff
  span 
    font-size 16px
    margin-top 10px
    color #fff
// .section2
  // height 'calc(100vh - %s)' % 200px
  // overflow auto
.section3
    // height 2.(5px/2)
    background #fff
    // box-sizing: border-box
    padding:10px
    display: flex
    // margin-top: (10px/2)
    ul
        display flex
        flex-wrap: wrap
        li
            box-sizing: border-box
            width: (130px/2)
            height (130px/2)
            border-radius: (10px/2)
            background-position: center
            background-repeat: no-repeat
            background-size: contain
            margin: (20px/2)
            text-align: center
            position relative
            box-shadow: 0 0 3px #797979
            .close
              position:absolute;
              right:0;
              top:0;
              color:#fff;
              background:red
              border-radius: 50%
              font-size: 20px
              transform: translate3d(50%,-50%,0)
            img 
                height 100%
                width: auto
            &.add
                background url('~static/add-gray.png') no-repeat center /37px 37px
                border: (2px/2) solid #BCBCBC
                input[type=file]
                    width: 100%
                    height 100%
                    opacity 0



</style>