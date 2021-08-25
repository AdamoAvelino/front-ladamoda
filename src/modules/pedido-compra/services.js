export default {
  listarCompras: { method: "get", url: "pedido-compra" },
  apresentarCompra: { method: "get", url: "pedido-compra{/id}" },
  cadastrarCompra: { method: "post", url: "pedido-compra" },
  atualizarCompra: { method: "put", url: "pedido-compra{/id}" },
  deletarCompra: { method: "delete", url: "pedido-compra{/id}" }
};
