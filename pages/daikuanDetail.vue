<template>
  <div>
    <header>贷款详情</header>
    <div class="content">
      <ul>
        <li>
          <h1>{{daikuanInfo.RealName}}</h1>
          <van-rate v-model="value" :size="15"/>
        </li>
        <li>
          <p class="title">
            <span>借款金额</span>
            <span>年利率</span>
          </p>
          <p class="cont">
            <span class="left">￥
              <span class="money">{{daikuanInfo.FMoney}}</span>
            </span>
            <span class="lixi">18%</span>
          </p>
        </li>
        <li>
          <p class="time">
            <span>借款时间</span>
            <span class="fDay">{{daikuanInfo.FDays}}天</span>
          </p>
        </li>
        <li>
          <p style="justify-content:flex-start;">输入借款金额 <span style="color:#BCBCBC">（请输入10的倍数,且大于等于借款金额80%）</span></p>
          <p style="justify-content:flex-end;" class="input">
            <input type="number"  v-model.number="postData.FMoney">元
          </p>
        </li>
        <li>
          <p>预计到期所得利息</p>
          <p style="justify-content:flex-end;" class="input">
            <input readonly type="text" :value="postData.FMoney*0.18/365*daikuanInfo.FDays | toDecimalAcc(2)">元
          </p>
        </li>
        <p class="xieyi">
          <input type="checkbox" v-model="isArgee" name id="xieyi">
          <label for="xieyi">已阅读并同意</label>
          <a href>《借款协议》</a>
        </p>
      </ul>
    </div>
    <van-button size="large" class="submit" @click="submit">提交审核</van-button>
  </div>
</template>
<script>
import { getDaiKuanSingle, postFangkuan ,getUserInfo} from "~/api/getData.js";
export default {
  data() {
    return {
      value: 5,
      isArgee:false,
      postData:{
        FMoney:0,
        UserID:'',
        bili:'',
        DaikuanID:''
      }
    };
  },
  methods: {
    async submit() {
      if (this.postData.FMoney > this.daikuanInfo.FMoney) {
        this.$alert('金额超出！')
        return ;
      }
      
      if (this.postData.FMoney % 10) {
        this.$alert('金额必须是10的倍数！')
        return ;
      }
      if (!this.isArgee) {
        this.$alert('请先阅读，并同意借款协议！')
        return ;
      }


      this.postData.UserID = this.$route.query.UserID;
      this.postData.DaikuanID = this.daikuanInfo.FInterID;
      this.postData.bili = this.postData.FMoney/this.daikuanInfo.FMoney;



      await postFangkuan({
        Data:this.postData
      })
        .then(res=>{
          if (res.data.StatusCode==200) {
            this.$alert('放款申请成功,请等待后台审核！')
              .then(()=>{
                this.$router.back();
              })
          }else{
            console.log('postFangkuan',res.data.Data)
          }
        })
    }
  },
  async asyncData({ query }) {
    let ayData = {};
    await getUserInfo({
      Data:{
        UserID:query.UserID
      }
    })
      .then(res=>{
        if (res.data.StatusCode==200) {
          ayData.userInfo = res.data.Data;
        }else{
          console.log(res.data.Data)
        }
      })
    /**
     * 
     */
    await getDaiKuanSingle({
      Data: {
        FInterID: query.FInterID
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.daikuanInfo = res.data.Data[0];
      } else {
        console.log("getDaiKuanSingle", res.data.Data);
      }
    });
    return ayData;
  }
};
</script>
<style lang='stylus' src="~/assets/styl/daikuanDetail.styl" scoped>
</style>