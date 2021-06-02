import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Axios from 'axios'

import Q1 from './pages/Q1Page.vue'
import Q2 from './pages/Q2Page.vue'

import Dropdown from './components/Dropdown.vue'

Vue.component('dropdown', Dropdown)

Vue.use(Router)

Vue.config.productionTip = false

const router = new Router({
  routes: [
    // { path: '/', component: HomePage, meta: { title: 'Home Page' } },
    { path: '/Q1', component: Q1, meta: { title: 'Question 1' } },
    { path: '/Q2', component: Q2, meta: { title: 'Question 2' } },
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

const axios = Axios
axios.defaults.baseURL = 'http://localhost:3000'

Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
