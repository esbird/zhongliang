<template>
  <div>
    <header>放款申请</header>
    <div class="content">
      <h2 class="van-doc-demo-block__title">放款金额(￥)</h2>
      <van-field v-model.number="dataInfo.FMoney" type="number" placeholder="请输入放款金额" />
      <h2 class="van-doc-demo-block__title">放款时长（天）</h2>
      <van-field v-model.number="dataInfo.FDay" type="number" placeholder="请输入放款天数" />

      <h2 class="van-doc-demo-block__title">提交人</h2>
      <van-field v-model="dataInfo.FName" placeholder="提交人" />

      <h2 class="van-doc-demo-block__title">联系电话</h2>
      <van-field v-model.number="dataInfo.UserPhone" type="number" placeholder="联系电话" />
      <van-button size="large" style="" class="submit" @click="submit">确认</van-button>
    </div>
  </div>
</template>

<script>
import {postFangkuan} from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  methods: {
    async submit(){
      // 判断非空
      let resultState = true;
      for (const key in this.dataInfo) {
        if (this.dataInfo.hasOwnProperty(key)) {
          if(!this.dataInfo[key]){
            resultState=false;
          }
        }
      }
      if(resultState){
        this.$dialog.confirm({
          title: '提醒',
          message: '您确定提交申请吗？'
        }).then( async () => {
          // let loading= this.$loading();
          await postFangkuan({Data:this.dataInfo}).then(res=>{
            // loading.clear();
            if (res.data.StatusCode==200) {
              this.$dialog.alert({
                title:'提醒', 
                message:'申请成功'
              }).then(()=>{
                  this.$router.back();
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
          // on confirm
        }).catch(() => {
          // on cancel
        });

      }else{
        this.$dialog.alert({
          title:'提醒', 
          message:'请完善信息！'
        }).then(()=>{
            //点击回调
        })
      }
    },
  },
  data() {
    return {

    };
  },
  head:{
    title:'中良科技'
  },
  components: {
  },
  async asyncData({query}) {
    let ayData={
      UserID:query.UserID,
      dataInfo: {
        "UserID": query.UserID,
        "FMoney": "",
        "FDay": "",
        "FName": "",
        "UserPhone": ""
      }
    }
    return ayData;
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
  min-height 'calc(100vh - %s)' % 90px
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