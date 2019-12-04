<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">Vue & Firebase Practice</router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!auth">
          <router-link to="/sign-up">Sign Up</router-link>
        </li>
        <li v-if="!auth">
          <router-link to="/sign-in">Sign In</router-link>
        </li>
        <li v-if="auth">
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li v-if="auth">
          <button class="logout"
                  @click="onLogout">Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  computed: {
    auth() {
      return this.$store.getters.isAuth;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
<style scoped>
  .logout {
    background-color: transparent;
    padding: 0;
    margin: 0;
    color: #fff;
    border: none;
    font: inherit;
    cursor: pointer;
  }
  .logout:hover {
    color: #fa923f;
  }
  .header {
    height: 56px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    background-color: #1a4c52;
    padding: 0 20px;
  }
  .logo {
    font-weight: bold;
    color: white;
  }
  .logo a {
    text-decoration: none;
    color: white;
  }
  nav {
    height: 100%;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }
  li {
    margin: 0 16px;
  }
  li a {
    text-decoration: none;
    color: white;
  }
  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }
</style>
