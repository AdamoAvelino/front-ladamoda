import * as types from "./mutatio-types";

const initState = {
  id: 0,
  vendor: {
    name: "",
    email: "",
    telephone: "",
    cnpj: "",
    id: 0
  },
  items_purchase: [],
  purchase_number: "",
  date: "",
  purchase_value: 0
};

export const ActionSetPurchase = ({ commit }, payload) => {
  commit(types.SET_PURCHASE, payload);
};

export const ActionAlterVendor = ({ dispatch, state }, payload) => {
  const purchase = state.purchase;
  purchase.vendor = payload;
  dispatch("ActionSetPurchase", purchase);
};

export const ActionResetPurchase = ({ commit }) => {
  commit(types.SET_PURCHASE, initState);
};

export const ActionAddItem = ({ dispatch, state }, payload) => {
  let purchase = state.purchase;
  purchase.items_purchase.push(payload);
  dispatch("ActionSetPurchase", purchase);
};

export const ActionRemoveProductPurchase = ({ dispatch, state }, payload) => {
  let purchase = state.purchase;
  let items = purchase.items_purchase.filter((item, index) => {
    return index != payload;
  });
  purchase.items_purchase = items;
  dispatch("ActionSetPurchase", purchase);
};
