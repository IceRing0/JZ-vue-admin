<template>
  <div class="product_details">
    <h2>订单详情</h2>
    <el-button type="primary" size="small" @click="backHandler">返回</el-button><br>
    <!-- {{order.customer}} -->
    <div class="customer">
        <p> <strong>顾客id:</strong> {{order.customer.id}} </p> 
        <p> <strong>顾客电话:</strong> {{order.customer.telephone}} </p> 
        <p> <strong>顾客密码:</strong> {{order.customer.password}} </p>
        <p> <strong>顾客姓名:</strong> {{order.customer.realname}} </p>  
        <p> <strong>顾客头像:</strong> <br>
          <img :src="order.customer.photo" alt="">
        </p> 
    </div>
    <br>
    {{order}}
    <!-- <div class="waiter">
        <p> <strong>员工id:</strong> {{order.waiter.id}} </p> 
        <p> <strong>员工电话:</strong> {{order.waiter.telephone}} </p> 
        <p> <strong>员工密码:</strong> {{order.waiter.password}} </p>
        <p> <strong>员工姓名:</strong> {{order.waiter.realname}} </p>  
    </div> -->
    <br>
    <div class="address">
        <p> <strong>地址id:</strong> {{order.address.id}} </p> 
        <p> <strong>省份:</strong> {{order.address.province}} </p> 
        <p> <strong>城市:</strong> {{order.address.city}} </p>
        <p> <strong>县区:</strong> {{order.address.area}} </p> 
        <p> <strong>地址:</strong> {{order.address.address}} </p>
        <p> <strong>电话:</strong> {{order.address.telephone}} </p>  
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      order:{}
    }
  },
  created(){
    this.order = this.$route.query.order;
    console.log(this.order);
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