<template>
  <div class="container-fluid">
    <div class="row mt-2">
      <info-page-component>
        <h3 slot="title" class="text-center">
          Pedido
        </h3>
        <h1 slot="icon">
          <i class="fas fa-tshirt mr-1"></i>
        </h1>
      </info-page-component>
      <div class="col-10 d-flex">
        <div class="bg-white flex-fill shadow-la">
          <div class="row p-2 w-100">
            <div class="col-3">
              <label for="">Fornecedor</label> <br />
              <div class="input-group input-group-sm">
                <span class="input-group-prepend">
                  <button
                    class="btn btn-primary btn-sm"
                    type="button"
                    aria-label=""
                    v-on:click="registerVendor"
                  >
                    <i class="fas fa-plus-square"></i>
                  </button>
                </span>

                <select
                  v-if="purchase"
                  class="form-control form-control-sm"
                  :class="required.vendor"
                  v-model="purchase.vendor.id"
                >
                  <option :value="0">Selecione</option>
                  <option
                    v-for="(vendor, index) in vendors"
                    :key="index"
                    :value="vendor.id"
                  >
                    {{ vendor.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-3">
              <label>Data</label>
              <input
                type="date"
                class="form-control form-control-sm"
                v-model="purchase.date"
                :class="required.date"
              />
            </div>
            <div class="col-2 d-flex align-items-end">
              <button class="btn btn-sm btn-primary" v-on:click="addProduct">
                <i class="fas fa-tshirt mr-1"></i>
                <span>Add Produto</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <search-product class="mt-3" />
    <list-purchase-item />
    <modal-vendor />
    <modal-product />
    <modal-component
      size="md"
      title="Cadastro de Tamanhos"
      modalId="cadastro-tamanho"
    >
      <form-size slot="body" />
    </modal-component>

    <modal-component modalId="register-color" size="sm" title="Cadastro de Cor">
      <form-color slot="body" />
    </modal-component>

    <modal-component
      size="sm"
      title="Cadastro de Estampas"
      modalId="register-print"
    >
      <form-print slot="body"></form-print>
    </modal-component>
  </div>
</template>

<script>
import InfoPageComponent from "../../../components/InfoPageComponent.vue";

import SearchProduct from "../Components/SearchProduct.vue";
import ListPurchaseItem from "../Components/ListPurchaseItem.vue";
import ModalVendor from "./ModalVendor.vue";
import ModalComponent from "./../../../components/ModalComponent.vue";
import ModalProduct from "./ModalProduct.vue";
import FormSize from "../../size/screens/FormSize.vue";
import FormColor from "../../color/screens/FormColor.vue";
import FormPrint from "../../print/screen/FormPrint.vue";

import services from "../../../http";
import { mapState, mapActions } from "vuex";

export default {
  name: "FormPurchase",
  components: {
    FormSize,
    FormColor,
    FormPrint,
    ModalComponent,
    ModalVendor,
    SearchProduct,
    ListPurchaseItem,
    ModalProduct,
    InfoPageComponent
  },

  computed: {
    ...mapState("orderpurchase", ["purchase"]),
    ...mapState("vendors", ["vendors"])
  },

  mounted() {
    services.vendors.listVendors().then(vendor => {
      this.ActionSetVendorList(vendor.data);
    });
  },

  data: () => {
    return {
      required: {
        vendor: { "is-invalid": false },
        date: { "is-invalid": false }
      }
    };
  },

  methods: {
    ...mapActions("vendors", ["ActionSetVendorList"]),
    ...mapActions("products", ["ActionResetProduct"]),

    registerVendor: function() {
      this.$root.$emit("Show::Modal", "register-vendor");
    },

    addProduct: function() {
      let form = {};
      form.vendor = this.purchase.vendor.id;
      form.date = this.purchase.date;
      let validation = this.$formValidate(form, this.required);
      this.required = validation.validation;

      if (validation.validate) {
        this.ActionResetProduct();
        this.$root.$emit("Show::Modal", "add-product");
      }
    }
  }
};
</script>
