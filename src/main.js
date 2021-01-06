import Vue from 'vue'
import App from './App.vue'
import router from '@/Routing'
import ElementUI from 'element-ui'
import bus from '@/utils/bus'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$bus = bus
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
