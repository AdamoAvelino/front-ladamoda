import * as types from "./mutation-types";

export const ActionSetProduct = ({ commit }, payload) => {
  commit(types.SET_PRODUCT, payload);
};

export const ActionResetProduct = ({ commit }) => {
  commit(types.SET_PRODUCT, {
    id: null,
    code: "",
    code_sku: "",
    name: "",
    composition: "",
    profit_porcentage: null,
    cost_value: null,
    sale_value: null,
    start_date: "",
    ncm: null,
    category: { id: "" },
    modality: { id: "" },
    vendor: { id: 1 },
    grade: []
  });
};
