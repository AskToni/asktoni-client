import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Restaurants from '@/components/Restaurants';
import Reviews from '@/components/Reviews';
import Users from '@/components/Users';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/restaurants',
            name: 'Restaurants',
            component: Restaurants
        },
        {
            path: '/reviews',
            name: 'Reviews',
            component: Reviews
        },
        {
            path: '/users',
            name: 'Users',
            component: Users
        }
    ]
});
