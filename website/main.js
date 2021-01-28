import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@website/assets/theme/theme/index.css'
import '@website/style/index.css'
import DemoBLock from '@website/components/demo-block'
import './global'

Vue.component('demo-block', DemoBLock)
Vue.use(ElementUI, {
  size: 'mini',
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
