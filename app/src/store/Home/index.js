import { reqgetCategoryList, reqGetBannerList, reqFloorList } from "@/api";


const state = {
    categoryList: [],
    bannerList: [],
    floorList: []

}
//mutations，修改仓库存储数据的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },

    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },

    FLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
}
//action ,处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    async categoryList({ commit }) {
        let result = await reqgetCategoryList();
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    async BannerList({ commit }) {
        let res = await reqGetBannerList()
        if (res.code == 200) {
            commit('BANNERLIST', res.data)
        }
    },
    async FloorList({ commit }) {
        let res = await reqFloorList()
        if (res.code == 200) {
            commit('FLOORLIST', res.data)
        }
    }


}
//getters ：理解为计算属性，可以简化仓库数据
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters

}