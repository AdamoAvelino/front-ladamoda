<template>
  <form-purchase />
</template>

<script>
import services from "../../../http";
import FormPurchase from "./FormPurchase.vue";
import { mapActions } from "vuex";
export default {
  name: "UpdatePurchase",
  components: {
    FormPurchase
  },

  methods: {
    ...mapActions("orderpurchase", ["ActionSetPurchase"])
  },

  async beforeMount() {
    const id = this.$route.params.id;
    await services.purchases.showPurchase({ id: id }).then(purchase => {
      this.ActionSetPurchase(purchase.data);
    });
  }
};
</script>
