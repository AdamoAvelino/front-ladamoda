export default {
  searchProduct: { method: "get", url: "produto{/parameter}{/value}" },
  showProduct: { method: "get", url: "produto{/id}" },
  registerProduct: {
    method: "post",
    url: "produto",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  },
  updateProduct: { method: "put", url: "produto{/id}" }
};
