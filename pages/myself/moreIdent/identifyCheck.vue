<template>
  <div>
    <!-- <header>身份认证</header> -->
    <div class="content">
      <div class="input-wrap">
        <h2>真实姓名</h2>
        <input type="text" name id v-model="postData.RealName">
        <h2>身份证</h2>
        <input type="text" v-model="postData.IdCard">
      </div>
      <div class="section1">
        <h2>上传身份证照片（请务必按照示例上传）</h2>
        <p class="tip">您上传的任何身份证照片等资料，仅供审核使用且他人无法看到，此外，我们会对身份证照片进行安全处理，敬请放心。</p>
        <div class="example">
          <div class="port">
            <img src="~/static/IDCard01.png" alt>
            <span>身份证正面照</span>
          </div>
          <div class="port">
            <img src="~/static/IDCard02.png" alt>
            <span>身份证反面照</span>
          </div>
        </div>
        <div class="IDCard-upload">
          <div
            class="port"
            :style="{'background-image':'url('+pic1+')'}"
            :class="{'color-white':pic1}"
          >
            <!-- <input type="file" name="" id=""> -->
            <van-uploader :after-read="onRead1">
              <!-- <img src="~static/add-black.png" alt=""> -->
              <van-icon name="add-o" style="font-size:30px"/>
              <!-- <van-icon name="photograph" /> -->
            </van-uploader>
            <span>上传图片</span>
          </div>
          <div
            class="port"
            :style="{'background-image':'url('+pic2+')'}"
            :class="{'color-white':pic2}"
          >
            <van-uploader :after-read="onRead2">
              <van-icon name="add-o" style="font-size:30px"/>
              <!-- <img src="~static/add-black.png" alt=""> -->
            </van-uploader>
            <span>上传图片</span>
          </div>
        </div>
      </div>
    </div>
    <van-button size="large" class="submit" @click="submit">提交</van-button>
  </div>
</template>
<script>
import {postUserIdCard,uploadPic} from '~/api/getData.js'
import {idCardTest} from '~/api/utils.js'
export default {
  data() {
    return {
      // name: "",
      // IDNum: "",
      pic1: "",
      picFile1: "",
      pic2: "",
      picFile2: "",
      uid:'',
      
    };
  },
  head:{
    title:'上传身份证'
  },
  methods: {
    onRead1({ file, content }) {
      // console.log(file)
      // console.log(content)
      this.pic1 = content;
      this.picFile1 = file;
    },
    onRead2({ file, content }) {
      // console.log(file)
      // console.log(content)
      this.pic2 = content;
      this.picFile2 = file;
    },
    async submit() {
      if(!this.postData.RealName){
        // this.$toast.fail('姓名不能为空')
        this.$alert('姓名不能为空');
        return;
      }else if (
        !this.postData.IdCard ||
        !idCardTest(this.postData.IdCard)
      ) {
        this.$alert('身份证号格式错误');
        return;
      }else if(!this.pic1 || !this.pic2){
        this.$alert('请上传身份证');
      }else{
        let uplState = 0;
        const toast = this.$loading();
        // 上传身份照片
        let fd = new FormData();
        // fd.append('uid',this.uid);
        fd.append('Type',1);
        fd.append('file',this.picFile1)
        await uploadPic(fd).then(res=>{
          if(res.data.StatusCode==200){
            uplState =1;
            this.postData.IdCardPicID = res.data.Data[0].PicID
          }
        });
        
        // 上传身份照片
        let fd1 = new FormData();
        // fd1.append('uid',this.uid);
        fd1.append('Type',1);
        fd1.append('file',this.picFile2)
        await uploadPic(fd1).then(res=>{
          if(res.data.StatusCode==200){ 
            uplState=2;
            this.postData.IdCardPicID2 = res.data.Data[0].PicID
          } 
        });
        // 上传身份证信息
        await postUserIdCard({Data:this.postData}).then(res=>{
          if(res.data.StatusCode==200){
            uplState =3
          }
        })
        toast.clear();
        if(uplState==3){
          // await this.$toast.success('身份信息上传成功');
          this.$alert('上传成功，请等待后台审核结果').then(()=>{
            this.$router.back();
          })
        }else{
          // this.$toast.fail('上传失败')
          this.$dialog.alert({
            title:'提醒',
            message:'上传失败'
          }).then(()=>{
              //点击回调
          })
        }
      }
    }
  },
  async asyncData({query}){
    
    return{
      postData:{
        IdCard:'',
        UserID:query.UserID,
        RealName:'',
        IdCardPicID:'',
        IdCardPicID2:'',
      }
    }
    // this.uid = this.$route.query.uid
  }
};
</script>

