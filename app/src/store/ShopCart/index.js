import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'


const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }

}
const actions = {
    // 获取购物车列表的数据
    async getCartList({ commit }) {
        let res = await reqCartList();
        if (res.code == 200) {
            commit('GETCARTLIST', res.data)
        }
    },
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },

    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("faile"));
        }
    },

    deleteAllCheckedCart({ dispatch, getters }) {
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(element => {
            if (element.isChecked == 1) {
                let promise = dispatch('deleteCartListBySkuId', element.skuId);
                promiseAll.push(promise);
            }
        });
        return Promise.all(promiseAll)
    },

    updateAllCartChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
            promiseAll.push(promise)
            // setTimeout(1000);
        });
        return Promise.all(promiseAll);
    },


}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters

}