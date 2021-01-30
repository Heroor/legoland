import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@website/assets/theme/theme/index.css'
import '@website/style/index.less'
import installGlobal from './global'

Vue.use(ElementUI, {
  size: 'mini',
})
installGlobal(Vue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
