// import request from '@/utils/request'
import {get, post_array,post} from '@/http/axios'
export default {
  namespaced:true,
  state:{
    waiters:[]
  },
  mutations:{
    refreshWaiters(state,waiters){
      state.waiters = waiters;
    }
  },
  actions:{
    async findAllWaiters(context){
      let response = await get("/waiter/findAll");
      context.commit("refreshWaiters",response.data)
    }
  }
}