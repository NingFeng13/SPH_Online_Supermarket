<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Header></Header>
    <router-view></router-view>
    <Footer v-show='$route.meta.show'></Footer>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Header from './components/Header'
import Footer from './components/Footer'
import TypeNav from './components/TypeNav'



export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('categoryList');
  },
  components: {
    Header,
    Footer,
    TypeNav,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
