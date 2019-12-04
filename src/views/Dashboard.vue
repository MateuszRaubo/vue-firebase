<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p v-if="!user" class="red">You should only get here if you're authenticated!</p>
    <p v-if="user">Here is some info about You</p>
    <p v-if="user">{{user}}</p>
  </div>
</template>
<style scoped>
  h1, p {
    text-align: center;
  }
  .red {
    color: red;
  }
</style>
<script>

export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  // created() {
  //   this.$store.dispatch('fetchUser');
  // },
};
</script>
