<template>
    <div>
        A global component
        <slot name="top"></slot>
    </div>
</template>

<script>
export default {
  name: 'global-component',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
