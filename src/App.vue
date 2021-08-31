<template>
  <div id="app">
    <nav-bar-component />
    <router-view />
  </div>
</template>

<script>
// window.localStorage.removeItem('vuex') para atualização de variaveis de vue persistence
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
