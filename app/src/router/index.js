import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router'
import store from '@/store'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    //第一个形参：路由跳转的配置对象（query|params）
    //第二个参数：undefined|箭头函数（成功的回调）
    //第三个参数:undefined|箭头函数（失败的回调）
    if (resolve && reject) {
        //push方法传递第二个参数|第三个参数（箭头函数）
        //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
        originPush.call(this, location, resolve, reject);
    } else {
        //push方法没有产地第二个参数|第三个参数
        originPush.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => { },
            () => { }
        );
    }
};

let router = new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
});

router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    if (token) {
        //登录了想去登录和注册
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        }
        //登录了不去登录和注册 
        else {
            //有用户名
            if (store.state.user.userInfo.name) {
                next()
            } else { //没有用户名
                try {
                    await store.dispatch('reqUserInfo');
                    next();
                } catch (error) {
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }

    }


})


export default router

