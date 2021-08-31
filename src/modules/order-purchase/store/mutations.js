import * as types from "./mutatio-types";

export default {
  [types.SET_PURCHASE](state, payload) {
    state.purchase = payload;
  }
};
