export default {
  listPrints: { method: "get", url: "estampa" },
  registerPrint: {
    method: "post",
    url: "estampa",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  }
};
