<template>
  <div class="restaurantDetail">
    <md-spinner :md-size="150" md-indeterminate v-if="isLoading" style="height: 85vh;"></md-spinner>
    <md-layout v-else>
        <md-layout md-column md-flex-medium="100" style="height: calc(100vh - 64px);">
            <md-layout md-flex="50">
                <md-card class="md-flex">
                    <md-card-header>
                        <div class="md-title">{{model.restaurantName}}</div>
                    </md-card-header>

                    <md-card-content>
                        <md-list class="md-double-line">
                            <md-list-item>
                                <md-layout>
                                    <md-layout md-column>{{model.address}}</md-layout>
                                    <md-layout md-column>{{model.city}}</md-layout>
                                    <md-layout md-column><a :href="hrefPhone">{{hrefPhone}}</a></md-layout>
                                </md-layout>
                                <md-divider></md-divider>
                            </md-list-item>
                            <md-list-item>
                                <div class="md-list-text-container">
                                    <span>Price</span>
                                    <span>{{model.price}}</span>
                                </div>
                                <div class="md-list-text-container">
                                    <span>Rating</span>
                                    <span>{{model.rating}}</span>
                                </div>
                                <md-divider></md-divider>
                            </md-list-item>
                            <md-list-item>
                                <div class="md-list-text-container">
                                    <span>Categories</span>
                                    <md-layout>
                                        <div v-for="(chip, index) in model.categories" :key="index">
                                            <md-chip class="md-primary">{{chip}}</md-chip>
                                        </div>
                                    </md-layout>
                                </div>
                                <md-divider></md-divider>
                            </md-list-item>
                        </md-list>
                    </md-card-content>
                </md-card>
            </md-layout>
            <md-layout md-flex="50">
                <md-card class="md-flex">

                    <md-card-content style="height: 100%">
                        <v-map :zoom="zoom" :center="center" :min-zoom="minZoom" :max-zoom="maxZoom">
                            <v-tilelayer :url="url"></v-tilelayer>
                            <v-marker :lat-lng="marker"></v-marker>
                            <v-icondefault :image-path="path"></v-icondefault>
                        </v-map>
                    </md-card-content>

                    <md-card-actions>
                        <md-button :href="hrefGoogle" class="md-raised md-primary">Find On Google</md-button>
                    </md-card-actions>
                </md-card>
            </md-layout>
        </md-layout>
        <md-layout md-column md-flex-medium="100" style="height: calc(100vh - 64px);" class="renderedLayout">
            <md-layout>
                <md-card class="md-flex">
                    <md-card-header>
                        <div class="md-title">Reviews ({{model.reviewCount}})</div>
                    </md-card-header>

                    <md-card-content>
                        <md-list>
                            <md-list-item v-for="(review, index) in reviews" :key="index">
                                <md-rating-bar v-model="review.rating" class="md-primary" disabled></md-rating-bar>
                                <span>{{review.text.slice(0, 50)}}...</span>

                                <md-list-expand>
                                    {{review.text}}
                                </md-list-expand>
                            </md-list-item>
                        </md-list>
                    </md-card-content>
                </md-card>
            </md-layout>
        </md-layout>
    </md-layout>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';
import axios from 'axios';

/* global L */
const leaflet = L;

// const corner1 = leaflet.latLng(46.2, -118.6);
// const corner2 = leaflet.latLng(45.9, -118.1);

export default {
    name: 'example',
    components: {
        'v-map': Vue2Leaflet.Map,
        'v-tilelayer': Vue2Leaflet.TileLayer,
        'v-marker': Vue2Leaflet.Marker,
        'v-icondefault': Vue2Leaflet.IconDefault
    },
    computed: {
        hrefPhone() {
            return `tel:${this.model.phone.slice(0, 2)}-${this.model.phone.slice(2, 5)}-${this.model.phone.slice(5, 8)}-${this.model.phone.slice(8, 12)}`;
        },
        hrefGoogle() {
            return `https://www.google.com/maps/?q=${this.model.latitude},${this.model.longitude}`;
        }
    },
    data() {
        return {
            zoom: 16,
            center: leaflet.latLng(0, 0),
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            marker: leaflet.latLng(0, 0),
            path: '/static/',
            // maxBounds: leaflet.latLngBounds(corner1, corner2),
            maxZoom: 18,
            minZoom: 13,
            isLoading: true,
            reviews: []
        };
    },
    methods: {
        async getModel() {
            try {
                this.isLoading = true;
                const response = await axios.get(`http://asktoniapi.azurewebsites.net/api/Restaurant/${this.$route.params.id}`);
                this.model = response.data;
                this.center = leaflet.latLng(this.model.latitude, this.model.longitude);
                this.marker = leaflet.latLng(this.model.latitude, this.model.longitude);
                this.reviews = await Promise.all(this.model.reviewIDs.map(async (reviewID) => {
                    const reviewResponse = await axios.get(`http://asktoniapi.azurewebsites.net/api/Review/${reviewID}`);
                    return Object.assign({}, { show: true }, reviewResponse.data);
                }));
                this.isLoading = false;
            } catch (e) {
                console.error(e);
            }
        }
    },
    created() {
        this.getModel();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../node_modules/leaflet/dist/leaflet.css";
.restaurantDetail /deep/ {
    .leaflet-pane, .leaflet-top.leaflet-left {
        z-index: 1;
    }
    .leaflet-control-attribution.leaflet-control {
        display: none;
    }
    .md-card {
        margin: 15px;
    }
    .md-list-item {
        .md-full-icon {
            padding-top: 6px;
        }
    }
}
</style>
