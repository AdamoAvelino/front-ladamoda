<template>
  <div>
    <modal-component modalId="add-product" size="xl" title="Adicionar Produto">
      <form-product slot="body" />
      <form-grade slot="body" />
    </modal-component>

    <modal-component
      size="md"
      title="Cadastro de Categoria"
      modalId="register-category"
      modalIdDependent="add-product"
    >
      <form-category slot="body"></form-category>
    </modal-component>

    <modal-component
      size="md"
      title="Cadastro de Modalidade"
      modalId="register-modality"
      modalIdDependent="add-product"
    >
      <form-modality slot="body" />
    </modal-component>
  </div>
</template>
<script>
import FormCategory from "../../category/screens/FormCategory.vue";
import FormModality from "../../modality/screens/FormModality.vue";
import FormProduct from "../../product/screens/FormProduct.vue";
import ModalComponent from "./../../../components/ModalComponent.vue";
import FormGrade from "../../grade/screens/FormGrade.vue";
import { mapActions, mapState } from "vuex";
// import services from "../../../http";
export default {
  name: "ModalProduct",
  components: {
    ModalComponent,
    FormProduct,
    FormCategory,
    FormModality,
    FormGrade
  },
  computed: {
    ...mapState("orderpurchase", ["purchase"]),
    ...mapState("products", ["product"])
  },

  beforeMount() {},

  data: () => {
    return {
      orderpurchase: {}
    };
  },

  methods: {
    ...mapActions("products", ["ActionResetProduct"]),
    ...mapActions("products", ["ActionSetProduct"])
  }
};
</script>
