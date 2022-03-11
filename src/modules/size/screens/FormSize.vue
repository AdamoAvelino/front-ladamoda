<template>
  <div class="shadow-la p-2 bg-white" slot="body">
    <form class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="">Tamanho</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Digite um novo tamanho"
            v-model="size.name"
            :class="required.name"
          />
        </div>
      </div>
    </form>
    <button class="btn btn-primary btn-sm" slot="footer" v-on:click="saveSize">
      <i class="fas fa-save mr-2"></i>
      Salvar
    </button>
  </div>
</template>

<script>
import services from "../../../http";
import { mapState, mapActions } from "vuex";

export default {
  name: "FormSize",
  data: () => {
    return {
      size: {
        id: "",
        name: ""
      },
      required: {
        name: { "is-invalid": false }
      }
    };
  },

  computed: {
    ...mapState("sizes", ["sizes"])
  },

  methods: {
    ...mapActions("sizes", ["ActionAddSize"]),

    saveSize: function() {
      const validation = this.$formValidate(this.size, this.required);
      this.required = validation.validation;

      if (validation.validate) {
        services.sizes
          .registerSize(this.size)
          .then(size => {
            this.size.id = size.data.id;
            this.ActionAddSize(this.size);
            this.$root.$emit("Hide::Modal", "cadastro-tamanho");
            this.size.name = "";
            this.size.id = 0;
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
