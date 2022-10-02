<template>
  <div class="recommendations">
    <md-toolbar>
        <md-button class="md-icon-button" @click="toggleLeftSidenav">
            <md-icon>menu</md-icon>
        </md-button>

        <h2 class="md-title">Ask Toni</h2>
        <span style="flex: 1"></span>
        <md-spinner md-indeterminate class="md-accent" :md-size="60" :md-stroke="8" v-if="isLoading"></md-spinner>
        <span style="flex: 1"></span>
        <md-menu md-align-trigger ref="menu">
            <md-button md-menu-trigger class="md-raised">{{currentCategory}}</md-button>

            <md-menu-content>
                <div v-for="(category, index) in categories" :key="index">
                    <md-menu-item @selected="categorySelected(category)">{{category}}</md-menu-item>
                </div>
            </md-menu-content>
        </md-menu>
        <md-button class="md-icon-button" @click="transition('users')">
            <md-icon>account_circle</md-icon>
        </md-button>
    </md-toolbar>

    <md-sidenav class="main-sidebar md-left md-fixed" ref="leftSidenav">
    <md-toolbar>
        <div class="md-toolbar-container">
        <h3 class="md-title">Menu</h3>
        </div>
    </md-toolbar>

    <div>
        <md-list>
        <md-list-item>
            <router-link to="/" class="md-button" :class="`md-theme-${$material.currentTheme}`">
            <md-icon>restaurant</md-icon> <span>Restaurants</span>
            <md-ink-ripple />
            </router-link>
        </md-list-item>
        <md-divider class="md-inset"></md-divider>
        <md-list-item>
            <router-link to="/recommendations" class="md-button" :class="`md-theme-${$material.currentTheme}`">
            <md-icon>map</md-icon> <span>Recommendations</span>
            <md-ink-ripple />
            </router-link>
        </md-list-item>
        </md-list>
    </div>
    </md-sidenav>
    <div class="layout" v-if="category">
        <v-map ref="map" :zoom="zoom" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom" :max-bounds="maxBounds" @l-movestart="mapChanging" @l-moveend="mapChanged">
            <v-tilelayer :url="url"></v-tilelayer>
            <div v-for="(recommendation, index) in recommendations" :key="index">
                <v-marker :lat-lng="[recommendation.latitude, recommendation.longitude]">
                    <v-popup>
                        <router-link :to="`/restaurant/${recommendation.id}`">{{recommendation.restaurantName}}</router-link>
                    </v-popup>
                </v-marker>
            </div>
            <v-icondefault :image-path="path"></v-icondefault>
        </v-map>
    </div>
    <div class="layout centered" v-else>
        <md-menu md-align-trigger ref="menu">
            <md-button md-menu-trigger class="md-raised md-primary">{{currentCategory}}</md-button>

            <md-menu-content>
                <div v-for="(category, index) in categories" :key="index">
                    <md-menu-item @selected="categorySelected(category)">{{category}}</md-menu-item>
                </div>
            </md-menu-content>
        </md-menu>
    </div>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';
import axios from 'axios';
import toolbarMixin from '../mixins/toolbarMixin';

/* global L */
const leaflet = L;

export default {
    mixins: [toolbarMixin],
    name: 'recommendations',
    components: {
        'v-map': Vue2Leaflet.Map,
        'v-tilelayer': Vue2Leaflet.TileLayer,
        'v-marker': Vue2Leaflet.Marker,
        'v-icondefault': Vue2Leaflet.IconDefault,
        'v-popup': Vue2Leaflet.Popup,
    },
    computed: {
        queryString() {
            return `?latitude=${this.currentLatitude}&longitude=${this.currentLongitude}&category=${this.category}&pageOffset=${this.offset}&pageLimit=${this.limit}`;
        },
        category() {
            if (this.currentCategory && this.currentCategory !== 'Select Category ...') {
                return this.currentCategory;
            }
            return false;
        },
    },
    data() {
        return {
            currentCategory: 'Select Category ...',
            zoom: 16,
            currentLatitude: 49.2827,
            currentLongitude: -123.1207,
            center: [49.2827, -123.1207],
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            path: '/static/',
            maxZoom: 18,
            minZoom: 13,
            recommendations: [],
            categories: [],
            isLoading: false,
            offset: 1,
            limit: 10,
            text: 'test',
            /* eslint-disable max-len */
            maxBounds: leaflet.latLngBounds(leaflet.latLng(46.2, -118.6), leaflet.latLng(45.9, -118.1)),
            /* eslint-enable max-len */
        };
    },
    methods: {
        async getModel() {
            try {
                if (this.category) {
                    this.isLoading = true;
                    const response = await axios.get(`http://asktoniapi.azurewebsites.net/api/Recommendation${this.queryString}`);
                    this.model = response.data;
                    this.recommendations = this.model;
                    this.isLoading = false;
                }
            } catch (e) {
                /* eslint-disable no-console */
                console.error(e);
                /* eslint-enable no-console */
            }
        },
        async getCategories() {
            try {
                const response = await axios.get('http://asktoniapi.azurewebsites.net/api/Recommendation/Categories');
                this.categories = response.data;
            } catch (e) {
                /* eslint-disable no-console */
                console.error(e);
                /* eslint-enable no-console */
            }
        },
        mapChanging() {
        },
        mapChanged() {
            const { lat, lng } = this.$refs.map.mapObject.getCenter();
            this.currentLatitude = lat;
            this.currentLongitude = lng;
            return this.getModel();
        },
        categorySelected(category) {
            this.currentCategory = category;
            this.getModel();
        },
    },
    created() {
        return this.getCategories();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../node_modules/leaflet/dist/leaflet.css";
.recommendations /deep/ {
    .layout {
        height: calc(100vh - 64px);
    }
    .centered {
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -100px;
    }
    .leaflet-pane, .leaflet-top.leaflet-left {
        z-index: 1;
    }
    .leaflet-control-attribution.leaflet-control {
        display: none;
    }
}
</style>
