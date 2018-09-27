<template>
    <div>
    <header>个人中心</header>
    <div class="brief-wrap">
        <img src="" alt="">
        <p>name</p>
        <button>查看/修改我的卡片</button>
    </div>
    <ul class="menu">
        <li class="menu_item"><img src="~static/account.png" alt=""><span>我的账户</span><i class="iconfont icon-arrow-right"></i></li>
        <li class="menu_item"><img src="~static/wechat.png" alt=""><span>我的微信</span><i class="iconfont icon-arrow-right"></i></li>
    </ul>
    <ul class="menu">
        <li class="menu_item"><img src="~static/iLike.png" alt=""><span>我喜欢的</span><i class="iconfont icon-arrow-right"></i></li>
        <li class="menu_item"><img src="~static/myUnlocked.png" alt=""><span>我解锁的</span><i class="iconfont icon-arrow-right"></i></li>
        <li class="menu_item"><img src="~static/myAdv.png" alt=""><span>意见反馈</span><i class="iconfont icon-arrow-right"></i></li>
    </ul>
    <ul class="menu">
        <li class="menu_item"><img src="~static/notif.png" alt=""><span>通知</span><i class="iconfont icon-arrow-right"></i></li>
    </ul>
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
@import '~assets/styl/myself.styl'
body
    padding-bottom: 112px;

</style>


