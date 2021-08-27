<template>
  <div class="container-fluid">
    <div class="row mt-2">
      <div class="col-2 flex-fill">
        <div
          class="d-flex h-100 flex-column bg-primary justify-content-center align-items-center shadow-la"
        >
          <h3 class="text-center">Pedidos Compra</h3>
          <h1>
            <i class="fas fa-handshake"></i>
          </h1>
        </div>
      </div>
      <div class="col-10">
        <div class="shadow-la p-2 bg-white">
          <header class="row">
            <div class="col-2">
              <h5 class="d-inline-block">Filtros</h5>
            </div>
            <div class="col-10 text-right">
              <button class="btn btn-sm btn-primary shadow-la">
                <i class="fas fa-plus-square mr-1"></i> Adicionar
              </button>
            </div>
          </header>
          <form class="row">
            <div class="col-3">
              <div class="form-group">
                <label for="">Número</label>
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Número da Compra"
                />
              </div>
            </div>
            <div class="col-3">
              <label for="">Data Inicio</label>
              <input type="date" class="form-control form-control-sm" />
            </div>
            <div class="col-3">
              <label for="">Data Fim</label>
              <input type="date" class="form-control form-control-sm" />
            </div>
            <div class="col-3">
              <label for="">Categoria</label>
              <select class="form-control form-control-sm">
                <option value="">Selecione Uma Categoria</option>
                <option
                  v-for="(categoria, index) in categorias"
                  :key="index"
                  :value="categoria.id"
                >
                  {{ categoria.name }}
                </option>
              </select>
            </div>
            <div class="col-12">
              <button type="button" class="btn btn-sm btn-primary shadow-la">
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
        <div class="bg-primary py-2 shadow-la">
          <div class="row">
            <div class="col-6">
              <h4 class="text-center">Total</h4>
            </div>
            <div class="col-6">
              <h4 v-moeda-br="total_compra"></h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-12">
        <table class="table shadow-la bg-white">
          <thead>
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
            <tr v-for="(pedido, index) in pedidos" :key="index">
              <td>{{ pedido.purchase_number }}</td>
              <td v-data-br="pedido.date"></td>
              <td v-moeda-br="pedido.purchase_value"></td>
              <td>{{ pedido.vendor.name }}</td>
              <td>{{ pedido.vendor.cnpj }}</td>
              <td>{{ pedido.vendor.telephone }}</td>
              <td>{{ pedido.vendor.email }}</td>
              <td>
                <a href="#">
                  <i class="fas fa-edit"></i>
                </a>
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
export default {
  data() {
    return {
      pedidos: [],
      categorias: [],
      total_compra: 0
    };
  },

  mounted() {
    services.compras.listarCompras().then(compra => {
      this.pedidos = compra.data;
      this.total_compra = this.pedidos.reduce((valor_inicial, pedido) => {
        return valor_inicial + pedido.purchase_value;
      }, 0);
    });

    services.categoria.listarCategorias().then(response => {
      this.categorias = response.data;
    });
  }
};
</script>

<style lang="sass"></style>
