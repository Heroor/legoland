import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Doc from '../views/Doc.vue'
import Components from '../views/Components.vue'
import Blocks from '../views/Blocks.vue'
import Pages from '../views/Pages.vue'
import Layouts from '../views/Layouts.vue'
import Templates from '../views/Templates.vue'

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
    label: '组件',
    component: Components
  },
  {
    path: '/blocks',
    name: 'blocks',
    label: '区块',
    component: Blocks
  },
  {
    path: '/pages',
    name: 'pages',
    label: '页面',
    component: Pages
  },
  {
    path: '/layouts',
    name: 'layouts',
    label: '布局',
    component: Layouts
  },
  {
    path: '/templates',
    name: 'templates',
    label: '模板',
    component: Templates
  }
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
