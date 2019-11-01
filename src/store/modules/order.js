import {get} from '@/http/axios'

export default {
    namespaced: true,
    state: {
        orders:[],
        visible_pd:false
        // title:"添加订单信息",
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
        }
    },
    getters: {
        countOrders(state){
        return state.orders.length;
        },
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
    actions: {
        //1.查询所有订单信息
        async findAllorders(context){
        let response = await get("/order/findAll");
        context.commit("refreshorders",response.data);
        // console.log(response);
        },
        async sendOrder(context,waiterform){
        await get("/order/sendOrder",waiterform);
        // console.log(response);
        context.commit("orderStatusFilter");
        },
    }
}
