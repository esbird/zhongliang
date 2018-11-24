<template>
  <div>
    <header>申请出库</header>
    <div class="content">
      <h2 class="van-doc-demo-block__title">出库时间</h2>
      <!-- <van-field v-model="" placeholder="请选择出库时间" disabled  /> -->
      <van-cell title="出库时间" :value="postData.AddTime | dateFormat('YYYY-MM-DD')" is-link @click="showTime=true"/>

      <van-popup v-model="showTime" position='bottom'>
        <van-datetime-picker
          v-model="postData.AddTime"
          type="date"
          :min-date="minDate"
          :show-toolbar="false"
        />
      </van-popup>
      <h2 class="van-doc-demo-block__title"><span>出库数量</span> <span class="lastCount">当前库存：{{dataInfo.FNumber}}{{dataInfo.FUnit}}</span></h2>
      <!-- <van-field v-model.number="postData.FNumber" type="number" placeholder="出库数量" /> -->
      <van-cell title="出库数量" :value="postData.FNumber" is-link @click="showCount=true"/>
      <van-popup v-model="showCount" position="bottom">
        <van-picker :columns="columns" @confirm="onConfirm" @cancel="onCancel" :show-toolbar="true"/>
      </van-popup>

      <h2 class="van-doc-demo-block__title">提交人</h2>
      <van-field v-model="postData.FName" placeholder="提交人" />
      <h2 class="van-doc-demo-block__title">申请描述</h2>
      <textarea name="" class="desc" id="" cols="30" rows="5" placeholder="请输入申请描述" v-model="postData.Intro"></textarea>
      <van-button size="large" style="" class="submit" @click="submit">提交申请</van-button>
    </div>
  </div>
</template>

<script>
import {getZuLinDt,postChuKu} from "~/api/getData.js";
import storage from "~/api/storage.js";
import dayjs from 'dayjs'
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  methods: {
    async submit(){
      let state = true;
      for (const key in this.postData) {
        if (this.postData.hasOwnProperty(key)) {
          if(!this.postData[key])state=false;
          
        }
      }
      if(state){
        this.$dialog.confirm({
          title: '提醒',
          message: '确认提交申请吗？'
        }).then(async () => {
          this.postData.AddTime = dayjs(this.postData.AddTime).format('YYYY-MM-DD');
          // this.postData.AddTime = this.postData.AddTime.valueOf();
          await postChuKu({Data:this.postData}).then(res=>{
            if (res.data.StatusCode==200) {
              this.$dialog.alert({
                title:'提醒',
                message:'申请提交成功'
              }).then(()=>{
                  //点击回调
                  this.$router.back();
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
          message:'请先完善信息！'
        }).then(()=>{
            //点击回调
        })
      }

    },
    onConfirm(value){
      this.showCount = false;
      // console.log(value);
      this.postData.FNumber = value;

    },
    onCancel(){
      this.showCount = false;
    }
  },
  mounted() {
    storage.get('UserID').then(res=>{
       this.postData.UserID =res
    });
  },
  data() {
    return {
      showTime:false,
      minDate:new Date(),
      showCount:false,
    };
  },
  head:{
    title:'申请出库'
  },
  components: {
  },
  async asyncData({query}) {
    let ayData={
      columns:[],
      postData:{
        "UserGoodsID": query.UserGoodsID,   //该订单ID
        "FNumber": '',   //数量
        "UserID": "",
        "FName": "",  //提交人
        "AddTime": new Date(),
        "Intro": ""   //申请描述

      }
    };
    await getZuLinDt({Data:{UserGoodsID:query.UserGoodsID}}).then(res=>{
      if (res.data.StatusCode==200) {
        ayData.dataInfo = res.data.Data
      }
    })
    for(let i =0;i<=ayData.dataInfo.FNumber;i++){
      ayData.columns.push(i);
    }
    return ayData
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
  padding: 0px 15px;
  line-height 40px
.van-cell__left-icon
  font-size 20px
.content
  background #f2f2f2
  height 'calc(100vh - %s)' % 80px
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