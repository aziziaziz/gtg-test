import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
// import Axios from 'axios'

import Q1 from './pages/Q1Page.vue'

Vue.use(Router)

Vue.config.productionTip = false

const router = new Router({
  routes: [
    // { path: '/', component: HomePage, meta: { title: 'Home Page' } },
    { path: '/Q1', component: Q1, meta: { title: 'Question 1' } },
    // { path: '/', component: HomePage, meta: { title: 'Home Page' } },
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
