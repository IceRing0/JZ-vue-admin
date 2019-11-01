<template>
    <div class="customer">
        <!-- 表格 -->
        <el-table :data="customers" size="small">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="telephone" label="电话号码"></el-table-column>
        <el-table-column label="详情" width="100px" align="center">
            <template #default="record">
                <a href="" class="el-icon-tickets" @click.prevent = "toDetails(record.row)"></a>
            </template>
        </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    created(){
        this.findAllCustomers();
    },
    computed:{
        ...mapState("customer",["customers"])
    },
    methods:{
        ...mapActions("customer",["findAllCustomers"]),
        toDetails(customer){
            // console.log(customer);
            // 跳转到顾客详情页面
            this.$router.push({
                path:'/customer/Details',
                query:{customer},
             })
        }
    }  
}
</script>
<style>
   
</style>