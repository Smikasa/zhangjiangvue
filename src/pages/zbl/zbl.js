import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import moment  from 'moment';

Vue.use(ElementUI);

import '@/assets/css/reset.css';

import '@/pages/zbl/assets/css/zbl.css';

import * as Api from './api/index'

Vue.prototype.$moment = moment;


Vue.prototype.$api = Api;


Vue.config.productionTip = false;

new Vue({ 
    router,
    render: h => h(App)
}).$mount('#app');