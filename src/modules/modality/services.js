export default {
  listModalities: { method: "get", url: "modalidade" },
  registerModality: {
    method: "post",
    url: "modalidade",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  }
};
