<template>
  <div class="container">
    <div id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'app'
        };
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
}

</style>
