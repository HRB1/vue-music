import Vue from 'vue'
import App from './App.vue'
import router from "./router/index";
import "./style/zero.scss";
import "./fonts/iconfont.css";
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
