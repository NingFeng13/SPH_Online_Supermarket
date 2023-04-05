import { reqGetSearchInfo } from "@/api"

const state = {
    searchList: [],
}
//mutations，修改仓库存储数据的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
//action ,处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async SearchInfo({ commit }, params = {}) {
        let res = await reqGetSearchInfo(params);
        if (res.code == 200) {
            commit('GETSEARCHLIST', res.data)
        }
    }
}
//getters ：理解为计算属性，可以简化仓库数据
const getters = {
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters

}