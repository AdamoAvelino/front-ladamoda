<template>
  <section>
    <header class="row mt-3">
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
    </header>
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
                <a
                  href="#"
                  class="ml-2"
                  v-on:click="editProduct(item.product.code)"
                >
                  <i class="fas fa-edit"></i>
                </a>

                <a href="#" class="ml-2" v-on:click="removeProduct(index)">
                  <i class="fas fa-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("orderpurchase", ["purchase"])
  },

  methods: {
    ...mapActions("products", ["ActionResetProduct"]),
    ...mapActions("products", ["ActionSetProduct"]),
    ...mapActions("orderpurchase", ["ActionControlButtonForm"]),

    ...mapActions("orderpurchase", ["ActionRemoveProductPurchase"]),
    removeProduct: function(position) {
      this.ActionRemoveProductPurchase(position);
    },

    editProduct: function(code) {
      let productEdit = {};
      const products = this.$store.getters["orderpurchase/getItemPurchase"](
        code
      );

      productEdit.id = products[0].product.id;
      productEdit.code = products[0].product.code;
      productEdit.code_sku = products[0].product.code_sku;
      productEdit.name = products[0].product.name;
      productEdit.composition = products[0].product.composition;
      productEdit.profit_porcentage = products[0].product.profit_porcentage;
      productEdit.cost_value = products[0].product.cost_value;
      productEdit.sale_value = products[0].product.sale_value;
      productEdit.start_date = products[0].product.start_date;
      productEdit.ncm = products[0].product.ncm;
      productEdit.category = products[0].product.category;
      productEdit.modality = products[0].product.modality;
      productEdit.vendor = products[0].product.vendor;
      productEdit.grade = [];

      products.map(product => {
        productEdit.grade.push(product.grade);
      });

      this.ActionSetProduct(productEdit);
      this.ActionControlButtonForm(false);
    }
  }
};
</script>
