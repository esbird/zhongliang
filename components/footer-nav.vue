<template>
    <div>
        <!-- 底部通栏 -->
    <footer class="ww_bottomTabs">
        <ul>
            <li class="selected">
                <nuxt-link :to="{path:'/',query:{uid:uid}}"><img :src="tabIndex==1?'/love-y.png':'/love.png'"></nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{path:'/activity',query:{uid:uid}}"><img :src="tabIndex==2?'/activity-y.png':'/activity.png'"></nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{path:'/myMsg',query:{uid:uid}}"><img :src="tabIndex==3?'/ms-y.png':'/ms.png'"></nuxt-link>
            </li>
            <li>
                <nuxt-link :to="{path:'/myself',query:{uid:uid}}"><img :src="tabIndex==4?'/me-y.png':'/me.png'"></nuxt-link>
            </li>
        </ul>
    </footer>
    </div>
</template>
<script>
import storage from '~/api/storage.js'
export default {
    props:['tabIndex'],
    data(){
      return{
        uid:''
      }     
    },
    async mounted(){
      let uid = await storage.get('uid');
      // console.log(uid);
      this.uid = uid;
    }
}
</script>

<style lang="stylus" scoped>
.ww_bottomTabs {
  position: fixed;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  border-top: 1px solid #c4c4c8;
  background-color: #f5f7f9;
}
.ww_bottomTabs ul {
  display: flex;
  height 35px
  align-items center
  margin: 5px 0;
  justify-content: space-around;
}
.ww_bottomTabs ul li a img {
  width: 25px;
  height: 25px;
}
.ww_bottomTabs ul li a p {
  font-size: 11px;
  text-align: center;
  color: #7F8389;
}
.ww_bottomTabs ul li.selected p {
  color: #09BB07;
}
</style>

