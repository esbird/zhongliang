<template>
<div>
  <header>首页</header>
    <div class="content">
        <van-swipe>
          <van-swipe-item><img class="pic" src="~static/4cfddc6e31ae46d8aa5b33e190060d04.jpg" /></van-swipe-item>
          <van-swipe-item><img class="pic" src="~static/4cfddc6e31ae46d8aa5b33e190060d04.jpg" /></van-swipe-item>
          <van-swipe-item><img class="pic" src="~static/4cfddc6e31ae46d8aa5b33e190060d04.jpg" /></van-swipe-item>
          <van-swipe-item><img class="pic" src="~static/4cfddc6e31ae46d8aa5b33e190060d04.jpg" /></van-swipe-item>
        </van-swipe>
        <ul class="btn-wrap">
            <li><img src="../static/next.png" alt=""></li>
            <li><img src="../static/msg.png" alt=""></li>
            <li><img src="../static/unlock.png" alt=""></li>
            <li><img src="../static/like.png" alt=""></li>
        </ul>
    </div>
    <div class="text-wrap">
        <div class="baseInfo ">
            <p class="clearfix"><span class="nickname">昵称</span><span class="sex iconfont icon-nv"></span><span class="addr"><i class="iconfont icon-zuobiao"></i> 省份 地区</span></p>
            <p class="clearfix brief" style="color:#6B6B6B;line-height:2;margin-top:.2rem"><span class="age">20岁</span><span class="tall">166cm</span><span class="industry">服务业</span></p>
        </div>
        <div class="line"></div>
        <div class="tag-wrap">
            <h2 class="title">基本信息</h2>
            <ul class="baseInfo-tag">
                <li class="tag-item">标签</li>
                <li class="tag-item">标签</li>
                <li class="tag-item">标签</li>
                <li class="tag-item">标签</li>
                <li class="tag-item">标签</li>
                <li class="tag-item">标签</li>
            </ul>
        </div>
        <div class="line"></div>
        <div class="neixindubai">
            <h2 class="title">内心独白</h2>
            <p>ljsljlejinnsiniengnljsljlejinnsiniengnljsljlejinnsiniengnljsljlejinnsiniengnljsljlejinnsiniengn</p>
        </div>
    </div>
    <footer-nav></footer-nav>
</div>
</template>

<script>
import FooterNav from '~/components/footer-nav.vue'
export default {
  data(){
    return{

    }
  },
  components: {
      'footer-nav':FooterNav
  }
};
</script>

<style lang='stylus'>
@import '~assets/styl/index.styl'
body
  padding-bottom: 112px;

.van-swipe-item
    text-align center
.pic
    height 7.5rem
    width auto
    margin 0 auto
</style>