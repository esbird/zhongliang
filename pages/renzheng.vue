<template>
  <div class="content">
    <header>{{computedHeader}}</header>
    <van-cell-group>
      <van-field :label="$route.query.type=='1'?'货物来源':'资金来源：'"  v-model="postData.FSourceName"  @click="show=true" readonly placeholder="请选择" is-link/>
      <van-popup v-model="show" position="bottom">
        <van-picker :columns="dicArr" value-key="ItemName" show-toolbar @cancel="onCancel" @confirm="onConfirm" />
      </van-popup>


      <van-field label="银行卡号：" v-model="postData.BankCard" placeholder="请输入银行卡账号"/>
      <van-field label="您的姓名：" v-model="postData.FName" placeholder="银行登记姓名"/>
      <!-- <van-field label="手机号码：" v-model="postData.FMoneySource"  placeholder="请输入手机号码"/> -->
      <van-field v-model="postData.FPhone" center readonly label="手机号码：" placeholder="请输入手机号码">
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="getMsgCode"
          :disabled="disableSent"
        >{{sendBtnMsg}}</van-button>
      </van-field>
      <van-field label="验证码：" v-model="inputMsgCode" placeholder="请输入收到的验证码"/>
    </van-cell-group>
    <p class="tip">温馨提示：{{computedTip}}</p>
    <van-button size="large" class="submit" @click="submit">提交审核</van-button>
  </div>
</template>
<script>
import { postLevelCheck, getSendMessage, getUserInfo,getSortList } from "~/api/getData.js";
import { phoneTest ,checkBankno} from "~/api/utils.js";
var timer;
export default {
  computed: {
    computedHeader() {
      switch (this.$route.query.type) {
        case '1':
          return "申请仓储用户";
          break;
        case '2':
          return "申请出借人";
          break;
        case '3':
          return "申请贷款用户";
          break;
        default:

          break;
      }
    },
    computedTip() {
      switch (this.$route.query.type) {
        case '1':
          return "";
          break;
        case '2':
          return "申请成为借出人后，将不能使用贷款业务";
          break;
        case '3':
          return "申请成为贷款用户后，将不能使用放款业务";
          break;
        default:

          break;
      }
    }
  },
  data() {
    return {
      show:false,
      disableSent: false,
      sendBtnMsg: "获取验证码",
      msgCode: "",
      inputMsgCode: ""
    };
  },
  async asyncData({ query }) {
    let ayData = {
      postData: {
        UpLevel: "", //要升级的会员等级
        UserID: "",
        BankCard: "",
        FName: "",
        FPhone: "",
        FSource: "",
        FSourceName:'',
        FType: "" //    1  申请仓储用户  2  申请出借人    3 申请贷款用户
      }
    };
    let dicNum;
    switch (query.type) {
      case '1':
        dicNum= 50;
        break;
      case '2':
        dicNum= 19;
        break;
      case '3':
        dicNum= 51;
        break;
      default:

        break;
    }
    // 获取来源基础资料
    await getSortList({
      Data:{
        ItemParentID:dicNum
      }
    })
      .then(res=>{
        if (res.data.StatusCode==200) {
          ayData.dicArr = res.data.Data
        }
      })

    await getUserInfo({
      Data: {
        UserID: query.UserID
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.userInfo = res.data.Data;
      }
    });
    ayData.postData.FPhone = ayData.userInfo.UserPhone;
    ayData.postData.UserID = ayData.userInfo.UserID;
    ayData.postData.UpLevel = query.type;
    ayData.postData.FType = query.type;
    return ayData;
  },
  methods: {
    onCancel(val,idx){
      // console.log(val,idx)
      this.show = false;
    },
    onConfirm(val,idx){
      // console.log(val,idx)
      this.postData.FSourceName = val.ItemName;
      this.postData.FSource = val.ID;
      this.show = false;
    },
    async submit() {
      // 判断信息非空
      if (
        this.postData.BankCard &&
        this.postData.FName &&
        this.postData.FPhone &&
        this.postData.FSource
      ) {
      } else {
        this.$alert("请完善信息！");
        return;
      }

      //判断资金来源
      let {data:bankStatus} = await checkBankno(this.postData.BankCard)
      if (!bankStatus.validated) {
        this.$alert("银行卡格式错误！");
        return;
      }




      if (this.inputMsgCode != this.msgCode) {
        this.$alert("验证码错误！");
        return;
      }
      await postLevelCheck({
        Data:this.postData
      })
        .then(res=>{
          if (res.data.StatusCode==200) {
            this.$alert('申请成功，等待后台审核！').then(()=>{
              this.$router.replace({path:'/home',query:{UserID:this.$route.query.UserID}})
            })
          }else{
            console.log('postLevelCheck',res.data.Data)
          }
        })
    },
    async getMsgCode() {
      if (!phoneTest(this.postData.FPhone)) {
        this.$alert("手机号格式错误！");
        return;
      }
      let loading = this.$loading();
      await getSendMessage({
        Data: { UserPhone: this.postData.FPhone }
      }).then(res => {
        loading.clear();
        if (res.data.StatusCode == 200) {
          this.msgCode = res.data.Data;
          this.disableSent = true;
          let count = 60;
          timer = setInterval(() => {
            count--;
            this.sendBtnMsg = count + "s";
            if (count == 0) {
              clearInterval(timer);
              this.sendBtnMsg = "重发验证码";
              this.disableSent = false;
            }
          }, 1000);
          this.$alert("发送成功").then(() => {
            //点击回调
          });
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.content
  height 100vh
  background #f2f2f2
.submit
  position fixed
  bottom 0
  left 0
  background #003366
  color #fff
.tip
  font-size 12px
  color #868686
  padding 10px
</style>

