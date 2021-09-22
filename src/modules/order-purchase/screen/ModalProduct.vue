<template>
  <div>
    <modal-component modalId="add-product" size="xl" title="Adicionar Produto">
      <div class="shadow-la bg-white p-2 mb-3" slot="body">
        <div class="row">
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
              <label class="custom-control-label" for="productcode"
                >Código</label
              >
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
      <div class="shadow-la bg-white p-2" slot="body">
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
              :disabled="disabled"
              v-model="product.ncm"
            />
          </div>
          <div class="col-3">
            <label for="">Categoria</label>
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <button
                  :disabled="disabled"
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
                :disabled="disabled"
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
              :disabled="disabled"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <label for="">Modalidade</label>
            <div class="input-group input-group-sm">
              <div class="input-group-prepend">
                <button
                  :disabled="disabled"
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
                :disabled="disabled"
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
                :disabled="disabled"
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
                :disabled="disabled"
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
                :disabled="disabled"
              />
            </div>
          </div>
        </div>

        <div class="row mt-2">
          <div class="col-4 offset-8 text-right">
            <button
              class="btn btn-primary btn-sm"
              :class="editProductEnable"
              v-on:click="editProduct"
            >
              <i class="fas fa-edit"></i>
              Editar
            </button>
            <button
              class="btn btn-primary btn-sm"
              :class="newProductEnable"
              v-on:click="newProduct"
              slot="footer"
            >
              <i class="fas fa-check-square"></i>
              Novo Produto
            </button>
            <button
              class="btn btn-primary btn-sm"
              :class="saveProductEnable"
              v-on:click="saveProduct"
            >
              <i class="fas fa-save"></i>
              Salvar
            </button>
          </div>
        </div>
      </div>

      <form-grade slot="body" />

      <button
        class="btn btn-primary btn-sm"
        v-on:click="includePurchase"
        slot="footer"
      >
        <i class="fas fa-check-square"></i>
        Incluir
      </button>
    </modal-component>
    <modal-size></modal-size>
    <modal-color></modal-color>
    <modal-print></modal-print>
    <modal-category></modal-category>
    <modal-modality></modal-modality>
  </div>
</template>
<script>
import ModalSize from "./ModalSize.vue";
import ModalColor from "./ModalColor.vue";
import ModalPrint from "./ModalPrint.vue";
import ModalCategory from "../../category/screens/ModalCategory.vue";
import ModalModality from "../../modality/screens/ModalModality.vue";
import ModalComponent from "./../../../components/ModalComponent.vue";
import FormGrade from "../../grade/screens/FormGrade.vue";
import { mapActions, mapState } from "vuex";
import services from "../../../http";
export default {
  name: "ModalProduct",
  components: {
    ModalComponent,
    ModalSize,
    ModalColor,
    ModalPrint,
    ModalCategory,
    ModalModality,
    FormGrade
  },
  props: ["enableFieldsProduct"],
  computed: {
    ...mapState("orderpurchase", ["purchase"]),
    ...mapState("products", ["product"]),
    ...mapState("categories", ["categories"]),
    ...mapState("modalities", ["modalities"])
  },

  watch: {
    enableFieldsProduct: function() {
      this.product.code == "" ? this.resetForm() : null;
      return true;
    }
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
      search: "",
      searchParameter: "code",
      disabled: false,
      editProductEnable: "d-none",
      saveProductEnable: "d-none",
      enableSearch: true,
      orderpurchase: {},
      newProductEnable: "",

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
    ...mapActions("orderpurchase", ["ActionAddItem"]),
    ...mapActions("products", ["ActionResetProduct"]),
    ...mapActions("categories", ["ActionSetCategories"]),
    ...mapActions("modalities", ["ActionSetModalities"]),

    editProduct: function() {
      this.disabled = false;
      this.enableSearch = false;
      this.saveProductEnable = "";
      this.newProductEnable = "d-none";
      this.editProductEnable = "d-none";
    },

    saveProduct: function() {
      this.saveProductEnable = "d-none";
      this.disabled = true;
      this.enableSearch = true;
      this.newProductEnable = "d-none";
      this.editProductEnable = "";
    },

    resetForm: function() {
      this.search = "";
      this.searchParameter = "code";
      this.disabled = false;
      this.editProductEnable = "d-none";
      this.saveProductEnable = "d-none";
      this.enableSearch = true;
      this.orderpurchase = {};
      this.newProductEnable = "";
    },

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
            this.saveProduct();
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
      this.$root.$emit("Hide::Modal", "add-product");
      /**
       *  @todo
       * Incluir mensagem de sucesso
       */
    },

    searchProduct: function() {
      if (this.enableSearch) {
        services.products
          .searchProduct({
            parameter: this.searchParameter,
            value: this.search
          })
          .then(product => {
            this.ActionResetProduct();
            this.disabled = false;
            this.editProductEnable = "d-none";
            this.newProductEnable = "";
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
