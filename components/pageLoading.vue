<template>
    <div>
        <van-loading class="page-loading" v-if="loading"/>
    </div>
</template>
<script>
export default {
    data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-loading
    position fixed
    top 50%
    left 50%
    transform translate3d(-50%,-50%,0)
    z-index 100
</style>
