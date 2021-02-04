const docRoutes = [
  {
    title: '介绍',
    name: 'description',
    path: '/description',
    component: () => import('./description/README.md'),
  },
  {
    title: '快速开始',
    name: 'start',
    path: '/start',
    component: () => import('./start/README.md'),
  },
  {
    title: '贡献',
    name: 'contribute',
    path: '/contribute',
    component: () => import('./contribute/README.md'),
  },
]

export default docRoutes
