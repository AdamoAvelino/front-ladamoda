<template>
  <modal-component
    size="md"
    title="Cadastro de Categoria"
    modalId="register-category"
    modalIdDependent="add-product"
  >
    <form-category slot="body"></form-category>
  </modal-component>
</template>

<script>
import ModalComponent from "../../../components/ModalComponent.vue";
import FormCategory from "../../category/screens/FormCategory.vue";

export default {
  name: "ModalCategory",
  components: {
    ModalComponent,
    FormCategory
  },

  methods: {}
};
</script>
