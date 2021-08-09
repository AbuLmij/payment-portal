/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'

Vue.use(Vuesax)


// axios
import axios from './axios.js'
Vue.prototype.$http = axios

// Filters
import './filters/filters.js'


// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

// VeeValidate
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

// Cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// Numeral - For formatting numbers
import VueNumerals from 'vue-numerals'
Vue.use(VueNumerals) // default locale is 'en'

// Vue select css
// Note: In latest version you have to add it separately
import 'vue-select/dist/vue-select.css';

// Vue Country
import vueCountryRegionSelect from 'vue-country-region-select'
Vue.use(vueCountryRegionSelect)


// Vue Moments
import VueMoment from 'vue-moment'
Vue.use(VueMoment)

// Vue Lodash
window._ = require('lodash')

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
