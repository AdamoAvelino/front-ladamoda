import * as types from "./motation-types";

export const ActionSetColors = ({ commit }, payload) => {
  commit(types.SET_COLORS, payload);
};

export const ActionAddColor = ({ dispatch, state }, payload) => {
  let colors = state.colors;
  let color = {};
  color.id = payload.id;
  color.name = payload.name;
  colors.push(color);
  dispatch("ActionSetColors", colors);
};
