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
    <div class="row mt-3">
      <div class="col-4">
        <div class="bg-primary shadow-la">
          <div class="row py-2">
            <div class="col-6 d-flex justify-content-center align-items-center">
              <span class="text-display">
                Total
              </span>
            </div>
            <div class="col-6 d-flex justify-content-center align-items-center">
              <span>R$ 1.500,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <table class="table table-sm bg-white shadow-la">
          <thead class="bg-primary text-white">
            <tr>
              <th>Código</th>
              <th>Nome</th>
              <th>Tamnho</th>
              <th>Cor</th>
              <th>Estampa</th>
              <th>Qtd</th>
              <th>Valor</th>
              <th>Subtotal</th>
              <th>Modalidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in purchase.items_purchase" :key="index">
              <td>{{ item.product.code }}</td>
              <td>{{ item.product.name }}</td>
              <td>{{ item.grade.size.name }}</td>
              <td>{{ item.grade.color.name }}</td>
              <td>{{ item.grade.print.name }}</td>
              <td>{{ item.quantity }}</td>
              <td v-moeda-br="item.product.cost_value"></td>
              <td v-moeda-br="item.product.cost_value * item.quantity"></td>
              <td>{{ item.product.modality.name }}</td>
              <td>
                <!-- <router-link
                  :to="{ name: '', params: { id: item.order_purchase_id } }"
                >
                  <i class="fas fa-edit"></i>
                </router-link> -->

                <a href="#" class="ml-2" v-on:click="removeProduct(index)">
                  <i class="fas fa-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <modal-vendor />
    <modal-product :enableFieldsProduct="enableFieldsProduct" />
  </div>
</template>

<script>
import InfoPageComponent from "../../../components/InfoPageComponent.vue";
import ModalVendor from "./ModalVendor.vue";
import ModalProduct from "./ModalProduct.vue";
import services from "../../../http";
import { mapState, mapActions } from "vuex";
export default {
  name: "FormPurchase",
  components: {
    ModalVendor,
    ModalProduct,
    InfoPageComponent
  },

  data: () => {
    return {
      enableFieldsProduct: false,
      required: {
        vendor: { "is-invalid": false },
        date: { "is-invalid": false }
      }
    };
  },

  methods: {
    ...mapActions("vendors", ["ActionSetVendorList"]),
    ...mapActions("products", ["ActionResetProduct"]),
    ...mapActions("orderpurchase", ["ActionRemoveProductPurchase"]),

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
        this.enableFieldsProduct = !this.enableFieldsProduct;
        this.$root.$emit("Show::Modal", "add-product");
      }
    },

    removeProduct: function(position) {
      this.ActionRemoveProductPurchase(position);
    }
  },

  mounted() {
    services.vendors.listVendors().then(vendor => {
      this.ActionSetVendorList(vendor.data);
    });
  },

  computed: {
    ...mapState("orderpurchase", ["purchase"]),
    ...mapState("vendors", ["vendors"])
  }
};
</script>
