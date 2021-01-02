import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Doc from '../views/Doc.vue'

Vue.use(VueRouter)

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
  {
    path: '/components',
    name: 'components',
    label: '组件'
  },
  {
    path: '/blocks',
    name: 'blocks',
    label: '区块'
  },
  {
    path: '/pages',
    name: 'pages',
    label: '页面'
  },
  {
    path: '/layouts',
    name: 'layouts',
    label: '布局'
  },
  {
    path: '/templates',
    name: 'templates',
    label: '模板'
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    ...routes
  ]
})

export default router
