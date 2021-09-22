import * as types from "./motation-types";

export default {
  [types.SET_COLORS](state, payload) {
    state.colors = payload;
  },

  [types.ADD_COLOR](state, payload) {
    state.colors.push(payload);
  }
};
