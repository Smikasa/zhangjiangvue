import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/css/reset.css';

import * as Api from './api/index'

Vue.config.productionTip = false;

Vue.prototype.$api = Api;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');