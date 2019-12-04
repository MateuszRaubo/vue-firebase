<template>
  <div id="app">
    <Header/>
    <transition name="slide"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import Header from './components/Header.vue';

export default {
  name: 'app',
  components: {
    Header,
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
};
</script>
<style>
  body, html {
    margin: 0;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .slide-enter {
    opacity: 0;
    transform: translateX(-20%);
  }
  .slide-enter-active {
    transition: all .3s;
  }
  .slide-leave-active {
    transition: all .3s;
    opacity: 0;
    transform: translateX(-20%);
  }
  .slide-leave {
    /*opacity: 1;*/
  }
  .slide-move {
    transition: transform .3s;
  }
</style>
