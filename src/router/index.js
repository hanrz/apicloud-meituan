import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import OrderList from '@/pages/orderlist/orderlist'
import Money from '@/pages/Money/Money'
import My from '@/pages/my/my'
import searchFrame from '@/components/searchframe/searchframe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      mete: {
        keepAlive: true
      }
    },
    {
      path: '/order',
      name: 'order',
      component: OrderList,
      mete: {
        keepAlive: true
      }
    },
    {
      path: '/money',
      name: 'money',
      component: Money,
      mete: {
        keepAlive: true
      }
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      mete: {
        keepAlive: true
      }
    },
    {
      path: '/home/search',
      name: 'search',
      component: searchFrame
    }
  ]
})
