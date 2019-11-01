<template>
  <div class="category">
    <h2>分类管理</h2>
      <!-- 按钮 -->
      <div class="btns">
        <el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
        <el-button @click="batchDeleteHandler" type="danger" size="small">批量删除</el-button>
      </div>
      <!-- /按钮 -->
      <!-- {{categories}} -->
    <!-- 表格 -->
    <el-table  size="small" :data="categories.list" @selection-change="idsChangeHandler" style="text-align:center">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column prop="num" label="数量"></el-table-column>
      <el-table-column prop="icon" label="图片">
        <template #default="record">
            <img :src="record.row.icon" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <template #default="record">
          <a href="" class="el-icon-delete"  @click.prevent = "deleteHandler(record.row.id)"></a> &nbsp;
          <a href="" class="el-icon-edit-outline" @click.prevent = "editHandler(record.row)"></a> &nbsp;
          <!-- <a href="" @click.prevent="toDetails(record.row)">详情</a> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
    <!-- 分页 -->
    <el-pagination
    @current-change="pageChangeHandler"
      layout="prev, pager, next"
      :current-page="params.page+1"
      :page-size="categories.pageSize"
      :total="categories.total">
    </el-pagination>
    <!-- /分页 -->
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <!-- {{form}} -->
      <!-- {{categories}} -->
      <el-form :model="form" :rules="rules" ref="categoryForm">
        <el-form-item label="分类名称" label-width="100px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="100px" prop="num">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px" prop="icon">
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
          { required: true, message: '请输入类别', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        num:[
          { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadData();
  },
  computed:{
    ...mapState("category",["categories","visible","title"]),
    ...mapGetters("category",["countCategories","CategoriesStatusFilter"])
    // 普通属性
  },
  methods: {
    ...mapActions("category",["findAllCategories","deleteCategoryById","saveOrUpdateCategory","batchDeleteCategories"]),
    ...mapMutations("category",["showModal","closeModal","setTitle"]),
    // 普通方法
    loadData(){
      this.findAllCategories(this.params)
    },
    pageChangeHandler(currentPage){
      this.params.page = currentPage-1;
      this.findAllCategories(this.params);
    },
    // toDetails(category){
    //   // 跳转到分类详情页面
    //   this.$router.push({
    //     path:'/basic/DetailsCategory',
    //     query:{category}
    //   })
    // },
    batchDeleteHandler(){
      this.batchDeleteCategories(this.ids)
      .then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    idsChangeHandler(val){
      this.ids = val.map(item => item.id);
    },
    dialogCloseHandler(){
      // this.$refs.categoryForm.clearValidate();
      this.closeModal();
      this.fileList=[]
    },
    // 将图片地址放到接口中可供查看
    uploadSuccessHandler(response){
      // 获取返回值中的id，然后将id设置到表单中product
      // console.log("===",response);
      if(response.status === 200){
        let id = response.data.id;
        let icon = "http://134.175.154.93:8888/group1/"+id;
        this.form.icon = icon;
        // 克隆
        this.form = Object.assign({},this.form);
      } else {
        this.$message.error("上传异常！");
      }
    },
    removeHandler(){
      this.form.icon="";
    },
    toAddHandler(){
      this.form = {};
      this.setTitle("添加分类信息")
      this.showModal();
    },
    submitHandler(){
      // 1.表单验证
      this.$refs.categoryForm.validate((valid)=>{
        if(valid){
          // 2.提交表单
          this.saveOrUpdateCategory(this.form)
          .then((response)=>{
            this.$message({type:"success",message:response.statusText});
          })
        } else {
          return false;
        }
      });
    },
    deleteHandler(id){
      let promise = this.deleteCategoryById(id)
      promise.then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    editHandler(row){
      this.form = row;
      this.setTitle("修改分类信息");
      this.fileList.push({name:"old",url:row.icon});
      this.showModal();
    }
  }
}
</script>
<style scoped>

</style>
