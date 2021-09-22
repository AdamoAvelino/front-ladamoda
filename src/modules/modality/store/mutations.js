import * as types from "./motation-types";

export default {
  [types.SET_MODALITIES](state, payload) {
    state.modalities = payload;
  },

  [types.ADD_MODALITY](state, payload) {
    let modality = {};
    modality.id = payload.id;
    modality.name = payload.name;
    state.modalities.push(modality);
  }
};
