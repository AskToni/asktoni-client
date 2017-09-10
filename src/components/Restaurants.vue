<template>
  <div class="restaurants">
        <md-progress md-indeterminate class="md-accent" v-if="getModel.isActive"></md-progress>
        <md-progress md-indeterminate v-else style="opacity: 0;"></md-progress>
        <md-table-card>
            <form novalidate @submit.stop.prevent="submit">
                <md-layout md-row>
                    <md-layout md-flex="5"><md-icon>search</md-icon></md-layout>
                    <md-layout md-flex="30">
                        <md-input-container>
                        <label>Restaurant name</label>
                        <md-input v-model="searchValue" @change="getModel.run()" placeholder="Search..." :debounce="300"></md-input>
                        </md-input-container>
                    </md-layout>
                    <md-layout md-flex="30"><h1 class="md-title">{{name}}</h1></md-layout>
                </md-layout>
            </form>
            <md-table md-sort="restaurantName" md-sort-type="desc" @sort="onSort">
                <md-table-header>
                <md-table-row>
                    <md-table-head v-for="(col, colIndex) in columns" :key="colIndex" :md-item="col" :md-sort-by="col.name">
                        {{ col.name }}
                    </md-table-head>
                </md-table-row>
                </md-table-header>

                <md-table-body>
                <md-table-row v-for="(row, rowIndex) in tableRows" :key="rowIndex" :md-item="row">
                    <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" v-if="renderedColumns[columnIndex]">
                    {{ column }}
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

export default {
    components: {
    },
    computed: {
        renderedColumns() {
            const renderedColumns = {};
            this.columns.forEach((column) => {
                renderedColumns[column.value] = 1;
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
                    value: 'restaurantName'
                },
                {
                    name: 'Reviews',
                    value: 'reviewCount'
                },
                {
                    name: 'Rating',
                    value: 'rating'
                },
                {
                    name: 'Price',
                    value: 'price'
                }
            ],
            model: [],
            page: {
                options: [10, 25, 50, 100],
                offset: 1,
                limit: 10
            },
            searchValue: ''
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
    tasks(t) {
        return t(function* getModel() {
            try {
                const response = yield axios.get('http://asktoniapi.azurewebsites.net/api/Restaurant');
                this.model = response.data;
                if (this.searchValue !== '') {
                    this.model = this.searchFilter(this.model, this.searchValue);
                }
                this.resetPagination();
            } catch (e) {
                this.errors.push(e);
            }
        });
    },
    created() {
        this.getModel.run();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .restaurants .md-table-head-container{
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
