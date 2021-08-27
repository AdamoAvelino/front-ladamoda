<template>
  <div id="app">
    <nav-bar-component />
    <router-view />
  </div>
</template>

<script>
import NavBarComponent from "../src/components/NavbarComponent.vue";
export default {
  components: {
    NavBarComponent
  }
};
</script>

<style lang="scss">
body {
  background: var(--light);
}
</style>
