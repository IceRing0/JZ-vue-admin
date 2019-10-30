// import request from '@/utils/request'
import {get, post_array,post} from '@/http/axios'
export default {
  namespaced:true,
  state:{
    products:[]
  },
  mutations:{
    // 需要接受一个参数，这个参数就是products
    refreshProducts(state,products){
      state.products = products;
    }
  },
  actions:{
    async findAllProducts(context){
      // 1. 查询所有顾客信息
      let response = await get("/product/findAll");
      // 2. 将顾客信息设置到state.products中
      context.commit("refreshProducts",response.data)
    }
  }
}