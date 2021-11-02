<template>
  <div>
<router-link to="/register">Reister</router-link>|
<router-link to="/login">login</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
 created(){
   this.$store.dispatch('mainStore/auto_logout')
 }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #0000;
}
</style>
