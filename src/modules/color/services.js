export default {
  listColors: { method: "get", url: "cor" },
  registerColor: {
    method: "post",
    url: "cor",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  }
};
