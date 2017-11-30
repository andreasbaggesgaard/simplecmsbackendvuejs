import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/backend/Dashboard'
import Index from '@/components/website/Index'
import Setup from '@/components/backend/Projectsetup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index', 
      component: Index
    },
    {
      path: '/admin',
      name: 'Dashboard', 
      component: Dashboard
    },
    {
      path: '/setup',
      name: 'Setup', 
      component: Setup
    },
  ]
})
