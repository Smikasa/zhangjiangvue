import Vue from 'vue';
import Router from 'vue-router';
import { AdminRoute } from './admin/admin.route';

Vue.use(Router);

export default new Router({
    routes: [
        // admin 模块  路由为根路由： / 
        AdminRoute('/'),
        // 404 模块
        {
            path: '*',
            component: () =>
                import ('@/pages/page2/views/404.vue')
        }
    ]
});