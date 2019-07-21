import Vue from 'vue'
import App from '../App.vue'
import wysiwyg from "vue-wysiwyg"
import moment from 'vue-moment'
import GSignInButton from 'vue-google-signin-button'
import axios from 'axios'

Vue.use(GSignInButton)
Vue.use(wysiwyg, {});
Vue.use(axios)
Vue.use(moment)

new Vue(App).$mount('#app')