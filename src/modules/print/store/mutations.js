import * as types from "./motation-types";
export default {
  [types.SET_PRINTS](state, payload) {
    state.prints = payload;
  },

  [types.ADD_PRINT](state, payload) {
    let print = {};
    print.id = payload.id;
    print.name = payload.name;
    state.prints.push(print);
  }
};
