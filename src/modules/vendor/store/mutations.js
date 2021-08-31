import * as types from "./mutation-types";

export default {
  [types.SET_VENDOR](state, payload) {
    state.vendors = payload;
  }
};
