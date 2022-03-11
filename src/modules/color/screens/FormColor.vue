<template>
  <div class="shadow-la p-2 bg-white" slot="body">
    <form class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="">Cor</label>
          <input
            type="text"
            class="form-control form-control-sm"
            :class="required.name"
            placeholder="Digite uma cor"
            v-model="color.name"
          />
        </div>
      </div>
    </form>
    <button class="btn btn-sm btn-primary" slot="footer" v-on:click="saveColor">
      <i class="fas fa-save mr-2"></i>
      Salvar
    </button>
  </div>
</template>

<script>
import services from "../../../http";
import { mapActions } from "vuex";
export default {
  data: () => {
    return {
      color: {
        name: ""
      },
      required: {
        name: { "is-invalid": false }
      }
    };
  },

  methods: {
    ...mapActions("colors", ["ActionAddColor"]),

    saveColor: function() {
      const validation = this.$formValidate(this.color, this.required);
      this.required = validation.validation;

      if (validation.validate) {
        services.colors
          .registerColor(this.color)
          .then(color => {
            this.color.id = color.data.id;
            this.ActionAddColor(this.color);
            this.$root.$emit("Hide::Modal", "register-color");
            this.color.name = "";
            this.color.id = 0;
            /** @todo
             * Incluir mensagem de sucesso
             */
          })
          .catch(erro => {
            erro;
            /**
             * @todo
             * Implementar mensagem de erro
             */
          });
      }
    }
  }
};
</script>
