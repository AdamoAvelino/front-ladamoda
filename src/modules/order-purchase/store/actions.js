import * as types from "./mutatio-types";

export const ActionSetPurchase = ({ commit }, payload) => {
  commit(types.SET_PURCHASE, payload);
};

export const ActionAlterVendor = ({ dispatch, state }, payload) => {
  const purchase = state.purchase;
  purchase.vendor = payload;
  dispatch("ActionSetPurchase", purchase);
};
