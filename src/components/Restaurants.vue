<template>
  <div class="restaurants">
        <md-toolbar>
            <md-button class="md-icon-button" @click="toggleLeftSidenav">
                <md-icon>menu</md-icon>
            </md-button>

            <h2 class="md-title">Ask Toni</h2>
            <span style="flex: 1"></span>
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
        <md-progress md-indeterminate class="md-accent" v-if="isLoading"></md-progress>
        <md-progress md-indeterminate v-else style="opacity: 0;"></md-progress>
        <md-table-card>
            <form novalidate @submit.stop.prevent="submit">
                <md-layout md-row>
                    <md-layout md-flex="5"><md-icon>search</md-icon></md-layout>
                    <md-layout md-flex="30">
                        <md-input-container>
                        <label>Restaurant name</label>
                        <md-input v-model="searchValue" @change="getModel()" placeholder="Search..." :debounce="300"></md-input>
                        </md-input-container>
                    </md-layout>
                    <md-layout md-flex="30"><h1 class="md-title">{{name}}</h1></md-layout>
                </md-layout>
            </form>
            <md-table md-sort="restaurantName" md-sort-type="desc" @sort="onSort">
                <md-table-header>
                <md-table-row>
                    <md-table-head v-for="(col, colIndex) in columns" :key="colIndex" :md-item="col" :md-sort-by="col.name"
                    :style="{width: (col.width ? col.width : null)}">
                        {{ col.name }}
                    </md-table-head>
                </md-table-row>
                </md-table-header>

                <md-table-body>
                <md-table-row v-for="(row, rowIndex) in tableRows" :key="rowIndex" :md-item="row">
                    <md-table-cell v-for="(column, key) in row" :key="key" v-if="renderedColumns[key]">
                    <span v-if="key !== 'restaurantName'">
                        {{ column }}
                    </span>
                    <span v-else>
                        <router-link :to="'restaurant/' + row.id">{{ column }}</router-link>
                    </span>
                    </md-table-cell>
                </md-table-row>
                </md-table-body>
            </md-table>

            <md-table-pagination
                :md-size="page.limit"
                :md-total="modelCount"
                :md-page="page.offset"
                :md-label="name"
                :md-page-options="page.options"
                @pagination="onPagination"></md-table-pagination>
        </md-table-card>
  </div>
</template>

<script>
import axios from 'axios';
import toolbarMixin from '../mixins/toolbarMixin';

export default {
    mixins: [toolbarMixin],
    components: {
    },
    computed: {
        renderedColumns() {
            const renderedColumns = {};
            this.columns.forEach((column) => {
                renderedColumns[column.value] = true;
            });
            return renderedColumns;
        },
        tableRows() {
            const offset = (this.page.offset - 1) * this.page.limit;
            return this.model.slice(offset, offset + this.page.limit);
        },
        columnHash() {
            const hash = {};
            this.columns.forEach((column) => {
                hash[column.name] = column.value;
            });
            return hash;
        },
        modelCount() {
            return this.model.length;
        }
    },
    data() {
        return {
            name: 'Restaurants',
            columns: [
                {
                    name: 'Restaurant',
                    value: 'restaurantName',
                    width: '50%'
                },
                {
                    name: 'Reviews',
                    value: 'reviewCount',
                    width: '10%'
                },
                {
                    name: 'Rating',
                    value: 'rating',
                    width: '10%'
                },
                {
                    name: 'Price',
                    value: 'price',
                    width: '10%'
                }
            ],
            model: [],
            page: {
                options: [10, 25, 50, 100],
                offset: 1,
                limit: 10
            },
            searchValue: '',
            isLoading: true
        };
    },
    methods: {
        clientSort(a, b, type, name) {
            switch (name) {
                case 'restaurantName':
                case 'price':
                    return type === 'asc' ? a[name].localeCompare(b[name])
                        : b[name].localeCompare(a[name]);
                default:
                    return type === 'asc' ? a[name] - b[name] : b[name] - a[name];
            }
        },
        async getModel() {
            try {
                this.isLoading = true;
                const response = await axios.get('http://asktoniapi.azurewebsites.net/api/Restaurant');
                this.model = response.data;
                if (this.searchValue !== '') {
                    this.model = this.searchFilter(this.model, this.searchValue);
                }
                this.resetPagination();
                this.isLoading = false;
            } catch (e) {
                this.errors.push(e);
            }
        },
        onPagination(args) {
            const { size = 10, page = 1 } = args;
            this.page.limit = size;
            this.page.offset = page;
        },
        onSort(args) {
            const { type = 'asc' } = args;
            const name = this.columnHash[args.name];
            this.model.sort((a, b) => this.clientSort(a, b, type, name));
        },
        resetPagination() {
            this.page.offset = 1;
        },
        searchFilter(restaurant, filterValue) {
            return restaurant.filter(model =>
                model.restaurantName.toLowerCase().replace(/\s/g, '')
                    .includes(filterValue.toLowerCase().replace(/\s/g, '')));
        }
    },
    created() {
        this.getModel();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .restaurants /deep/ {
        .md-table-head-container, .md-has-action .md-table-cell-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
