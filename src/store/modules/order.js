import {get} from '@/http/axios'
import moment from 'moment'

export default {
    namespaced: true,
    state: {
        orders:[],
        waiters:[],
        visible_pd:false
    },
    getters: {
        // countOrders(state){
        // return state.orders.length;
        // },
        orderStatusFilter(state){
            return function(status) {
                if (status) {
                    return state.orders.filter(item => item.status === status)
                } else {
                    return state.orders
                }
            }
        }
    },
    mutations: {  
        showModal(state) {
            state.visible_pd = true
        },
        closeModal(state) {
            state.visible_pd = false
        },
        refreshorders(state, orders) {
            state.orders = orders
        },
        refreshWaiters(state,waiters){
            state.waiters = waiters;
        }
    },
    actions: {
        //1.查询所有订单信息
        async findAllorders(context){
            let response = await get("/order/query");
            // 将时间戳转化为时间
            response.data.forEach((item,index)=>{
                // console.log("====",item,index)
                response.data[index].orderTime=moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
            });
            context.commit("refreshorders",response.data);
            // console.log(response);
        },
        // 查找员工信息
        async findAllWaiters(context){
            let response = await get("/waiter/findAll");
            context.commit("refreshWaiters",response.data)
        },
        // 派单
        async sendOrder(context,waiterform){
            let response = await get("/order/sendOrder",waiterform);
            context.commit("refreshWaiters");
            return response
        },
        // 取消派单
        async cancelSendOrder(context,orderId){
            let response = await get("/order/cancelSendOrder?orderId="+orderId);
            context.commit("refreshWaiters");
            return response
        }
    }
}
