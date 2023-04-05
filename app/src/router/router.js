export default
    [
        //个人中心
        {
            path: '/center',
            component: () => import('@/pages/Center'),
            name: 'center',
            meta: { show: true },
            children: [
                {
                    path: 'myorder',
                    component: () => import('@/pages/Center/myOrder'),
                    name: 'myorder'
                },
                {
                    path: 'grouporder',
                    component: () => import('@/pages/Center/groupOrder'),
                    name: 'grouporder'
                }, {
                    //重定向
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ]
        },
        //支付成功页面
        {
            path: '/paysuccess',
            component: () => import('@/pages/PaySuccess'),
            name: 'paysuccess',
            meta: {
                show: true
            },
            beforeEnter: (to, from, next) => {
                if (from.path == '/pay') {
                    next();
                } else {
                    next(false)
                }
            }
        },
        {
            path: '/shopcart',//购物车
            component: () => import('@/pages/ShopCart'),
            meta: {
                show: true
            },
            name: 'shopcart'
        },
        //支付页面
        {
            path: '/pay',
            name: 'pay',
            component: () => import('@/pages/Pay'),
            meta: {
                show: true
            },
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade') {
                    next();
                } else {
                    next(false)
                }
            }
        },
        //结算页面
        {
            path: '/trade',
            name: 'trade',
            component: () => '@/pages/Trade',
            meta: {
                show: true
            },
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopcart') {
                    next();
                } else {
                    next(false)
                }
            }
        },
        //加入购物车成功
        {
            path: '/addcartsuccess',
            name: 'addcartsuccess',
            component: () => import('@/pages/AddCartSuccess'),
            meta: {
                show: true
            }
        },
        {
            path: '/',        // 重定向：项目跑起来时，立马定位到首页
            redirect: '/home'
        },
        {
            path: '/detail/:skuid', //详情页面
            component: () => import('@/pages/Detail'),
            meta: {
                show: true
            }
        },
        {
            path: '/home',
            component: () => import('@/pages/Home'),
            meta: {
                show: true
            }
        },
        {
            path: '/search/:keyword',
            component: () => import('@/pages/Search'),
            meta: {
                show: true
            },
            name: 'search'
        },
        {
            path: '/login',
            component: () => import('@/pages/Login'),
            meta: {
                show: false
            }
        },
        {
            path: '/register',
            component: () => import('@/pages/Register'),
            meta: {
                show: false
            }
        }
    ]
