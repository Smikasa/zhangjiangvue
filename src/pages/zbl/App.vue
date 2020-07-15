<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style scoped>
#app{
    /* background-color: rgba(0,0,0,.5); */
    width:100%;
    height:100%;
    overflow: auto;
    /* background: url(../img/zblRight.png) no-repeat; */
    background-size: cover;
    /* padding:60px 0 132px 40px; */
    background: url("~@/assets/img/bg.png") no-repeat;
    background-size:cover;
    overflow: auto;
}
</style>>
