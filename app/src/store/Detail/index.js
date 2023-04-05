import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    uuid: getUUID(),

}
const mutations = {
    "GETGOODINFO"(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
}

const actions = {
    async reqGoodsInfo({ commit }, skuId) {
        let res = await reqGoodsInfo(skuId);
        if (res.code == 200) {
            commit('GETGOODINFO', res.data);
        }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
        //不需要在三连环（仓库存储数据了）
        //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            //返回的是成功的标记
            return "ok";
        } else {
            //返回的是失败的标记
            return Promise.reject(new Error("faile"));
        }
    },
}
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}