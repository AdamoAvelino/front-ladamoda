export default {
  listSizes: { method: "get", url: "tamanho" },
  registerSize: {
    method: "post",
    url: "tamanho",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  }
};
