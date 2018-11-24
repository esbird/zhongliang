import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    baseUrl:'',
    UserID:'99290f55-66b1-46f9-9c76-16db03e1527f',
    openid:'asdaasdf'
  },
  mutations: {

    increment (state) {
      state.counter++
    },
    updateInfo(state,{openid}){
      state.openid = openid
    },
    updateUid(state,{uid}){
      state.uid = uid;
    }
  },
  actions:{
    // 更新用户信息
    async updateInfo({commit},data){
      await commit('updateInfo',data)
    },
    increment (context) {
      context.commit('increment')
    },
    updateUid(context){
      context.commit('updateUid')
    }
  }
})

export default store