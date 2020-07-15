import Vue from 'vue';
import Router from 'vue-router';
import { main } from '@/pages/zbr/views/index/index';

Vue.use(Router);

export default new Router({
    routes: [
        // index
        {
            path: '/',
            component: main,
            label: 'index',
        },
        // 404 模块
        {
            path: '*',
            component: () =>
                import('@/components/404.vue')
        }
    ]
});