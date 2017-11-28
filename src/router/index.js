import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/backend/Dashboard'
import Index from '@/components/website/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index', 
      component: Index
    } 
  ]
})
