import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/backend/Dashboard'
import Index from '@/components/website/Index'
import Setup from '@/components/backend/Projectsetup'
import Items from '@/components/backend/items/Items'
import Itemdetail from '@/components/backend/items/Itemdetail'
import Pages from '@/components/backend/pages/Pages'
import Pagedetail from '@/components/backend/pages/Pagedetail'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Index', component: Index },
    { path: '/admin', name: 'Admin', component: Dashboard },
    { path: '/setup', name: 'Setup', component: Setup },
    { path: '/items', name: 'Items', component: Items },
    { path: '/items/:id', name: 'item', component: Itemdetail },
    { path: '/pages', name: 'pages', component: Pages },
    { path: '/pages/:id', name: 'page', component: Pagedetail },
  ]
})
