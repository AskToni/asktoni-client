import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Restaurants from '@/components/Restaurants';
import RestaurantDetail from '@/components/RestaurantDetail';
import Recommendations from '@/components/Recommendations';
import Users from '@/components/Users';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Restaurants',
            component: Restaurants,
        },
        {
            path: '/restaurant/:id',
            name: 'Restaurant Detail',
            component: RestaurantDetail,
        },
        {
            path: '/index',
            name: 'Index',
            component: Index,
        },
        {
            path: '/recommendations',
            name: 'Recommendations',
            component: Recommendations,
        },
        {
            path: '/users',
            name: 'Users',
            component: Users,
        },
    ],
});
