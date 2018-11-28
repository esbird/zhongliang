<template>
  <div id="contacts">
    <ul class="contact-wrap">
      <li>
        <div class="port-left">
          <h2>{{viewData.OtherName || '姓名'}}</h2>
          <p>{{viewData.guanxi || "关系"}}</p>
          <h2>{{viewData.OtherPhone || "XXXXXXXXXXX"}}</h2>
          <span v-if="userInfo.Listguanxi && !userInfo.Listguanxi[0].IsChecked" class="status">审核中</span>
          <img v-else src="~/static/contact-bg.png" class="contact-bg" alt>
        </div>
        <!-- <div class="port-right">
                  <span style="text-align:center">
                      修改<br>
                      联系人
                  </span>
        </div>-->
      </li>
    </ul>
    <van-popup v-model="show" class="contact-edit" :close-on-click-overlay="false">
      <ul>
        <li>
          <img src="~/static/contact-edit.png" class="icon" alt>
          <input type="text" placeholder="请输入联系人姓名" v-model="postData.OtherName">
        </li>
        <li>
          <img src="~/static/phone.png" class="icon" alt>
          <input type="number" placeholder="请输入手机号码" v-model.number="postData.OtherPhone">
        </li>
        <li>
          <img src="~/static/relationship.png" class="icon" alt>
          <input type="text" placeholder="请输入关系" v-model="postData.guanxi">
        </li>
        <button class="save" @click="submit">保存</button>
      </ul>
      <!-- <i class="iconfont icon-cuo close"></i> -->
      <img src="~/static/cancel.png" class="close" alt @click="show=false">
    </van-popup>
    <van-button size="large" class="add" @click="contactEdit" :disabled="userInfo.Listguanxi && !userInfo.Listguanxi[0].IsChecked">修改联系人</van-button>
  </div>
</template>

<script>
import { getUserInfo, postUserGuanxi } from "~/api/getData.js";
import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
import { phoneTest } from "~/api/utils.js";

export default {
  async asyncData({ query, store }) {
    let ayData = {
      UserID: query.UserID,
      postData: {
        UserID: "",
        OtherName: "",
        OtherPhone: "",
        guanxi: ""
      },
      viewData: {
        UserID: "",
        OtherName: "",
        OtherPhone: "",
        guanxi: ""
      }
    };
    await getUserInfo({
      Data: {
        UserID: query.UserID
      }
    }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.userInfo = res.data.Data;
      } else {
        console.error("getUserInfo", res.data.Data);
      }
    });
    // ayData.UserInfo.Listguanxi = ayData.UserInfo.Listguanxi || [{}];
    if (ayData.userInfo.Listguanxi) {
        for (const key in ayData.viewData) {
          if (ayData.viewData.hasOwnProperty(key)) {
            ayData.viewData[key] = ayData.userInfo.Listguanxi[0][key] || "";
          }
        }
    }
    ayData.viewData.UserID = ayData.userInfo.UserID;
    return ayData;
  },
  methods: {
    async contactEdit() {
      for (const key in this.viewData) {
        if (this.viewData.hasOwnProperty(key)) {
          this.postData[key] = this.viewData[key];
        }
      }
      this.show = true;
    },
    async submit() {
      let isOk = true; //判断信息非空无误
      for (const key in this.postData) {
        if (this.postData.hasOwnProperty(key)) {
          isOk = this.postData[key] ? true : false;
        }
      }
      if (!isOk) {
        this.$alert("信息不能为空");
        return;
      }
      isOk = await phoneTest(this.postData.OtherPhone);
      if (!isOk) {
        this.$alert("手机号格式有误");
        return;
      }
      this.show = false;
      const loading = this.$loading();
      await postUserGuanxi({
        Data: this.postData
      }).then(res => {
        loading.clear();
        if (res.data.StatusCode == 200) {
          for (const key in this.viewData) {
            if (this.viewData.hasOwnProperty(key)) {
              this.viewData[key] = this.postData[key];
            }
          }
          this.$alert("信息保存成功！请等待审核通过");
        }
      });
    }
  },
  data() {
    return {
      show: false,
      value: ""
    };
  },
  head: {
    title: "联系人"
  },
  components: {},
  mounted() {
    // storage.set("UserID", this.$route.query.UserID);
    // storage.set("userInfo", this.userinfo);
  }
};
</script>

<style lang='stylus' src="~/assets/styl/contact-edit.styl" scoped>
</style>