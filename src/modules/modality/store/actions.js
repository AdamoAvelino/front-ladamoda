import * as types from "./motation-types";

export const ActionSetModalities = ({ commit }, payload) => {
  commit(types.SET_MODALITIES, payload);
};

export const ActionAddModality = ({ commit }, payload) => {
  commit(types.ADD_MODALITY, payload);
};
