<template>
  <ModalComponent id="register-vendor" size="lg" title="Cadastrar Fornecedor">
    <div class="shadow-la p-2 bg-white" slot="body">
      <form class="row">
        <div class="form-group col-3">
          <label for="">Nome</label>
          <input
            type="text"
            class="form-control form-control-sm"
            :class="required.name"
            placeholder="Digite o nome"
            v-model="vendor.name"
          />
        </div>
        <div class="form-group col-3">
          <label for="">CNPJ</label>
          <input
            type="number"
            class="form-control form-control-sm"
            :class="required.cnpj"
            placeholder="Digite o CNPJ"
            v-model="vendor.cnpj"
          />
        </div>
        <div class="form-group col-3">
          <label for="">E-mail</label>
          <input
            type="email"
            class="form-control form-control-sm"
            :class="required.email"
            placeholder="Digite o E-mail"
            v-model="vendor.email"
          />
        </div>
        <div class="form-group col-3">
          <label for="">Telefone</label>
          <input
            type="number"
            class="form-control form-control-sm"
            :class="required.telephone"
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
import services from "../../../http";
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
        email: "",
        telephone: ""
      },
      required: {
        name: { "is-invalid": false },
        cnpj: { "is-invalid": false },
        email: { "is-invalid": false },
        telephone: { "is-invalid": false }
      }
    };
  },

  methods: {
    ...mapActions("vendors", ["ActionSetVendor"]),
    ...mapActions("orderpurchase", ["ActionAlterVendor"]),

    saveFornecedor: function() {
      let validation = this.formValidate(this.vendor, this.required);
      this.required = validation.validation;

      if (validation.validate) {
        this.vendor.telephone = parseInt(this.vendor.telephone);
        this.vendor.cnpj = parseInt(this.vendor.cnpj);
        services.vendors.registerVendor(this.vendor).then(response => {
          const id = response.data.id;
          this.vendor.id = id;
          this.ActionSetVendor(this.vendor);
          this.ActionAlterVendor(this.vendor);
          this.$root.$emit("Hide::Modal", "register-vendor");
        });
      }
    },

    formValidate: function(datas, validation) {
      let validate = true;
      Object.keys(datas).forEach(value => {
        validation[value] ? (validation[value]["is-invalid"] = false) : null;
        if (!datas[value] && validation[value]) {
          validation[value]["is-invalid"] = true;
          validate = false;
        }
      });

      return {
        validate,
        validation
      };
    }
  }
};
</script>
