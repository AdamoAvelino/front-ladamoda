<template>
  <div class="shadow-la bg-white">
    <div class="p-2 mt-3">
      <div class="row">
        <div class="col-12">
          <div class="bg-light p-2 shadow-la">
            <div class="row">
              <div class="col-1 border-right">
                <strong>Código</strong><br />
                <span class="badge badge-primary">{{ product.code }}</span>
              </div>
              <div class="col-3 border-right">
                <strong>Produto</strong><br />
                <span class="badge badge-primary">
                  {{ product.name }}
                </span>
              </div>
              <div class="col-2 border-right">
                <strong>Categoria</strong><br />
                <span class="badge badge-primary">
                  {{ product.category.name }}
                </span>
              </div>
              <div class="col-1 border-right">
                <strong>Modalidade</strong><br />
                <span class="badge badge-primary">
                  {{ product.modality.name }}
                </span>
              </div>
              <div class="col-2 border-right">
                <strong>Valor</strong><br />
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-primary text-white"
                      >R$</span
                    >
                  </div>
                  <input
                    type="number"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="product.cost_value"
                  />
                </div>
              </div>
              <div class="col-1 border-right">
                <strong>Porc. (%)</strong><br />
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <span class="input-group-text bg-primary text-white"
                      >%</span
                    >
                  </div>
                  <input
                    type="number"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="product.profit_porcentage"
                  />
                </div>
              </div>
              <div class="col-2 border-right">
                <strong>Valor Venda</strong><br />
                <span
                  v-moeda-br="product.sale_value"
                  class="badge badge-primary"
                >
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="formGrade === 'd-none'"
          class="col-2"
          v-on:click="toggleFormGrade"
        >
          <button class="btn btn-primary btn-sm mt-2">
            <i class="fas fa-plus-square"></i>
            Grade
          </button>
        </div>
      </div>

      <hr :class="formGrade" />

      <div class="row" :class="formGrade">
        <div class="col-3">
          <label for="">Tamanho</label>
          <div class="input-group input-group-sm">
            <div class="input-group-prepend">
              <button
                class="btn btn-primary btn-sm"
                type="button"
                aria-label=""
                :disabled="!product.id"
                v-on:click="addSize"
              >
                <i class="fas fa-plus-square"></i>
              </button>
            </div>
            <select
              class="form-control form-control-sm"
              :class="requiredGradeForm.size"
              v-model="gradeForm.size"
              :disabled="!product.id"
            >
              <option value="0">Selecione</option>
              <option
                v-for="(size, index) in sizes"
                :key="index"
                :value="size.id"
                >{{ size.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-3">
          <label for="">Cor</label>
          <div class="input-group input-group-sm">
            <div class="input-group-prepend">
              <button
                class="btn btn-primary btn-sm"
                type="button"
                aria-label=""
                :disabled="!product.id"
                v-on:click="addColor"
              >
                <i class="fas fa-plus-square"></i>
              </button>
            </div>
            <select
              class="form-control form-control-sm"
              :class="requiredGradeForm.color"
              v-model="gradeForm.color"
              :disabled="!product.id"
            >
              <option value="0">Selecione</option>
              <option
                v-for="(color, index) in colors"
                :key="index"
                :value="color.id"
                >{{ color.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="col-3">
          <label for="">Estampa</label>
          <div class="input-group input-group-sm">
            <div class="input-group-prepend">
              <button
                class="btn btn-primary btn-sm"
                type="button"
                aria-label=""
                :disabled="!product.id"
                v-on:click="addPrint"
              >
                <i class="fas fa-plus-square"></i>
              </button>
            </div>
            <select
              class="form-control form-control-sm"
              :class="requiredGradeForm.print"
              v-model="gradeForm.print"
              :disabled="!product.id"
            >
              <option value="0">Selecione</option>
              <option
                v-for="(print, index) in prints"
                :key="index"
                :value="print.id"
                >{{ print.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-3 align-items-end d-flex">
          <button
            class="btn btn-sm btn-primary btn-block mr-2"
            v-on:click="newGrade"
            :disabled="!product.id"
          >
            <i class="fas fa-check-square"></i>
            Incluir
          </button>
          <button
            class="btn btn-sm btn-primary btn-block"
            v-on:click="toggleFormGrade"
            :disabled="!product.id"
          >
            <i class="fas fa-window-close"></i>
            cancelar
          </button>
        </div>
      </div>
    </div>
    <hr />
    <div class="px-3">
      <div class="row">
        <div class="col-12">
          <table
            class="table table-hover table-sm bg-light"
            v-if="product.grade.length"
          >
            <thead class="bg-primary text-white text-center">
              <tr>
                <th width="10%">Tamanho</th>
                <th>Cor</th>
                <th>Estampa</th>
                <th width="10%">Qtd</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(grade, index) in product.grade" :key="index">
                <td>{{ grade.size.name }}</td>
                <td>{{ grade.color.name }}</td>
                <td>{{ grade.print.name }}</td>
                <td>
                  <div class="input-group input-group-sm">
                    <input
                      type="number"
                      :readonly="!grade.inList"
                      class="form-control form-control-sm"
                      v-model="grade.qtd"
                    />

                    <div class="input-group-append">
                      <div class="input-group-text">
                        <input
                          type="checkbox"
                          v-on:click="enableGrade(index)"
                          ref="grade"
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import services from "../../../http";
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState("products", ["product"]),
    ...mapState("sizes", ["sizes"]),
    ...mapState("prints", ["prints"]),
    ...mapState("colors", ["colors"])
  },

  mounted() {
    this.listPrints();
    this.listColors();
    this.listSizes();
  },

  data: () => {
    return {
      formGrade: "d-none",
      gradeForm: {
        id: 0,
        product_id: 0,
        size: 0,
        color: 0,
        print: 0
      },

      requiredGradeForm: {
        size: { "is-invalid": false },
        color: { "is-invalid": false },
        print: { "is-invalid": false }
      }
    };
  },

  methods: {
    ...mapActions("sizes", ["ActionSetSizes"]),
    ...mapActions("colors", ["ActionSetColors"]),
    ...mapActions("prints", ["ActionSetPrints"]),

    toggleFormGrade: function() {
      this.formGrade = this.formGrade === "d-none" ? "" : "d-none";
    },

    newGrade: function() {
      const productGrade = this.product.grade.filter(grade => {
        const hasColor = grade.color.id == this.gradeForm.color;
        const hasSize = grade.size.id == this.gradeForm.size;
        const hasPrint = grade.print.id == this.gradeForm.print;
        return hasColor && hasSize && hasPrint;
      });

      const hasGrade = productGrade.length > 0;

      if (hasGrade) {
        /**
         * @todo implementar mensagem de grade existente;
         */
        alert("Já tem a grade");
        return;
      }

      let validation = this.$formValidate(
        this.gradeForm,
        this.requiredGradeForm
      );
      this.requiredGradeForm = validation.validation;

      if (validation.validate) {
        if (this.product.id) {
          this.gradeForm.product_id = this.product.id;
          services.grades
            .registerGrade(this.gradeForm)
            .then(grade => {
              grade.data.size = this.$store.getters["sizes/size"](
                this.gradeForm.size
              );
              grade.data.print = this.$store.getters["prints/print"](
                this.gradeForm.print
              );
              grade.data.color = this.$store.getters["colors/color"](
                this.gradeForm.color
              );
              grade.data.product_id = this.gradeForm.product_id;
              grade.data.inList = false;
              grade.data.qtd = 0;

              this.product.grade.push(grade.data);
              this.toggleFormGrade();
              this.ActionSetProduct(this.product);

              /**
               * @todo
               * incluir mensagem de sucesso
               */
            })
            .catch(error => {
              error;
              /**
               * @todo
               * incluir mensagem de erro
               */
            });
        }
      }
    },

    enableGrade: function(mountPosition) {
      if (this.$refs.grade[mountPosition].checked) {
        this.product.grade[mountPosition].inList = true;
        return;
      }
      this.product.grade[mountPosition].inList = false;
      this.product.grade[mountPosition].qtd = 0;
    },

    addSize: function() {
      this.$root.$emit("Show::Modal", "cadastro-tamanho");
    },

    addColor: function() {
      this.$root.$emit("Show::Modal", "register-color");
    },

    addPrint: function() {
      this.$root.$emit("Show::Modal", "register-print");
    },

    listSizes: function() {
      services.sizes.listSizes().then(sizes => {
        this.ActionSetSizes(sizes.data);
      });
    },

    listColors: function() {
      services.colors.listColors().then(colors => {
        this.ActionSetColors(colors.data);
      });
    },

    listPrints: function() {
      services.prints.listPrints().then(prints => {
        this.ActionSetPrints(prints.data);
      });
    }
  }
};
</script>
