import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
//三级联动组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// import { reqgetCategoryList } from "@/api"
import store from '@/store'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import { Button, MessageBox } from 'element-ui';
import atm from '@/assets/1.gif';
import "@/myPlugin/veeValidate";
//第一个参数，全局组件的名字   第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button);
import VueLazyload from 'vue-lazyload';
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: atm
});
//校验插件


Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
// Vue.config.productionTip = false
// reqgetCategoryList();
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store

}).$mount('#app')
