<template>
  <div class="product">
    <h2>产品管理</h2>

    <el-row>
    <!-- 左侧搜索 -->
      <el-col :span="20">
        <el-form :inline="true" @keyup.native="loadData">
          <el-form-item>
            <el-input placeholder="请输入名称" v-model="params.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入描述" v-model="params.description"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- /左侧搜索 -->
      <!-- 右侧按钮 -->
      <el-col :span="4" style="text-align:right">
        <el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
        <el-button @click="batchDeleteHandler" type="danger" size="small">批量删除</el-button>
      </el-col>
      <!-- /右侧按钮 -->
    </el-row>
    
    <!-- {{products.list}} -->
   
    <!-- 表格 -->
    <el-table  size="small" :data="products.list" @selection-change="idsChangeHandler">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="产品名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="category.name" label="所属栏目"></el-table-column>
      <el-table-column prop="description" label="简介"></el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <template #default="record">
          <a href="" class="el-icon-delete"  @click.prevent = "deleteHandler(record.row.id)"></a> &nbsp;
          <a href="" class="el-icon-edit-outline" @click.prevent = "editHandler(record.row)"></a> &nbsp;
          <a href="" @click.prevent="toDetails(record.row)" class="el-icon-warning"></a>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 分页 -->
    <el-pagination
    @current-change="pageChangeHandler"
      layout="prev, pager, next"
      :current-page="params.page+1"
      :page-size="products.pageSize"
      :total="products.total">
    </el-pagination>
    <!-- /分页 -->
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="closeModal">
      <!-- {{form}} -->
      <!-- {{categories}} -->
      <el-form :model="form" :rules="rules" ref="productForm">
        <el-form-item label="产品名称" label-width="100px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品价格" label-width="100px" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品状态" label-width="100px" prop="status">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目" label-width="100px" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择活动区域">
            <el-option v-for="item in category" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介" label-width="100px" prop="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal" size="small">取 消</el-button>
        <el-button type="primary" @click="submitHandler" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data() {
    return {
      form:{},
      // 向后台提交的数据
      params:{
        page:0,
        pageSize:5
      },
      rules:{
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        price:[
          { required: true, message: '请输入价格', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadData();
  },
  computed:{
    ...mapState("product",["products","visible","title"]),
    ...mapGetters("product",["countProducts","ProductStatusFilter"])
    // 普通属性

  },
  methods: {
    ...mapActions("product",["findAllProducts","deleteProductById","saveOrUpdateProduct","batchDeleteProducts"]),
    ...mapMutations("product",["showModal","closeModal","setTitle"]),
    // 普通方法
    loadData(){
      this.findAllProducts(this.params)
    },
    pageChangeHandler(currentPage){
      this.params.page = currentPage-1;
      this.findAllProducts(this.params);
    },
    toDetails(product){
      // 跳转到顾客详情页面
      this.$router.push({
        path:'/product/details',
        query:{product}
      })
    },
    batchDeleteHandler(){
      this.batchDeleteProducts(this.ids)
      .then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    idsChangeHandler(val){
      this.ids = val.map(item => item.id);
    },
    // dialogCloseHandler(){
    //   this.$refs.productForm.clearValidate();
    //   this.closeModal();
    // },
    toAddHandler(){
      this.form = {};
      this.setTitle("添加顾客信息")
      this.showModal();
    },
    submitHandler(){
      // 1.表单验证
      this.$refs.productForm.validate((valid)=>{
        if(valid){
          // 2.提交表单
          this.saveOrUpdateProduct(this.form)
          then((response)=>{
            this.$message({type:"success",message:response.statusText});
          })
        } else {
          return false;
        }
      });
    },
    deleteHandler(id){
      let promise = this.deleteProductById(id)
      promise.then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    editHandler(row){
      this.form = row;
      this.setTitle("修改顾客信息")
      this.showModal();
    }
  }
}
</script>
<style scoped>

</style>
