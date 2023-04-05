import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
    }

}

const actions = {
    //获取验证码
    async reqGetCode({ commit }, phone) {
        let res = await reqGetCode(phone);
        if (res.code == 200) {
            commit('GETCODE', res.data);
            return 'ok';
        }
        else {
            return Promise.reject(new Error('faile'))
        }
    },

    //用户注册
    async reqUserRegister({ commit }, user) {
        let res = await reqUserRegister(user);
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    //用户登录
    async userLogin({ commit }, data) {
        let res = await reqUserLogin(data);
        if (res.code == 200) {
            commit('USERLOGIN', res.data.token);
            setToken(res.data.token);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }

    },

    //请求用户信息
    async reqUserInfo({ commit }) {
        let res = await reqUserInfo();
        if (res.code == 200) {
            commit('USERINFO', res.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },

    async userLogout({ commit }) {
        let res = await reqLogout();
        if (res.code == 200) {
            commit('CLEAR');
            removeToken();
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'));
        }
    }

}

const getters = {

}


export default {
    state,
    mutations,
    actions,
    getters
}