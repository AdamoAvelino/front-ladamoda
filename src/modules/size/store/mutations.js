import * as types from "./motation-types";

export default {
  [types.SET_SIZES](state, payload) {
    state.sizes = payload;
  },

  [types.ADD_SIZE](state, payload) {
    state.sizes.push(payload);
  }
};
