import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import OrderList from '@/pages/orderlist/orderlist'
import Money from '@/pages/Money/Money'
import My from '@/pages/my/my'
import Shop from '@/pages/shop/shop'
import searchFrame from '@/components/searchframe/searchframe'

Vue.use(Router)
Router.prototype.goBack = function () {
    this.isBack = true
    window.history.go(-1)
  }

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: true,
        order: 0
      }
    },
    {
      path: '/order',
      name: 'order',
      component: OrderList,
      meta: {
        keepAlive: true,
        order: 1
      }
    },
    {
      path: '/money',
      name: 'money',
      component: Money,
      meta: {
        keepAlive: true,
        order: 2
      }
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      meta: {
        keepAlive: true,
        order: 3
      }
    },
    {
        path: '/shop',
        name: 'shop',
        component: Shop,
        meta: {
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
