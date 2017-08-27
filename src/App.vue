<template>
  <div class="container">
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
            <router-link to="/" @click.native="toggleLeftSidenav" class="md-button" :class="`md-theme-${$material.currentTheme}`">
              <md-icon>home</md-icon> <span>Home</span>
              <md-ink-ripple />
            </router-link>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
          <md-list-item>
            <router-link to="/restaurants" @click.native="toggleLeftSidenav" class="md-button" :class="`md-theme-${$material.currentTheme}`">
              <md-icon>restaurant</md-icon> <span>Restaurants</span>
              <md-ink-ripple />
            </router-link>
          </md-list-item>
          <md-list-item>
            <router-link to="/reviews" @click.native="toggleLeftSidenav" class="md-button" :class="`md-theme-${$material.currentTheme}`">
              <md-icon>rate_review</md-icon> <span>Reviews</span>
              <md-ink-ripple />
            </router-link>
          </md-list-item>
        </md-list>
      </div>
    </md-sidenav>
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
    name: 'app',
    methods: {
        toggleLeftSidenav() {
            this.$refs.leftSidenav.toggle();
        },
        transition(path) {
            this.$router.push(path);
        }
    }
};
</script>

<style lang="scss" scoped>
$sizebar-size: 280px;
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
