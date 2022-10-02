import Vue from 'vue';
import RestaurantDetail from '@/components/RestaurantDetail';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

function setup() {
    Vue.use(VueMaterial);

    Vue.material.registerTheme({
        default: {
            primary: 'blue',
            accent: 'pink',
        },
        blue: {
            primary: 'blue',
            accent: 'pink',
        },
        indigo: {
            primary: 'indigo',
            accent: 'pink',
        },
        brown: {
            primary: 'brown',
            accent: 'green',
        },
        purple: {
            primary: 'purple',
            accent: 'blue',
        },
        orange: {
            primary: 'orange',
            accent: 'purple',
        },
        green: {
            primary: 'green',
            accent: 'pink',
        },
        'light-blue': {
            primary: 'light-blue',
            accent: 'yellow',
        },
        teal: {
            primary: 'teal',
            accent: 'orange',
        },
        'blue-grey': {
            primary: 'blue-grey',
            accent: 'blue',
        },
        cyan: {
            primary: 'cyan',
            accent: 'pink',
        },
        red: {
            primary: 'red',
            accent: 'pink',
        },
        white: {
            primary: 'white',
            accent: 'blue',
        },
        grey: {
            primary: {
                color: 'grey',
                hue: 300,
            },
            accent: 'indigo',
        },
    });

    Vue.material.setCurrentTheme('default');
}

describe('RestaurantDetail.vue', () => {
    setup();
    it('has a created hook', () => {
        expect(typeof RestaurantDetail.created).to.equal('function');
    });
    // it('should render correct contents', () => {
    //     const Constructor = Vue.extend(RestaurantDetail);
    //     const vm = new Constructor().$mount();
    //     expect(vm.$el.querySelector('.restaurants .md-title').textContent)
    //     .to.equal('Restaurants');
    // });
});
