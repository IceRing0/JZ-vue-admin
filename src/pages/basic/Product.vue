<template>
  <div class="product">
    <h2>产品管理</h2>

    <el-row>
    <!-- 左侧搜索 -->
      <!-- <el-col :span="20">
        <el-form :inline="true" @keyup.native="loadData">
          <el-form-item>
            <el-input placeholder="请输入名称" v-model="params.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入描述" v-model="params.description"></el-input>
          </el-form-item>
        </el-form>
      </el-col> -->
      <!-- /左侧搜索 -->
      <!-- 右侧按钮 -->
      <el-col :span="4" >
        <el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
        <el-button @click="batchDeleteHandler" type="danger" size="small">批量删除</el-button>
      </el-col>
      <!-- /右侧按钮 -->
    </el-row>
    
    <!-- {{products.list}} -->
   
    <!-- 表格 -->
    <el-table  size="small" :data="products.list" @selection-change="idsChangeHandler" style="text-align:center">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="零食名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="category.name" label="分类"></el-table-column>
      <el-table-column prop="description" label="简介"></el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <template #default="record">
          <a href="" class="el-icon-delete"  @click.prevent = "deleteHandler(record.row.id)"></a> &nbsp;
          <a href="" class="el-icon-edit-outline" @click.prevent = "editHandler(record.row)"></a> &nbsp;
          <a href="" @click.prevent="toDetails(record.row)">详情</a>
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
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <!-- {{form}} -->
      <!-- {{products}} -->
      <el-form :model="form" :rules="rules" ref="productForm">
        <el-form-item label="零食名称" label-width="100px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零食价格" label-width="100px" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零食状态" label-width="100px" prop="status">
          <el-input v-model="form.status" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" label-width="100px" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择活动区域">
            <el-option v-for="item in categories.list" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="介绍" label-width="100px" prop="description">
          <el-input v-model="form.description" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="零食主图" label-width="100px" prop="photo">
          <el-upload
            class="upload-demo"
            action="http://134.175.154.93:6677/file/upload"
            :file-list="fileList"
            :on-success="uploadSuccessHandler"
            :on-remove="removeHandler"
            :limit=1
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
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
      fileList:[],
      // 向后台提交的数据
      params:{
        page:0,
        pageSize:5
      },
      rules:{
        name: [
          { required: true, message: '请输入零食名称', trigger: 'blur' },
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
    ...mapState("category",["categories"]),
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
      // 跳转到零食详情页面
      this.$router.push({
        path:'/basic/DetailsProduct',
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
    dialogCloseHandler(){
      this.$refs.productForm.clearValidate();
      this.closeModal();
      this.fileList=[]
    },
    toAddHandler(){
      this.form = {};
      this.setTitle("添加产品信息")
      this.showModal();
    },
    // 将图片地址放到接口中可供查看
    uploadSuccessHandler(response){
      // 获取返回值中的id，然后将id设置到表单中product
      if(response.status === 200){
        let id = response.data.id;
        let photo = "http://134.175.154.93:8888/group1/"+id;
        this.form.photo = photo;
        // 克隆
        this.form = Object.assign({},this.form);
      } else {
        this.$message.error("上传异常！");
      }
    },
    removeHandler(){
      this.form.photo="";
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
      // 将当前行的信息绑定form
      this.form = row;
      this.fileList.push({name:"old",url:row.photo});
      this.setTitle("修改零食信息");
      this.showModal();
    }
  }
}
</script>
<style scoped>

</style>
