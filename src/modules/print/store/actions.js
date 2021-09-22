import * as types from "./motation-types";

export const ActionSetPrints = ({ commit }, payload) => {
  commit(types.SET_PRINTS, payload);
};

export const ActionAddPrint = ({ commit }, payload) => {
  commit(types.ADD_PRINT, payload);
};
