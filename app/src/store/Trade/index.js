import { reqAddressInfo, reqOrderInfo } from "@/api";
const state = {
    addressList: [],
    orderInfo: {}
};
const mutations = {
    USERADDRESS(state, address) {
        state.addressList = address
    },
    ORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let res = await reqAddressInfo();
        if (res.code == 200) {
            commit('USERADDRESS', res.data
            )
        }
    },

    //获取商品清单
    async getOrderInfo({ commit }) {
        let res = await reqOrderInfo();
        console.log(res);
        if (res.code == 200) {
            commit('ORDERINFO', res.data)
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
};
