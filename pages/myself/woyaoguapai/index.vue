<template>
  <div>
    <header>我要挂牌</header>
    <div class="content">
      <h2 class="van-doc-demo-block__title">产品分类</h2>
      <van-cell-group>
        <div  v-for="(item,index) in sortList" :key="index">
          <van-cell   is-link  @click="showSort(index)" arrow-direction="down" :value="selectValueList[index]">
            <span slot='title'>{{'产品分类'+(index+1)}}</span>
          </van-cell>
          <van-popup v-model="showList[index]" position="bottom">
            <van-picker show-toolbar title="" :columns="sortList[index]" value-key="ItemName" :sortLv="index" @cancel="onCancel" @confirm="onConfirm"/>
          </van-popup>
          
        </div>
      </van-cell-group>
      <h2 class="van-doc-demo-block__title">产品名称</h2>
      <van-field v-model="dataInfo.FName" placeholder="请输入产品名称" />
      <h2 class="van-doc-demo-block__title">单位</h2>
      <van-field v-model="dataInfo.FUnit" placeholder="请输入单位" />
      <h2 class="van-doc-demo-block__title">数量</h2>
      <van-field v-model.number="dataInfo.FNumber" type="number" placeholder="请输入数量(数字)" />
      <h2 class="van-doc-demo-block__title">本人联系方式</h2>
      <van-field v-model.number="dataInfo.UserPhone" type="number" placeholder="请输入本人联系方式" />
      <h2 class="van-doc-demo-block__title">产品图片</h2>
      <div class="section3">
        <ul>
          <li style="" v-for="(item,index) in picArr" :key="index" :style="{'background-image':'url('+item.content+')'}">
            <van-icon name="close" class="close" style="" @click="rmvPic(index)" />
          </li>
          <!-- <li ><input type="file" name="" id=""></li> -->
          <li class="add">
            <van-uploader :after-read="uploadFile" multiple  style="width:100%;height:100%">
              <!-- <van-icon name="photograph" /> -->
            </van-uploader>
          </li>
        </ul>
      </div>
      <h2 class="van-doc-demo-block__title">产品描述</h2>
      <textarea name="" class="desc" id="" cols="30" rows="5" placeholder="请输入产品描述" v-model="dataInfo.body"></textarea>
      <h2 class="van-doc-demo-block__title">挂牌价格</h2>
      <van-field v-model.number="dataInfo.price" type="number" placeholder="请输入挂牌价格" />
    </div>
      <van-button size="large" style="" class="submit" @click="submit">提交审核</van-button>
  </div>
</template>
<script>

import { postGuaPai, getSortList ,uploadPic} from "~/api/getData.js";
import {phoneTest} from '~/api/utils.js'
// import storage from "~/api/storage.js";
// import wxPay from "~/api/wxpay.js";
// import axios from "axios";

