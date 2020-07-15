import { admin, page1 } from '@/pages/page2/views/admin/index';

export function AdminRoute(path = '/Admin') {
    return {
        path: path,
        component: admin,
        label: 'admin',
        children: [
            { path: '', name: 'page1', component: page1 },
        ]
    };
}