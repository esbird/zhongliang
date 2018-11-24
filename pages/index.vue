<template>
  <div>
    <!-- <header>首页</header> -->
    <!-- 中良科技 -->
    <h2> </h2>
  </div>
</template>

<script>
import { getOpenId, getGuaPai } from "~/api/getData.js";
import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
import axios from "axios";
export default {
  async asyncData({query,store}){
    let ayData={};
    if(query.code){
      await getOpenId({Data:{Code:query.code}}).then(res=>{
        if (res.data.StatusCode==200) {
          // console.log(typeof res.data.Data)
          console.log(res.data.Data.openid);
          ayData.openid = res.data.Data.openid
        }
      });

    }
    return ayData
    // await store.dispatch('updateInfo',{openid:'123456789'})
  },
  async mounted() {
    let openid= await storage.get('openid');
    let UserID = await storage.get('UserID');
    if(openid || this.openid ){
      console.log( 'openid获取成功')
      if(UserID){
        this.$router.push({path:'/home',query:{UserID}})
      }else{
        this.$router.push({path:'/register',query:{openid:openid || this.openid}})
      }
    }else{
      location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx22089e7ded5141bc&redirect_uri=http://zlkj.gmax1.com&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
      // let code ='';
      // await axios
      //   .get("", {})
      //   .then(function(res) {
      //     console.log(res);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    }
  },
  data() {
    return {};
  },
  components: {},
  head: {
    title: "首页"
  },
  methods: {}
};
</script>
<style lang='stylus' scoped>
</style>