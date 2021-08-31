<template>
  <ModalComponent id="register-vendor" size="lg" title="Cadastrar Fornecedor">
    <div class="shadow-la p-2 bg-white" slot="body">
      <form class="row">
        <div class="form-group col-3">
          <label for="">Nome</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Digite o nome"
            v-model="vendor.name"
          />
        </div>
        <div class="form-group col-3">
          <label for="">CNPJ</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Digite o CNPJ"
            v-model="vendor.cnpj"
          />
        </div>
        <div class="form-group col-3">
          <label for="">E-mail</label>
          <input
            type="email"
            class="form-control form-control-sm"
            placeholder="Digite o E-mail"
            v-model="vendor.email"
          />
        </div>
        <div class="form-group col-3">
          <label for="">Telefone</label>
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Digite o Telefone"
            v-model="vendor.telephone"
          />
        </div>
      </form>
    </div>
    <div class="col-12" slot="footer">
      <button class="btn btn-sm btn-primary" v-on:click="saveFornecedor">
        <i class="fas fa-save mr-1"></i>
        Salvar
      </button>
    </div>
  </ModalComponent>
</template>

<script>
import ModalComponent from "../../../components/ModalComonent.vue";
import { mapActions } from "vuex";
export default {
  name: "ModalVendor",
  components: {
    ModalComponent
  },

  data: () => {
    return {
      vendor: {
        name: "",
        cnpj: "",
        telephone: "",
        email: ""
      }
    };
  },

  methods: {
    ...mapActions("vendors", ["ActionSetVendor"]),

    saveFornecedor: () => {
      this.ActionSetVendor(this.vendor);
    }
  }
};
</script>
