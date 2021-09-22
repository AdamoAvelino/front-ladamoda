import * as types from "./motation-types";

export const ActionSetSizes = ({ commit }, payload) => {
  commit(types.SET_SIZES, payload);
};

export const ActionAddSize = ({ dispatch, state }, payload) => {
  let sizes = state.sizes;
  let size = {};
  size.id = payload.id;
  size.name = payload.name;
  sizes.push(size);
  dispatch("ActionSetSizes", sizes);
};
