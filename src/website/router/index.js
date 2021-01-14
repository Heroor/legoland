import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Doc from '../views/Doc.vue'
import * as config from '../../../config'

Vue.use(VueRouter)

const libRoutes = config.libs.map(item => {
  return {
    path: `/${item.name}`,
    name: item.name,
    label: item.label,
    component: Doc
  }
})

export const routes = [
  {
    path: '/home',
    name: 'home',
    label: '首页',
    redirect: '/'
  },
  {
    path: '/doc',
    name: 'doc',
    label: '文档',
    component: Doc
  },
  ...libRoutes
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ...routes
  ]
})

export default router
