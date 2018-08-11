import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Domain from '@/components/Domain'
import Stories from '@/components/Stories'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-menu',
      component: MainMenu
    },
    {
      path: '/domain',
      name: 'domain',
      component: Domain
    },
    {
      path: '/stories',
      name: 'stories',
      component: Stories
    }
  ]
})
