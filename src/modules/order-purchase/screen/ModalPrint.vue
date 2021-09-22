<template>
  <modal-component
    size="sm"
    title="Cadastro de Estampas"
    modalId="register-print"
    modalIdDependent="add-product"
  >
    <div class="shadow-la p-2 bg-white" slot="body">
      <form class="row">
        <div class="col-12">
          <div class="form-group">
            <label for="">Estampa</label>
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="Digite uma nova estampa"
              v-model="print.name"
              :class="required.name"
            />
          </div>
        </div>
      </form>
    </div>
    <button class="btn btn-primary btn-sm" slot="footer" v-on:click="savePrint">
      <i class="fas fa-save mr-2"></i>
      Salvar
    </button>
  </modal-component>
</template>

<script>
import ModalComponent from "../../../components/ModalComponent.vue";
import services from "../../../http";
import { mapState, mapActions } from "vuex";
export default {
  name: "ModalPrint",
  components: {
    ModalComponent
  },

  data: () => {
    return {
      print: {
        id: "",
        name: ""
      },
      required: {
        name: { "is-invalid": false }
      }
    };
  },

  computed: {
    ...mapState("prints", ["prints"])
  },

  methods: {
    ...mapActions("prints", ["ActionAddPrint"]),

    savePrint: function() {
      const validation = this.$formValidate(this.print, this.required);
      this.required = validation.validation;

      if (validation.validate) {
        services.prints
          .registerPrint(this.print)
          .then(print => {
            this.print.id = print.data.id;
            this.ActionAddPrint(this.print);
            this.$root.$emit("Hide::Modal", "register-print");
            this.print.name = "";
            this.print.id = 0;
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
