// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import sdk from './sdk'
import './common/css/index.css'
import VueResource from 'vue-resource'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

Vue.use(VueResource);
Vue.config.productionTip = false
Vue.prototype.global = sdk
Vue.prototype.HEAD_PADDING_TOP = 235

fastclick.attach(document.body)
Vue.use(VueLazyLoad)

/* eslint-disable no-new */
if (sdk.isApp) {
  window.apiready = () => {
    new Vue({
      el: '#app',
      store,
      router,
      components: {
        App
      },
      template: '<App/>'
    })
  }
} else {
  new Vue({
    el: '#app',
    router,
    store,
    components: {
      App
    },
    template: '<App/>'
  })
}
