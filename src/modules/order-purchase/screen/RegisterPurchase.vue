<template>
  <form-purchase />
</template>

<script>
import FormPurchase from "./FormPurchase";
import { mapActions } from "vuex";
export default {
  name: "RegisterPurchase",
  components: {
    FormPurchase
  },

  methods: {
    ...mapActions("orderpurchase", ["ActionSetPurchase"])
  },

  beforeMount() {
    this.ActionSetPurchase({ vendor: { id: 0 }, date: "" });
  }
};
</script>
