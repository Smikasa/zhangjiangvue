<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style scoped>
#app {
  height: 100%;
  width: 100%;
  /* background-color: #0e1928; */
  /* background-color: transparent; */
  /* background: url("~@/assets/img/bg.png") no-repeat; */
  background-size: cover;
  overflow: auto;
}
</style>
