<template>
  <div class="shadow-la p-2 bg-white" slot="body">
    <form class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="">Categoria</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Digite uma nova categoria"
            v-model="category.name"
            :class="required.name"
          />
        </div>
      </div>
    </form>
    <button
      class="btn btn-primary btn-sm mt-2"
      slot="footer"
      v-on:click="saveCategory"
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
  name: "FormCategory",
  data: () => {
    return {
      category: {
        id: "",
        name: ""
      },
      required: {
        name: { "is-invalid": false }
      }
    };
  },

  computed: {
    ...mapState("categories", ["categories"])
  },
  methods: {
    ...mapActions("categories", ["ActionAddCategory"]),
    saveCategory: function() {
      const validation = this.$formValidate(this.category, this.required);
      this.required = validation.validation;

      if (validation.validate) {
        services.categories
          .registerCategory(this.category)
          .then(category => {
            this.category.id = category.data.id;
            this.ActionAddCategory(this.category);
            this.$root.$emit("Hide::Modal", "register-category");
            this.category.name = "";
            this.category.id = 0;
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
