import * as types from "./mutatio-types";

export default {
  [types.SET_PURCHASE](state, payload) {
    state.purchase = payload;
  },

  [types.SET_CONTROL_BUTTON_FORM](state, payload) {
    state.addProductButton = payload;
  }
};
