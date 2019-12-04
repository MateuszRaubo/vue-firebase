<template>
  <div class="home">
    <h1>Hello!</h1>
    <p v-if="!auth">Sign in (or sign up) to see more!</p>
    <p v-if="auth">Go to dashboard to see info about You!</p>
    <div class="cta"
         v-if="!auth">
      <router-link to="/sign-up">Sign Up</router-link>
      <router-link to="/sign-in">Sign In</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'home',
  computed: {
    auth() {
      return this.$store.getters.isAuth;
    },
  },
};
</script>
<style scoped>
  .home {
    width: 80%;
    margin: auto;
  }
  h1 {
    text-align: center;
  }
  p {
    text-align: center;
  }
  .cta {
    width: 300px;
    margin: auto;
    text-align: center;
  }
  .cta a {
    margin: 10px;
    text-decoration: none;
    display: inline-block;
    border: 1px solid #521751;
    border-radius: 3px;
    width: 100px;
    padding: 10px;
    box-sizing: border-box;
    color: #521751;
  }
  .cta a:hover,
  .cta a:active {
    background-color: #521751;
    color: white;
  }
</style>
