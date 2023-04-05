import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home'
import search from './Search'
import detail from './Detail'
import shopcart from './ShopCart'
import user from './User'
import trade from './Trade'

Vue.use(Vuex);
// //state:仓库存储数据的地方
// const state = {}
// //mutations，修改仓库存储数据的唯一手段
// const mutations = {}
// //action ,处理action，可以书写自己的业务逻辑，也可以处理异步
// const actions = {}
// //getters ：理解为计算属性，可以简化仓库数据
// const getters = {}

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})