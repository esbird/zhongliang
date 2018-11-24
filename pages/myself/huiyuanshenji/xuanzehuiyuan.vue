<template>
  <div>
    <header>会员升级</header>
    <div class="content">
      <h2 class="title">选择会员等级</h2>
      <!-- <ul>
        <li>
          <div><span class="time">2018-08-08 14:25</span></div>
          <div><span class="state">审核中</span></div>
        </li>
      </ul> -->
      <van-radio-group v-model="radio">
        <!-- <div class="box">
          <van-radio :name="0">
            <div class="text">
              <span>会员等级1</span>
              <span class="name">挂牌会员</span>
            </div>
          </van-radio>
        </div> -->
        <div class="box" v-if="$route.query.level<1">
          <van-radio :name="1">
            <div class="text">
              <span>会员等级2</span>
              <span class="name">租地会员</span>
            </div>
          </van-radio>
        </div>
        <div class="box" v-if="$route.query.level<2">
          <van-radio :name="2">
            <div class="text">
              <span>会员等级3</span>
              <span class="name">贷款会员</span>
            </div>
          </van-radio>
        </div>
      </van-radio-group>
    </div>
    <van-button size="large" style="" class="submit" @click="submit">提交审核</van-button>
  </div>
</template>
<script>
import { postUserLevel } from "~/api/getData.js";
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";
export default {
  methods: {
    async submit(){
      if (this.radio==0) {
        this.$dialog.alert({
          title:'提醒',
          message:'请选择升级等级'
        }).then(()=>{
            //点击回调
        })
        return;
      }
      let loading = this.$loading();
      await postUserLevel({Data:{
        UserID:this.$route.query.UserID,
        UserType:this.radio
      }})
        .then(res=>{
          loading.clear();
          if(res.data.StatusCode==200){
            this.$dialog.alert({
              title:'提醒',
              message:'提交成功！'
            }).then(()=>{
                //点击回调
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
    }
  },
  data() {
    return {
      radio: 0
    };
  },
  head: {
    title: "中良科技"
  },
  components: {},
  async created() {}
};
</script>
<style lang='stylus' scoped>
.submit
  color #fff;
  background #003366
  font-weight bold
  position fixed
  bottom 0;
  left 0;
.content
  background #f2f2f2
  height 'calc(100vh - %s)' % 80px
  overflow hidden
  .van-radio
    overflow unset
  .title
    text-align center
    font-size 24px
    margin-top 18px
  .box
    display flex
    width 350px
    height 67px
    align-items center
    background #fff
    border-radius 7.5px
    margin:15px auto 0
    padding 8px 12px
    div.text
      height 100%
      display flex
      flex-direction column
      align-items center
      justify-content space-between
      margin-left 100px
      span
        font-size 12px
      .name
        font-size 20px
        margin-top 8px
</style>
