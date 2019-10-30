// import request from '@/utils/request'
import {get, post_array,post} from '@/http/axios'
export default {
  namespaced:true,
  state:{
    customers:[]
  },
  mutations:{
    // 需要接受一个参数，这个参数就是customers
    refreshCustomers(state,customers){
      state.customers = customers;
    }
  },
  actions:{
    async findAllCustomers(context){
      // 1. 查询所有顾客信息
      let response = await get("/customer/findAll");
      // 2. 将顾客信息设置到state.customers中
      context.commit("refreshCustomers",response.data)
    }
  }
}