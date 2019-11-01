<template>
  <div class="product_details">
    <h2>产品详情</h2>
    <el-button type="primary" size="small" @click="backHandler">返回</el-button><br>
    <div>
        <!-- {{product}} -->
        <p> <strong>产品名称:</strong> {{product.name}} </p> 
        <p> <strong>产品单价:</strong> {{product.price}} </p> 
        <p> <strong>产品介绍:</strong> {{product.description}} </p> 
        <p> <strong>产品主图:</strong> <br>
          <img :src="product.photo" alt="">
        </p> 
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      product:{}
    }
  },
  created(){
    this.product = this.$route.query.product;
    // console.log(this.$route);
  },
  methods:{
    backHandler(){
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped>
    th,td {
        width:250px;
        line-height: 2em;
        text-align: center;

    }
</style>