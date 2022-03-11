<template>
  <section>
    <div class="shadow-la bg-white p-2 mb-3">
      <div class="row">
        <div class="col-2" v-if="product.id">
          <button
            v-if="addProductButton"
            class="btn btn-primary btn-sm mr-1"
            v-on:click="includePurchase"
          >
            <i class="fas fa-check-square mr-1"></i>
            Produto
          </button>
          <button
            v-else
            class="btn btn-primary btn-sm mr-1"
            v-on:click="updateItemPurchase"
          >
            <i class="fas fa-save mr-1"></i>
            Produto
          </button>
          <button class="btn btn-primary btn-sm" v-on:click="cancelProduct">
            <i class="fas fa-window-close mr-1"></i>
            Cancelar
          </button>
        </div>
        <div class="col-3">
          <div class="input-group input-group-sm">
            <input
              type="text"
              class="form-control form-control-sm"
              v-model="search"
              placeholder="Pesquisar"
            />
            <div class="input-group-append">
              <button
                v-on:click="searchProduct"
                class="btn btn-primary btn-sm"
                type="button"
                aria-label=""
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="col-6 d-flex align-items-center">
          <div class="custom-control custom-radio custom-control-inline">
            <input
              id="productcode"
              type="radio"
              class="custom-control-input"
              name="search"
              value="code"
              v-model="searchParameter"
            />
            <label class="custom-control-label" for="productcode">Código</label>
          </div>
          <div class="custom-control custom-radio custom-control-inline">
            <input
              id="productname"
              type="radio"
              class="custom-control-input"
              name="search"
              value="name"
              v-model="searchParameter"
            />
            <label class="custom-control-label" for="productname"
              >Nome do Produto</label
            >
          </div>
        </div>
      </div>
    </div>
    <form-grade v-if="product.id" />
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
import services from "../../../http";
import FormGrade from "../../grade/screens/FormGrade.vue";

export default {
  components: {
    FormGrade
  },
  computed: {
    ...mapState("products", ["product"]),
    ...mapState("orderpurchase", ["addProductButton"])
  },

  data: () => {
    return {
      search: "",
      searchParameter: "code"
    };
  },

  methods: {
    ...mapActions("products", ["ActionResetProduct"]),
    ...mapActions("products", ["ActionSetProduct"]),
    ...mapActions("orderpurchase", ["ActionAddItem"]),
    ...mapActions("orderpurchase", ["ActionControlButtonForm"]),

    searchProduct: function() {
      services.products
        .searchProduct({
          parameter: this.searchParameter,
          value: this.search
        })
        .then(product => {
          this.ActionResetProduct();
          /** @todo altarar o if para a api real */

          if (product.data[this.searchParameter] === this.search) {
            product.data.grade.forEach((element, index) => {
              product.data.grade[index].qtd = 0;
              product.data.grade[index].inList = false;
              this.editProductEnable = "";
              this.newProductEnable = "d-none";
            });

            this.ActionSetProduct(product.data);

            this.disabled = Object.keys(product.data).length ? true : false;
            return;
          }
          /**
           * @todo implementar mensagem de não encontrado
           */
          this.product[this.searchParameter] = this.search;
        });
    },

    includePurchase: function() {
      const gradeIsZero = this.product.grade.filter(grade => grade.qtd === 0);
      const hasGrade = this.product.grade.length;
      if (!hasGrade || hasGrade === gradeIsZero.length) {
        /**
         *  @todo
         * inplementar mensagem de erro.
         *
         */
        alert("Sem Grade");
        return;
      }

      this.product.grade.map(grade => {
        let item = {};
        if (grade.qtd > 0) {
          item.quantity = grade.qtd;
          item.grade = grade;
          item.product = this.product;
          this.ActionAddItem(item);
        }
      });

      this.ActionResetProduct();
      this.search = "";
      this.$root.$emit("Hide::Modal", "add-product");
      /**
       *  @todo
       * Incluir mensagem de sucesso
       */
    },

    updateItemPurchase: function() {},

    cancelProduct: function() {
      this.ActionResetProduct();
      this.ActionControlButtonForm(true);
      this.search = "";
    }
  }
};
</script>
