<template>
    <div>
        <header>个人资料修改</header>
    <div class="section1">
        <img src="~static/4cfddc6e31ae46d8aa5b33e190060d04.jpg" alt="">
        <div class="percentage_wrap">
            <p>资料完成度80%</p>
            <div class="percentage">
                <p style="width:50%"></p>
            </div>
        </div>
    </div>
    <div class="section2">
        <span>身份认证</span>
        <span>去认证</span>
        <i class="iconfont icon-arrow-right"></i>
    </div>
    <div class="section3">
        <ul>
            <li style="">
                <img src="~static/4cfddc6e31ae46d8aa5b33e190060d04.jpg" alt="">
            <li class="add"><input type="file" name="" id=""></li>
        </ul>
        
    </div>
    <h2 class="title">基本资料</h2>
    <ul class="section4">
        <li class="nickname">
            <p>昵称</p>
            <input type="text" placeholder="昵称">
        </li>
        <li><span>性别</span><span class="value">性别</span></li>
        <li><span>所在城市</span><span class="value">浙江 温州</span></li>
        <li><span>出生日期</span><span class="value">2018-10-20</span></li>
        <li><span>身高</span><span class="value">180cm</span></li>
        <li><span>学历</span><span class="value">本科</span></li>
        <li><span>体重</span><span class="value">22kg</span></li>
        <li><span>购房计划</span><span class="value">购房计划</span></li>
        <li><span>购车计划</span><span class="value">购车计划</span></li>
        <li><span>行业</span><span class="value">IT互联网</span></li>
        <li><span>职位</span><span class="value">职位</span></li>
        <li><span>家乡</span><span class="value">浙江</span></li>
        <li><span>家庭背景</span><span class="value">家庭背景</span></li>
        <li><span>饮酒</span><span class="value">饮酒</span></li>

    </ul>
    <h2 class="title">内心独白</h2>
    <div class="section5">
       <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
    <h2 class="title">对另一半有什么样的小期待</h2>
    <div class="section6">
        <textarea name="" id="" cols="30" rows="10"></textarea>
    </div>
    <h2 class="title">
        择偶条件
    </h2>
    <ul class="section7">
        <li><span>年龄</span><span class="value">18-20</span></li>
        <li><span>身高</span><span class="value">140cm-170cm</span></li>
        <li><span>月收入</span><span class="value">不限</span></li>
        <li><span>学历</span><span class="value">不限</span></li>

    </ul>
    <van-button size="large" class="submit">保存</van-button>
    </div>
</template>
<style lang="stylus">
@import '~assets/styl/baseInfoEdit.styl'
body
  padding-bottom: 80px;
.submit
    position fixed
    bottom 0
    left 0
    height 80px
    font-size 32px
    background #BC8176
    color #fff
</style>

