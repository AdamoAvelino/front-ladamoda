export default {
  listVendors: { method: "get", url: "fornecedor" },
  registerVendor: {
    method: "post",
    url: "fornecedor",
    headers: { Accept: "application/json" }
  }
};
