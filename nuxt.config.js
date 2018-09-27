module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'ww_nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script:[
      {src:'/flexible.js', type: 'text/javascript', charset: 'utf-8'}
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  css:['~assets/css/reset.css','~assets/css/common.css','~static/fonts/iconfont.css'],
  plugins: [{src:'~plugins/vant-ui', ssr: true}],
  /*
  ** Build configuration
  */
  build: {
    loaders:[
      {
        test:/\.(png|jpe?g|gif|svg)$/,
        loader:"url-loader",
        query:{
          limit:10000,
          name:'img/[name].[hash].[ext]'
        }
      },
      
    ],
    postcss: [
      require('postcss-px2rem')({
        remUnit: 75
      })
    ],
    vendor:['vant'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

