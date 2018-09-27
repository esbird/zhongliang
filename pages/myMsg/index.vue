<template>
<div>
    <header>我的消息</header>
    <div class="content">
        <div class="section1">
            <div class="port1">
                <img src="~/static/4cfddc6e31ae46d8aa5b33e190060d04.jpg" alt="" class="head-pic">
                <div>
                    <h2>昵称</h2>
                    <p style="color:#A1A1A1">内心独白</p>
                </div>
            </div>
            <div class="port2">
                <p><img src="~static/iLike.png" alt=""><span>99</span></p>
                <p><span>查看告白信息</span><i class="iconfont icon-arrow-left"></i></p>
            </div>
        </div>
    </div>
    <footer-nav></footer-nav>
</div>
</template>
<script>
import FooterNav from '~/components/footer-nav.vue'

export default {
  components: {
      'footer-nav':FooterNav
  }
}
</script>
<style lang="stylus">
@import '~assets/styl/myMsg.styl'
</style>

