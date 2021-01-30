import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Doc from '../views/Doc.vue'
import * as config from '../../config'

Vue.use(VueRouter)

const libRoutes = config.libs.map(item => {
  return {
    path: `/${item.name}/:sub?`,
    name: item.name,
    label: item.label,
    component: Doc,
  }
})

export const routes = [
  {
    path: '/home',
    label: '首页',
    name: '',
    redirect: '/',
  },
  {
    path: '/docs/:sub?',
    name: 'docs',
    label: '文档',
    component: Doc,
  },
  ...libRoutes,
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    ...routes,
  ],
})

export default router
