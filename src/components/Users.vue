<template>
  <div class="users">
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
    <h1>Users</h1>
  </div>
</template>

<script>
import toolbarMixin from './../mixins/toolbarMixin';

export default {
    mixins: [toolbarMixin],
    name: 'users'
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
