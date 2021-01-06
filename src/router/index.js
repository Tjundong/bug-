import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import User1 from '@/views/home/User1.vue'
import User2 from '@/views/home/User2.vue'
import User3 from '@/views/home/User3.vue'
import User0 from '@/views/home/User0.vue'
import Analysis from '@/views/home/analysis.vue'//router
import Anal from '@/views/home/user/Anal.vue'
import Anal2 from '@/views/home/user/Anal2.vue'
import Anal3 from '@/views/home/user/Anal3.vue'
import Anal4 from '@/views/home/user/Anal4.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // redirect: 'analysis',
    children: [
      {
        path: 'analysis',
        name: 'analysis',
        component: Analysis,
        redirect: '/analysis/analy',
        children: [
          {
            path: 'analy',
            name: 'analy',
            component: User0
          },
          {
            path: 'analyony',
            name: 'analyony',
            component: User1,
            children: [
              {
                path: 'anal',
                name: 'anal',
                component: Anal,
              },
              {
                path: 'anal2',
                name: 'anal2',
                component: Anal2,
              },
              {
                path: 'anal3',
                name: 'anal3',
                component: Anal3,
              },
              {
                path: 'anal4',
                name: 'anal4',
                component: Anal4,
              }
            ]
          },

        ]
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中


      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'teacherManage',
        name: 'teacherManage',
        component: User2
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 会被渲染在 User 的 <router-view> 中
        path: 'applicationAdmin',
        name: 'applicationAdmin',
        component: User3
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
