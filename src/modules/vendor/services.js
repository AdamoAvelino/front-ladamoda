export default {
  listVendors: { method: "get", url: "vendor" },
  registerVendor: {
    method: "post",
    url: "vendor",
    header: { Accetp: "application/json", "Content-type": "application/json" }
  }
};