export default {
  data() {
    return {
      picArr: [],
      showList: [false],
      selectValueList:[],
      selectItemList:[],
      
    };
  },
  async asyncData({ query }) {
    let ayData = {
      sortSelectIndex:0,
      sortList:[],
      dataInfo: {
        FType: "",
        body: "",
        price: "",
        FNumber: "",
        FUnit: "",
        FName: "",
        PicID: "",
        UserPhone: "",
        GoodsNumber: "",
        UserID: query.UserID
      }
    };
    await getSortList({ Data: { ItemParentID: 10 } }).then(res => {
      if (res.data.StatusCode == 200) {
        ayData.sortList[0] = res.data.Data;
      }
    });
    return ayData;
  },
  methods: {
    onCancel(val,idx,sortLv){
      // console.log(sortLv)
      this.$set(this.showList,this.sortSelectIndex,false)
    },
    async onConfirm(val,idx,sortLv){
      console.log(val,idx,this.sortSelectIndex);
      //如果选中的与原来的相同
      if (this.selectValueList[this.sortSelectIndex] == val.ItemName) {
        // 相同
        this.$set(this.showList,this.sortSelectIndex,false)
      }else{
        // 不相同
        this.$set(this.selectValueList,this.sortSelectIndex,val.ItemName);
        this.$set(this.selectItemList,this.sortSelectIndex, val);
        // 清除选项列表
        let sortList = this.sortList.slice(0,this.sortSelectIndex+1);
        this.sortList = sortList;
        // 清除选项值
        let selectValueList = this.selectValueList.slice(0,this.sortSelectIndex+1);
        this.selectValueList = selectValueList;
        let selectItemList = this.selectItemList.slice(0,this.sortSelectIndex+1);
        this.selectItemList = selectItemList;
        // 通过ID查子分类
        await getSortList({Data:{ItemParentID:val.ID}})
          .then(res=>{
            if(res.data.StatusCode==200){
              
              if(res.data.Data.length==0){
                return res
              }else{
                this.$set(this.sortList,this.sortSelectIndex+1,res.data.Data)
                return res;
              }
            }
          })
        // this.
        this.$set(this.showList,this.sortSelectIndex,false)

      }


    },
    showSort(index){
      this.sortSelectIndex = index;//当前选择的分类级别
      this.$set(this.showList,index,true)
    },
    async submit() {
      // 判断分类是否选择
      if(!this.selectValueList[this.sortList.length-1]){
        this.$dialog.alert({
          title:'提醒', 
          message:'请先选择产品分类'
        }).then(()=>{
            //点击回调
        })
        return;
      }
      // 判断手机格式
      if(!phoneTest(this.dataInfo.UserPhone)){
        this.$dialog.alert({
          title:'提醒', 
          message:'手机号格式错误'
        }).then(()=>{
            //点击回调
        })
        return;
      }
      // 判断信息非空
      let info = this.dataInfo;
      info.PicID = 'lsjelijghlseih';
      info.GoodsNumber = (new Date()).valueOf();
      info.FType = this.selectItemList[this.selectItemList.length-1].ID;
      let emptyStatus =true;
      if(!this.picArr.length){
        this.$dialog.alert({
          title:'提醒', 
          message:'至少上传一张照片！'
        }).then(()=>{
            //点击回调
        })
      }else{
        for(let key in info){
          if(info[key]=="")emptyStatus=false;
        }
        if(emptyStatus){
          await this.$dialog.confirm({
            title: '提醒',
            message: '您确定提交审核吗？'
          }).then(async () => {
            // on confirm
            let toast = this.$toast.loading({
              duration: 0,       // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              loadingType: 'spinner',
              message: '加载中'
            });
            let fd = new FormData();
            fd.append('type',1);
            for (let index = 0; index < this.picArr.length; index++) {
              fd.append(`file${index}`,this.picArr[index].file);
            }
            
            await uploadPic(fd).then(res=>{
              if(res.data.StatusCode==200){
                info.PicID = res.data.Data[0].PicID;
              }
            });

            let {data:state}= await postGuaPai({Data:info}).then(res=>{
              if (res.data.StatusCode==200) {
                this.$dialog.alert({
                  title:'提醒', 
                  message:'提交成功！'
                }).then(()=>{
                    //点击回调
                })
              }else{
                this.$dialog.alert({
                  title:'提醒', 
                  message:res.data.Data
                }).then(()=>{
                    //点击回调
                })
              }
              return res;
            })
            toast.clear();
            console.log('state',state)
            if(state.StatusCode==200)this.$router.back();
          }).catch(() => {
            // on cancel
          });
        }else{
          this.$dialog.alert({
            title:'提醒', 
            message:'请填写全部信息！'
          }).then(()=>{
              //点击回调
          })
        }

      }
    },
    async uploadFile(file) {
      console.table(file)
      console.log(typeof file);
      let picArr = this.picArr;
      if(file.length){
        console.log(file)
        picArr = [...picArr,...file]
      }else{
        picArr.push(file);
      }
      this.picArr = picArr;
      // let fd = new FormData();
      // fd.append('file',file);
      // fd.append('type',1);
      // await uploadPic()
    },
    rmvPic(index) {
      this.$dialog.confirm({
        title: '提醒',
        message: '您确定要删除这张照片吗？'
      }).then(() => {
        let picArr = this.picArr;
        picArr.splice(index,1);
        this.picArr = picArr
      }).catch(() => {
        // on cancel
      });

    }
  },
  head: {
    title: "我要挂牌"
  },
  components: {}
};
</script>

<style lang='stylus' scoped>
.desc {
  width: 350px;
  height: 110px;
  border-radius: 7.5px;
  color: #949494;
  padding: 11px;
  font-size: 14px;
  margin: 0 auto;
  display: block;
}

.submit {
  color: #fff;
  background: #003366;
  font-weight: bold;
  position: fixed;
  bottom: 0;
  left: 0;
}

.van-doc-demo-block__title {
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  color: #000;
  padding: 15px 15px 15px;
}

.van-cell__left-icon {
  font-size: 20px;
}

.content {
  background: #f2f2f2;
  padding-bottom: 70px;
}

.section1 {
  width: 100%;
  height: 150px;
  background: url('~/static/center-bg.png') no-repeat top center / cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  // margin-bottom 20px
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #fff;
  }

  span {
    font-size: 16px;
    margin-top: 10px;
    color: #fff;
  }
}

.section3 {
  // height 2.(5px/2)
  background: #fff;
  // box-sizing: border-box
  padding: 10px;
  display: flex;

  // margin-top: (10px/2)
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      box-sizing: border-box;
      width: (130px / 2);
      height: (130px / 2);
      border-radius: (10px / 2);
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      margin: (20px / 2);
      text-align: center;
      position: relative;
      box-shadow: 0 0 3px #797979;

      .close {
        position: absolute;
        right: 0;
        top: 0;
        color: #fff;
        background: red;
        border-radius: 50%;
        font-size: 20px;
        transform: translate3d(50%, -50%, 0);
      }

      img {
        height: 100%;
        width: auto;
      }

      &.add {
        background: url('~static/add-gray.png') no-repeat center / 37px 37px;
        border: (2px / 2) solid #BCBCBC;

        input[type=file] {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }
}
</style>