import * as types from "./motation-types";

export const ActionSetCategories = ({ commit }, payload) => {
  commit(types.SET_CATEGORIES, payload);
};

export const ActionAddCategory = ({ commit }, payload) => {
  commit(types.ADD_CATEGORY, payload);
};
