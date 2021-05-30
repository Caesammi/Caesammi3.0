import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {path: '/', redirect: '/TestPageA'},
  {
    path: '/',
    name: 'Home',
    component: () => import (
      '../views/Home.vue'),
    children: [
      {
        path: '/TestPageA',
        name: 'TestPageA',
        meta: {
          title: '测试页面A'
        },
        component: () => import (
          '../views/TestPageA.vue')
      }, {
        path: '/testPageB',
        name: '测试页面B',
        meta: {
          title: '测试页面B'
        },
        component: () => import (
          '../views/TestPageB.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  // createWebHistory() // 没有 base，应用托管在域名 `https://example.com` 的根目录下。
  // createWebHistory('/folder/') // 给出的网址为 `https://example.com/folder/`
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Caesammi3.0`
  next()
  // const role = localStorage.getItem('ms_username')
  // if (!role && to.path !== '/login') {
  //   next('/login')
  // } else if (to.meta.permission) {
  //   // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
  //   role === 'admin'
  //     ? next()
  //     : next('/403')
  // } else {
  //   next()
  // }
})

export default router
