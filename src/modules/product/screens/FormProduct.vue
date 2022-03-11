<template>
  <div class="shadow-la bg-white p-2">
    <div class="row">
      <div class="col-3">
        <div class="form-group">
          <label for="">Código</label>
          <input
            type="text"
            class="form-control form-control-sm"
            :class="requiredProduct.code"
            placeholder=""
            v-model="product.code"
          />
        </div>
      </div>
      <div class="col-3">
        <label for="">SKU</label>
        <input
          type="text"
          class="form-control form-control-sm"
          :class="requiredProduct.code_sku"
          placeholder=""
          v-model="product.code_sku"
        />
      </div>
      <div class="col-3">
        <label for="">NCM</label>
        <input
          type="number"
          class="form-control form-control-sm"
          :class="requiredProduct.ncm"
          placeholder=""
          v-model="product.ncm"
        />
      </div>
      <div class="col-3">
        <label for="">Categoria</label>
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <button
              v-on:click="addCategory"
              class="btn btn-primary btn-sm"
              type="button"
              aria-label=""
            >
              <i class="fas fa-plus-square"></i>
            </button>
          </div>
          <select
            class="form-control form-control-sm"
            :class="requiredProduct.category"
            v-model="product.category.id"
          >
            <option value="">Selecione</option>
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <label for="">Produto</label>
        <input
          type="text"
          class="form-control form-control-sm"
          :class="requiredProduct.name"
          placeholder=""
          v-model="product.name"
        />
      </div>
      <div class="col-6">
        <label for="">Composição</label>
        <input
          type="text"
          class="form-control form-control-sm"
          :class="requiredProduct.composition"
          placeholder=""
          v-model="product.composition"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <label for="">Modalidade</label>
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <button
              v-on:click="addModality"
              class="btn btn-primary btn-sm"
              type="button"
              aria-label=""
            >
              <i class="fas fa-plus-square"></i>
            </button>
          </div>
          <select
            class="form-control form-control-sm"
            :class="requiredProduct.modality"
            v-model="product.modality.id"
          >
            <option value="">Selecione</option>
            <option
              v-for="(modality, index) in modalities"
              :key="index"
              :value="modality.id"
            >
              {{ modality.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-3">
        <label for="">Valor</label>
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <span class="input-group-text bg-primary text-white">R$</span>
          </div>
          <input
            type="number"
            class="form-control form-control-sm"
            :class="requiredProduct.cost_value"
            placeholder=""
            v-model="product.cost_value"
          />
        </div>
      </div>

      <div class="col-3">
        <label for="">Procentagem</label>
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <span class="input-group-text bg-primary text-white">%</span>
          </div>
          <input
            type="number"
            class="form-control form-control-sm"
            :class="requiredProduct.profit_porcentage"
            placeholder=""
            v-model="product.profit_porcentage"
          />
        </div>
      </div>
      <div class="col-3">
        <label for="">Valor de Venda</label>
        <div class="input-group input-group-sm">
          <div class="input-group-prepend">
            <span class="input-group-text bg-primary text-white">
              R$
            </span>
          </div>
          <input
            type="number"
            class="form-control form-control-sm"
            :class="requiredProduct.sale_value"
            placeholder=""
            v-model="product.sale_value"
          />
        </div>
      </div>
    </div>

    <div class="row mt-2">
      <div class="col-4 offset-8 text-right">
        <button class="btn btn-primary btn-sm">
          <i class="fas fa-edit"></i>
          Editar
        </button>
        <button
          class="btn btn-primary btn-sm"
          v-on:click="newProduct"
          slot="footer"
        >
          <i class="fas fa-check-square"></i>
          Novo Produto
        </button>
        <button class="btn btn-primary btn-sm">
          <i class="fas fa-save"></i>
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import services from "../../../http";
export default {
  name: "FormProduct",
  props: ["enableFieldsProduct"],

  computed: {
    ...mapState("products", ["product"]),
    ...mapState("categories", ["categories"]),
    ...mapState("modalities", ["modalities"])
  },

  beforeMount() {
    this.ActionResetProduct();
  },

  mounted() {
    this.listCategories();
    this.listModalities();
  },

  data: () => {
    return {
      orderpurchase: {},

      requiredProduct: {
        code: { "is-invalid": false },
        code_sku: { "is-invalid": false },
        ncm: { "is-invalid": false },
        category: { "is-invalid": false },
        name: { "is-invalid": false },
        composition: { "is-invalid": false },
        modality: { "is-invalid": false },
        cost_value: { "is-invalid": false },
        profit_porcentage: { "is-invalid": false },
        sale_value: { "is-invalid": false }
      }
    };
  },

  methods: {
    ...mapActions("products", ["ActionSetProduct"]),
    ...mapActions("products", ["ActionResetProduct"]),
    ...mapActions("categories", ["ActionSetCategories"]),
    ...mapActions("modalities", ["ActionSetModalities"]),

    newProduct: function() {
      let formForValidation = { ...this.product };

      let validation = this.$formValidate(
        formForValidation,
        this.requiredProduct
      );
      this.requiredProduct = validation.validation;

      if (validation.validate) {
        delete formForValidation.id;
        delete formForValidation.grade;

        formForValidation.start_date = this.purchase.date;
        formForValidation.vendor = this.purchase.vendor.id;
        formForValidation.category = this.product.category.id;
        formForValidation.modality = this.product.modality.id;
        services.products
          .registerProduct(formForValidation)
          .then(productId => {
            let modality = this.modalities.filter(modality => {
              return modality.id == this.product.modality.id;
            });

            let category = this.categories.filter(category => {
              return category.id == this.product.category.id;
            });

            this.product.id = productId.data.id;
            this.product.modality.name = modality[0].name;
            this.product.category.name = category[0].name;
            this.product.grade = [];
            this.ActionSetProduct(this.product);
            /**@todo
             * incluir mensagem de sucesso
             */
          })
          .catch(error => {
            error;
            /**@todo
             * incluir mensagem de erro
             */
          });
      }
    },

    listCategories: function() {
      services.categories.listCategories().then(categories => {
        this.ActionSetCategories(categories.data);
      });
    },

    listModalities: function() {
      services.modalities.listModalities().then(modalities => {
        this.ActionSetModalities(modalities.data);
      });
    },

    addCategory: function() {
      this.$root.$emit("Show::Modal", "register-category");
    },

    addModality: function() {
      this.$root.$emit("Show::Modal", "register-modality");
    }
  }
};
</script>
