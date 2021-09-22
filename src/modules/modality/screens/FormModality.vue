<template>
  <div class="shadow-la p-2 bg-white" slot="body">
    <form class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="">Modalidade</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Digite uma nova modalidade"
            v-model="modality.name"
            :class="required.name"
          />
        </div>
      </div>
    </form>
    <button
      class="btn btn-primary btn-sm mt-2"
      slot="footer"
      v-on:click="saveModality"
    >
      <i class="fas fa-save mr-2"></i>
      Salvar
    </button>
  </div>
</template>
<script>
import services from "../../../http";
import { mapState, mapActions } from "vuex";
export default {
  data: () => {
    return {
      modality: {
        id: "",
        name: ""
      },
      required: {
        name: { "is-invalid": false }
      }
    };
  },

  computed: {
    ...mapState("modalities", ["modalities"])
  },

  methods: {
    ...mapActions("modalities", ["ActionAddModality"]),

    saveModality: function() {
      const validation = this.$formValidate(this.modality, this.required);
      this.required = validation.validation;

      if (validation.validate) {
        delete this.modality.id;
        services.modalities
          .registerModality(this.modality)
          .then(modality => {
            this.modality.id = modality.data.id;
            this.ActionAddModality(this.modality);
            this.$root.$emit("Hide::Modal", "register-modality");
            this.modality.name = "";
            this.modality.id = 0;
            /** @todo
             * incluir mensagem de sucesso
             */
          })
          .catch(erro => {
            erro;
            /**
             * @todo
             * Incluir mensagem de erro
             */
          });
      }
    }
  }
};
</script>
