<template>
    <div>
        <header>身份认证</header>
        <div class="content">
            <p class="desc">嗡嗡作为一个真实、严肃的婚恋平台，我们要求用户完成身份认证。对于以结婚为目的的用户，我们希望创建一个无酒托、婚托的婚恋环境</p>
            <div class="input-wrap">
                <h2>真实姓名</h2>
                <input type="text" name="" id="" v-model="name">
                <h2>身份证</h2>
                <input type="text" v-model='IDNum'>
            </div>
            <div class="section1">
                <h2>上传身份证照片（请务必按照示例上传）</h2>
                <p class="tip">
                    您上传的任何身份证照片等资料，仅供审核使用且他人无法看到，此外，我们会对身份证照片进行安全处理，敬请放心。
                </p>
                <div class="example">
                    <div class="port">
                        <img src="~/static/IDCard01.png" alt="">
                        <span>手持身份证正面照</span>
                    </div>
                    <div class="port">
                        <img src="~/static/IDCard02.png" alt="">
                        <span>身份证正面照</span>
                    </div>
                </div>
                <div class="IDCard-upload">
                    <div class="port">
                        <img src="~static/add-black.png" alt="">
                        <span>上传图片</span>
                        <input type="file" name="" id="">
                    </div>
                    <div class="port">
                        <img src="~static/add-black.png" alt="">
                        <span>上传图片</span>
                        <input type="file" name="" id="">
                    </div>
                </div>
            </div>
        </div>
        <van-button size="large" class="submit">提交</van-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:'scc',
            IDNum:235435
        }
    }
}
</script>

<style lang="stylus">
@import '~assets/styl/identifyCheck.styl'

</style>