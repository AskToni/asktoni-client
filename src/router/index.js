import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Restaurants from '@/components/Restaurants';
import RestaurantDetail from '@/components/RestaurantDetail';
import Reviews from '@/components/Reviews';
import Users from '@/components/Users';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Restaurants',
            component: Restaurants
        },
        {
            path: '/restaurant/:id',
            name: 'Restaurant Detail',
            component: RestaurantDetail
        },
        {
            path: '/index',
            name: 'Index',
            component: Index
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
