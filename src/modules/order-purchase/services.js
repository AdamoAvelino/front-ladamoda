export default {
  listPurchase: { method: "get", url: "order-purchase/" },
  showPurchase: { method: "get", url: "order-purchase{/id}" },
  registerPurchase: {
    method: "post",
    url: "order-purchase",
    headers: { Accept: "application/json" }
  },
  updatePurchase: {
    method: "put",
    url: "order-purchase{/id}",
    headers: { Accept: "application/json" }
  },
  deletePurchase: { method: "delete", url: "order-purchase{/id}" },
  filterPurchase: {
    method: "post",
    url: "order-purchase/filtro",
    headers: { Accept: "application/json" }
  }
};
