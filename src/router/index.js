import Vue from 'vue'
import Router from 'vue-router'
import MainMenu from '@/components/MainMenu'
import Domain from '@/components/Domain'
import NewDomain from '@/components/NewDomain'
import Story from '@/components/Story'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainMenu',
      component: MainMenu
    },
    {
      path: '/domain',
      name: 'Domain',
      component: Domain
    },
    {
      path: '/',
      name: 'Story',
      component: Story
    },
    {
      path: '/domain/new',
      name: 'NewDomain',
      component: NewDomain
    }
  ]
})
