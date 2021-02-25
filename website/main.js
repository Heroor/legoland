import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import '@website/style/index.less'
import installGlobal from './global'
import DemoBlock from '@website/components/demo-block'
import SourceBlock from '@website/components/source-block'

Vue.use(ElementUI, {
  size: 'mini',
})
Vue.component('demo-block', DemoBlock)
Vue.component('source-block', SourceBlock)
installGlobal(Vue)

Vue.prototype.$isPermitted = () => true
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