<style lang="stylus" src="~/assets/styl/identifyCheck.styl" scoped>
          

       

                                  

                         

                              

                     

                                                  

                    

                                           

            

                            

                                   

                                                                                

                             

                            

                                                 

                               

                

                            

                                                 

                               

                

              

                                   

              

                        

                                                         

                                         

           

                                                      

                                                

                                                               

                                                             

                                                     

                           

                             

                

              

                        

                                                         

                                         

           

                                                

                                                             

                                                               

                           

                             

                

              

            

          

                                                                           

        

           

        

                                                         

                

          

            

               

                

               

                   

               

                   

            

      

    

        

                 

    

            

                                

                          

                             

                          

                           

      

                                

                          

                             

                          

                           

      

                    

          

                      

                                                                                        

                    

         

         

                                     

               

                           

                                  

               

                                         

                                   

            

                         

                                           

                                          

                                      

                                 

                        

           

                                

                                  

                                         

                                       

                                        

                                                   

           

                                 

                                   

                                     

                                        

                                         

                                                    

           

                              

                       

                              

                                

                        

                                       

                       

           

          

                      

                        

                                                   

                                    

                         

                                

                         

                      

                                  

              

              

                                     

                              

                       

                          

                       

                    

            

         

       

     

    

                           

                               

                                       

   

  

         



                                                                   

          



       



                                  



                         



                              



                     



                                                  



                    



                                           



            



                            



                                   



                                                                                



                             



                            



                                                 



                               



                



                            



                                                 



                               



                



              



                                   



              



                        



                                                         



                                         



           



                                                      



                                                



                                                               



                                                             



                                                     



                           



                             



                



              



                        



                                                         



                                         



           



                                                



                                                             



                                                               



                           



                             



                



              



            



          



                                                                           



        



           



        



                                                         



                



          



            



               



                



               



                   



               



                   



            



      



    



        



                 



    



            



                                



                          



                             



                          



                           



      



                                



                          



                             



                          



                           



      



                    



          



                      



                                                                                        



                    



         



         



                                     



               



                           



                                  



               



                                         



                                   



            



                         



                                           



                                          



                                      



                                 



                        



           



                                



                                  



                                         



                                       



                                        



                                                   



           



                                 



                                   



                                     



                                        



                                         



                                                    



           



                              



                                                                               



                                       



                       



           



          



                      



                        



                                                   



                                    



                         



                                



                         



                      



                                  



              



              



                                     



                              



                       



                          



                       



                    



            



         



       



     



    



                           



                               



                                       



   



  



         







                                                                   



          







       







                                  







                         







                              







                     







                                                  







                    







                                           







            







                            







                                   







                                                                                







                             







                            







                                                 







                               







                







                            







                                                 







                               







                







              







                                   







              







                        







                                                         







                                         







           







                                                      







                                                







                                                               







                                                             







                                                     







                           







                             







                







              







                        







                                                         







                                         







           







                                                







                                                             







                                                               







                           







                             







                







              







            







          







                                                                           







        







           







        







                                                         







                







          







            







               







                







               







                   







               







                   







            







      







    







        







                 







    







            







                                







                          







                             







                          







                           







      







                                







                          







                             







                          







                           







      







                    







          







                      







                                                                                        







                    







         







         







                                     







               







                           







                                  







               







                                         







                                   







            







                         







                                           







                                          







                                      







                                 







                        







           







                                







                                  







                                         







                                       







                                        







                                                   







           







                                 







                                   







                                     







                                        







                                         







                                                    







           







                              







                                                                               







                                       







                       







           







          







                      







                        







                                                   







                                    







                         







                                







                         







                      







                                  







              







              







                                     







                              







                       







                          







                       







                    







            







         







       







     







    







                           







                               







                                       







   







  







         















                                                                   







          















       















                                  















                         















                              















                     















                                                        















                    















                                           















            















                            















                                   















                       















                                                               















            















                             















                            















                                                    















                               















                















                            















                                                    















                               















                















              















                                   















                                                                                                        















                                                      















                                                















                                                               















                                                              















                                                     















                           















                             















                















                                                                                                        















                                                















                                                              















                                                               















                           















                             















                















              















            















          















                                                                           















        















           















        















                                                         















                















          















            















               















                















               















                   















               















                   















            















      















    















        















                 















    















            















                                















                          















                             















                          















                           















      















                                















                          















                             















                          















                           















      















                    















          















                      















                                                                                        















                    















         















         















                                     















               















                           















                                  















               















                                         















                                   















            















                         















                                           















                                          















                                      















                                 















                        















           















                                















                                  















                                         















                                       















                                        















                                                   















           















                                 















                                   















                                     















                                        















                                         















                                                    















           















                                                                                             















                                       















                       















           















          















                      















                        















                                                   















                                    















                         















                                















                         















                      















                                  















              















              















                                     















                              















                       















                          















                       















                    















            















         















       















     















    















                           















                               















                                       















   















  















         































                                                                   















          































         































                             































                             































                                                                                             































                                    































                             































                                                                































                            































                                                   































                  































                                  































                                           































                               































                                                                         































                    































                                     































                                      































                                                                































                                             































                          































                                      































                                                                































                                           































                          































                      































                                           































                                                                                                                  































                                                                  































                                                            































                                                                           































                                                                          































                                                                 































                                       































                                         































                          































                                                                                                                  































                                                            































                                                                          































                                                                           































                                       































                                         































                          































                      































                  































              































                                                                               































          































           































        































                































           































               































                    































                     































                    































                        































                    































                        































         































      































             































                              































                            































                               































                          































                            































        































                              































                            































                               































                          































                            































        































               































                                                                                                                       































                                 































                             































             































       































     































 































         































































                                                                   































// @import ''































































</style>