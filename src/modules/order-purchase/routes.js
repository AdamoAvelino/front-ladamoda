export default [
  {
    path: "/order-purchase",
    name: "ListPurchase",
    component: () =>
      import(
        /* webpackChanckName: "ListPurchase" */ "../order-purchase/screen/ListPurchase"
      ),
    meta: {
      showMenu: true,
      title: "Compras"
    }
  },
  {
    path: "/order-purchase/cadastrar",
    name: "RegisterOrderPurchase",
    component: () =>
      import(
        /* webpackChanckName RegisterOrderPurchase */ "../order-purchase/screen/RegisterPurchase"
      ),
    meta: {
      showMenu: false,
      Title: "cadastrar"
    }
  },
  {
    path: "/order-purchase/atualizar/:id",
    name: "UpdateOrderPurchase",
    component: () =>
      import(
        /* webpackChanckName UpdateOrderPurchase */ "../order-purchase/screen/UpdatePurchase"
      ),
    meta: {
      showMenu: false,
      Title: "Atualizar"
    }
  }
];
