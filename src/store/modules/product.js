import {get, post_array,post} from '@/http/axios'
export default {
  namespaced:true,
  state:{
    // 向后台提交的数据
    products:[],
    categories:[],
    visible:false,
    title:"添加产品信息"
  },
  getters:{
    countProducts:(state)=>{
      return state.products.length;
    },
    // 需要为获取器传递参数的写法
    productStatusFilter:(state)=>{
      return function(status){
        if(status){
          return state.products.filter(item=>item.status===status)
        } else {
          return state.products;
        }
      }
    },
  },
  // 突变
  mutations:{
    // 显示模态框
    showModal(state){
      state.visible = true;
    },
    // 关闭模态框
    closeModal(state){
      state.visible = false;
    },
    // 模态框名称
    setTitle(state,title){
      state.title = title;
    },
    // 需要接受一个参数，这个参数就是products
    refreshProducts(state,products){
      state.products = products;
    },
    // 需要接受一个参数，这个参数就是categories
    refreshCategories(state,categories){
      state.categories = categories;
    }
  },
  actions:{
    // 加载数据
    async findAllProducts(context,params){
      // 查询所有产品信息
      let response = await post("/product/queryProductCascadeCategory",params)
      // 将产品信息设置到state.products中
      context.commit("refreshProducts",response.data)
    },
    async findAllCategories(context){
      // 查询所有栏目信息
      let response = await get("/category/findAll");
      // console.log(response);
      // 将栏目信息设置到state.categories中
      context.commit("refreshCategories",response.data)
    },
    async deleteProductById({dispatch},id){
      // 1. 删除顾客信息
      let response = await get("/product/deleteById?id="+id);
      // 2. 刷新
      dispatch("findAllProducts")
      // 3. 提示成功
      return response;
    },
    async batchDeleteProducts(context,ids){
      // console.log(context);
      // 1. 批量删除
      let response = await post_array("/product/batchDelete",{ids});
      // 2. 分发
      context.dispatch("findAllProducts");
      // 3. 返回结果
      return response;
    },
    async saveOrUpdateProduct({dispatch,commit},payload){
      // 1. 提交请求
      let response = await post("/product/saveOrUpdate",payload)
      // console.log(response);
      // 2. 关闭模态
      commit("closeModal");
      // 3. 刷新页面
      dispatch("findAllProducts");
      // 4. 提示成功 react
      return response;
    }
  }
}