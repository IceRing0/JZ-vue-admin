import {get, post_array,post} from '@/http/axios'
export default {
  namespaced:true,
  state:{
    // 向后台提交的数据
    categories:[],
    visible:false,
    title:"添加栏目信息"
  },
  getters:{
    countCategories:(state)=>{
      return state.categories.length;
    },
    // 需要为获取器传递参数的写法
    categoriesStatusFilter:(state)=>{
      return function(status){
        if(status){
          return state.categories.filter(item=>item.status===status)
        } else {
          return state.categories;
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
    // 需要接受一个参数，这个参数就是categories
    refreshCategories(state,categories){
      state.categories = categories;
    }
  },
  actions:{
    // 加载数据
    async findAllCategories(context,params){
      // 查询所有栏目信息
      let response = await post("/category/query",params)
      // 将栏目信息设置到state.categories中
      context.commit("refreshCategories",response.data)
    },
    async deleteCategoryById({dispatch},id){
      // 1. 删除顾客信息
      let response = await get("/category/deleteById?id="+id);
      // 2. 刷新
      dispatch("findAllCategories")
      // 3. 提示成功
      return response;
    },
    async batchDeleteCategories(context,ids){
      // console.log(context);
      // 1. 批量删除
      let response = await post_array("/category/batchDelete",{ids});
      // 2. 分发
      context.dispatch("findAllCategories");
      // 3. 返回结果
      return response;
    },
    async saveOrUpdateCategory({dispatch,commit},payload){
      // 1. 提交请求
      let response = await post("/category/saveOrUpdate",payload)
      console.log(response);
      // 2. 关闭模态
      commit("closeModal");
      // 3. 刷新页面
      dispatch("findAllCategories");
      // 4. 提示成功 react
      return response;
    }
  }
}