<template>
  <div class="order">
    <el-tabs v-model="activeName"  @tab-click="handleClick">
        <!-- 所有订单 -->
        <el-tab-pane label="所有订单" name="one">
          <el-table :data="orderStatusFilter()" size="small" name="first">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="订单总额"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="waiterId" label="员工ID"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"> </el-table-column>
            <el-table-column label="操作" width="100px" align="center">
                <template #default="record">
                  <a href=""  @click.prevent = "toDetails(record.row)">详情</a>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 待支付 -->
        <el-tab-pane label="待支付" name="two"> 
          <el-table :data="orderStatusFilter('待支付')" size="small" name="two">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="订单总额"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="waiterId" label="员工ID"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"> </el-table-column>
            <el-table-column label="操作" width="100px" align="center">
                <template #default="record">
                  <a href=""  @click.prevent = "">详情</a>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 待派单 -->
        <el-tab-pane label="待派单" name="three"> 
          <el-table :data="orderStatusFilter('待派单')" size="small" name="four">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="订单总额"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="waiterId" label="员工ID"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"> </el-table-column>
            <el-table-column label="操作" width="100px" align="center">
                <template #default="record">
                 <a href=""  @click.prevent = "pdHandler(record.row.id)">派单</a>
                 <a href=""  @click.prevent = "">详情</a>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 待接单 -->
        <el-tab-pane label="待接单" name="four">
          <el-table :data="orderStatusFilter('待接单')" size="small" name="three">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="订单总额"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="waiterId" label="员工ID"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"> </el-table-column>
            <el-table-column label="操作" width="100px" align="center">
                <template #default="record">
                  <a href=""  @click.prevent = "qxHandler(record.row.id)">取消派单</a>
                  <a href=""  @click.prevent = "">详情</a>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 待服务 -->
        <el-tab-pane label="待服务" name="five">
          <el-table :data="orderStatusFilter('待服务')" size="small" name="five">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="订单总额"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="waiterId" label="员工ID"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"> </el-table-column>
            <el-table-column label="操作" width="100px" align="center">
                <template #default="record">
                  <a href=""  @click.prevent = "">详情</a>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 待确认 -->
        <el-tab-pane label="待确认" name="six">
          <el-table :data="orderStatusFilter('待确认')" size="small" name="six">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="订单总额"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="waiterId" label="员工ID"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"> </el-table-column>
            <el-table-column label="操作" width="100px" align="center">
                <template #default="record">
                  <a href=""  @click.prevent = "">详情</a>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 已完成 -->
        <el-tab-pane label="已完成" name="seven">
          <el-table :data="orderStatusFilter('已完成')" size="small" name="seven">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="orderTime" label="下单时间"></el-table-column>
            <el-table-column prop="total" label="订单总额"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="waiterId" label="员工ID"></el-table-column>
            <el-table-column prop="customerId" label="顾客ID"></el-table-column>
            <el-table-column prop="addressId" label="地址ID"> </el-table-column>
            <el-table-column label="操作" width="100px" align="center">
                <template #default="record">
                  <a href=""  @click.prevent = "">详情</a>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
    </el-tabs>
    <!-- 派单 -->
    <el-dialog title="选择员工" :visible="visible_pd" @close="closeHandler">
      <!-- {{waiterform}} -->
      <!-- {{waiters}} -->
      <el-form>
         <el-form-item label="员工" label-width ="80px">
           <el-select v-model="waiterform.waiterId" placeholder="请选择员工">
            <el-option v-for="item in waiters" :label="item.realname" :value="item.id" :key="item.id" autocomplete="off"></el-option>
           </el-select>
         </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal" size="small">取 消</el-button>
        <el-button type="primary" @click="submitHandler" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 派单 -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
   data() {
      return {
        activeName:"one",
        waiterform:{}
      };
    },
    created(){
      this.findAllorders();
      this.findAllWaiters()
    },
    computed: {
      ...mapState("order",["orders","waiters","visible_pd"]),  
      ...mapGetters("order",["orderStatusFilter","countOrders"])
    },
    methods: {
      ...mapActions("order",["findAllorders","findAllWaiters","sendOrder","cancelSendOrder"]),
      ...mapMutations("order",["closeModal","showModal"]),
      handleClick(tab,event) {
        this.activeName=tab.name
        //  console.log(tab, event);
      },
      //  派单
      pdHandler(id){
        this.showModal();
        this.waiterform.orderId = id;
      },
      // 取消派单
      qxHandler(id){
        this.cancelSendOrder(id)
        .then((response) => {
          this.$message({type:"success",message:response.statusText});
          this.findAllorders();
        })
      },
      // 提交派单
      submitHandler(){
        this.sendOrder(this.waiterform)
        .then((response) => {
          this.$message({type:"success",message:response.statusText});
          this.closeModal();
          this.findAllorders();
        })
      },
      closeHandler(){
        this.findAllWaiters()
      },
      toDetails(order){
        // 跳转到订单详情页面
        this.$router.push({
          path:'/order/Details',
          query:{order}
        })
      },
    }
}
    
</script>