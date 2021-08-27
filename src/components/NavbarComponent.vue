<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      <img src="../assets/images/logo.png" style="width: 25px" alt="" />
    </router-link>
    <a class="navbar-brand" href="#">
      <!-- brand -->
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li v-for="(route, key) in routes" class="nav-item" :key="key">
          <router-link
            class="nav-link"
            exact
            exact-active-class="active"
            :to="{ name: route.name }"
          >
            {{ route.meta.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBarComponent",
  computed: {
    routes() {
      return this.$router.options.routes;
      // return this.$router.options.routes.filter(route => {
      //   return route.meta.showMenu;
      // });
    }
  },

  methods: {}
};
</script>
