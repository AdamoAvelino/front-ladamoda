<template>
  <div class="container-fluid">
    <div class="row mt-2">
      <info-page-component>
        <h3 slot="title" class="text-center">Pedidos Compra</h3>
        <h1 slot="icon">
          <i class="fas fa-handshake"></i>
        </h1>
      </info-page-component>

      <div class="col-10">
        <div class="shadow-la p-2 bg-white">
          <header class="row">
            <div class="col-2">
              <h5 class="d-inline-block">Filtros</h5>
            </div>
            <div class="col-10 text-right">
              <button
                class="btn btn-sm btn-primary shadow-la"
                v-on:click.prevent="registerOrder"
              >
                <i class="fas fa-plus-square mr-1"></i> Adicionar
              </button>
            </div>
          </header>
          <form class="row">
            <div class="col-3">
              <div class="form-group">
                <label for="">Número</label>
                <input
                  v-model="filter.purchase_number"
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Número da Compra"
                />
              </div>
            </div>
            <div class="col-3">
              <label for="">Data Inicio</label>
              <input
                type="date"
                v-model="filter.date_start"
                class="form-control form-control-sm"
              />
            </div>
            <div class="col-3">
              <label for="">Data Fim</label>
              <input
                type="date"
                v-model="filter.date_end"
                class="form-control form-control-sm"
              />
            </div>
            <div class="col-3">
              <label for="">Categoria</label>
              <select
                class="form-control form-control-sm"
                v-model="filter.category"
              >
                <option value="">Selecione Uma Categoria</option>
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="col-12">
              <button
                v-on:click.prevent="searchOrder"
                type="button"
                class="btn btn-sm btn-primary shadow-la"
              >
                <i class="fas fa-search mr-1"></i>
                Pesquisar
              </button>
            </div>
          </form>
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
              <span
                v-if="total_purchase > 0"
                class="text-display"
                v-moeda-br="total_purchase"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <table class="table shadow-la bg-white table-sm table-hover">
          <thead class="bg-primary text-white">
            <tr>
              <th>Número</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Fornecedor</th>
              <th>CNPJ</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in purchases" :key="index">
              <td>{{ order.purchase_number }} {{ order.id }}</td>
              <td v-data-br="order.date"></td>
              <td v-moeda-br="order.purchase_value"></td>
              <td>{{ order.vendor.name }}</td>
              <td>{{ order.vendor.cnpj }}</td>
              <td>{{ order.vendor.telephone }}</td>
              <td>{{ order.vendor.email }}</td>
              <td v-if="order.id">
                <router-link
                  :to="{
                    name: 'UpdateOrderPurchase',
                    params: { id: order.id }
                  }"
                >
                  <i class="fas fa-edit"></i>
                </router-link>
                <a href="#" class="ml-2">
                  <i class="fas fa-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import services from "../../../http";
import InfoPageComponent from "../../../components/InfoPageComponent.vue";
export default {
  components: {
    InfoPageComponent
  },

  data() {
    return {
      purchases: [],
      categories: [],
      total_purchase: 0,
      filter: {
        purchase_number: "",
        date_start: "",
        date_end: "",
        category: ""
      }
    };
  },

  async mounted() {
    await services.purchases.listPurchase().then(purchase => {
      this.purchases = purchase.data;
      this.sumOrder();
    });

    services.categories.listarCategorias().then(response => {
      this.categories = response.data;
    });
  },

  methods: {
    sumOrder() {
      this.total_purchase = this.purchases.reduce((start_value, order) => {
        return start_value + order.purchase_value;
      }, 0);
    },

    searchOrder() {
      services.purchases.filterPurchase(this.filter).then(purchase => {
        this.purchases = purchase.data;
        this.sumOrder();
      });
    },

    registerOrder() {
      this.$router.push({ name: "RegisterOrderPurchase" });
    }
  }
};
</script>

<style lang="sass"></style>
