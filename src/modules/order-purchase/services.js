export default {
  listPurchase: { method: "get", url: "pedido-compra" },
  showPurchase: { method: "get", url: "pedido-compra{/id}" },
  registerPurchase: {
    method: "post",
    url: "pedido-compra",
    headers: { Accept: "application/json" }
  },
  updatePurchase: {
    method: "put",
    url: "pedido-compra{/id}",
    headers: { Accept: "application/json" }
  },
  deletePurchase: { method: "delete", url: "pedido-compra{/id}" },
  filterPurchase: {
    method: "post",
    url: "pedido-compra/filtro",
    headers: { Accept: "application/json" }
  }
};
