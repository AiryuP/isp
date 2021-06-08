import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//element
import ElementUI from 'element-ui';

import ViewUI from 'view-design';

import 'element-ui/lib/theme-chalk/index.css';

import 'view-design/dist/styles/iview.css';

import dataV from '@jiaminghi/data-view';

// 数据请求
import axios from './http/http';
import global from './components/global.vue'

// echarts
// import echarts from 'echarts'
import * as echarts from 'echarts'
import echartsGL from 'echarts-gl'
// import echartsGL from './assets/js/echarts-gl.min.js'


// 自定义字体图标
import './assets/icon/iconfont.css'

// 样式重置
import './assets/css/reset.css';
// 修改el，自定义样式
import './assets/css/diyElement.css'

Vue.prototype.$axios = axios
Vue.prototype.global = global
Vue.prototype.$echarts = echarts
Vue.prototype.$echartsGL = echartsGL

Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.use(dataV);

Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to, from, next) => { 
  //获取用户登录成功后储存的登录标志
  let getFlag = sessionStorage.getItem("Flag");
  //如果登录标志存在且为isLogin，即用户已登录
  if(getFlag === "isLogin"){ 
    //设置vuex登录状态为已登录
    store.state.isLogin = true
    next() 
    //如果已登录，还想想进入登录注册界面，则定向回首页
    if (!to.matched.some( record => record.meta.isLogin )) { 
      next({
        path: '/'
      })
    } 
  //如果登录标志不存在，即未登录
  }else{
    //用户想进入需要登录的页面，则定向回登录界面
    if( to.matched.some( record => record.meta.isLogin ) ){
      next({
        path: '/login',
      }) 
    //用户进入无需登录的界面，则跳转继续
    }else{
      next()
    } 
  } 
}); 






new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
