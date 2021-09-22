<template>
  <modal-component
    size="md"
    title="Cadastro de Modalidade"
    modalId="register-modality"
    modalIdDependent="add-product"
  >
    <form-modality slot="body" />
  </modal-component>
</template>

<script>
import ModalComponent from "../../../components/ModalComponent.vue";
import FormModality from "../../modality/screens/FormModality.vue";

export default {
  name: "ModalModality",
  components: {
    ModalComponent,
    FormModality
  }
};
</script>
