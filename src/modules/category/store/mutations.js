import * as types from "./motation-types";

export default {
  [types.SET_CATEGORIES](state, payload) {
    state.categories = payload;
  },

  [types.ADD_CATEGORY](state, payload) {
    let category = {};
    category.name = payload.name;
    category.id = payload.id;
    state.categories.push(category);
  }
};
