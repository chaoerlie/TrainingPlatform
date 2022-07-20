<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import table2 from './components/admin.vue'
import index from './components/index.vue'
import charts from './components/Echart.vue'
import loginss from './components/login.vue'
import test1 from './components/test1.vue'
import test2 from './components/test2.vue'
</script>

<template>

  <router-view/>
<!--<test2></test2>-->
<!--  <loginss> </loginss>-->
<!--  <table2> </table2>-->
<!--  <index>  </index>-->
<!--  <HelloWorld></HelloWorld>-->


</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}
</style>
