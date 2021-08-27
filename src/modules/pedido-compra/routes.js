export default [
  {
    path: "/pedido-compra",
    name: "ListaCompra",
    component: () =>
      import(
        /* webpackChanckName: "ListaCompra" */ "../pedido-compra/screen/ListarCompra"
      ),
    meta: {
      showMenu: true,
      title: "Compras"
    }
  }
];
