export default {
  listCategories: { method: "get", url: "categoria" },
  registerCategory: {
    method: "post",
    url: "categoria",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  }
};
