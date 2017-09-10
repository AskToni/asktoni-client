// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable import/first */
import Vue from 'vue';
import App from './App';
import router from './router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import Vuency from 'vuency';

Vue.config.productionTip = false;

Vue.use(VueMaterial);

Vue.material.registerTheme({
    default: {
        primary: 'blue',
        accent: 'pink'
    },
    blue: {
        primary: 'blue',
        accent: 'pink'
    },
    indigo: {
        primary: 'indigo',
        accent: 'pink'
    },
    brown: {
        primary: 'brown',
        accent: 'green'
    },
    purple: {
        primary: 'purple',
        accent: 'blue'
    },
    orange: {
        primary: 'orange',
        accent: 'purple'
    },
    green: {
        primary: 'green',
        accent: 'pink'
    },
    'light-blue': {
        primary: 'light-blue',
        accent: 'yellow'
    },
    teal: {
        primary: 'teal',
        accent: 'orange'
    },
    'blue-grey': {
        primary: 'blue-grey',
        accent: 'blue'
    },
    cyan: {
        primary: 'cyan',
        accent: 'pink'
    },
    red: {
        primary: 'red',
        accent: 'pink'
    },
    white: {
        primary: 'white',
        accent: 'blue'
    },
    grey: {
        primary: {
            color: 'grey',
            hue: 300
        },
        accent: 'indigo'
    }
});

Vue.material.setCurrentTheme('default');
Vue.use(Vuency);

/* eslint-disable no-new */
new Vue({
    components: { App },
    el: '#app',
    router,
    template: '<App/>'
});
