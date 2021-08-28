export default {
  listarCompras: { method: "get", url: "pedido-compra/" },
  apresentarCompra: { method: "get", url: "pedido-compra{/id}" },
  cadastrarCompra: {
    method: "post",
    url: "pedido-compra",
    headers: { Accept: "application/json" }
  },
  atualizarCompra: {
    method: "put",
    url: "pedido-compra{/id}",
    headers: { Accept: "application/json" }
  },
  deletarCompra: { method: "delete", url: "pedido-compra{/id}" },
  filtrarCompra: {
    method: "post",
    url: "pedido-compra/filtro",
    headers: { Accept: "application/json" }
  }
};
