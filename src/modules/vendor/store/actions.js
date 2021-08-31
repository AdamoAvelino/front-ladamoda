import * as types from "./mutation-types";

export const ActionSetVendorList = ({ commit }, payload) => {
  commit(types.SET_VENDOR, payload);
};

export const ActionSetVendor = ({ dispatch, state }, payload) => {
  const vendorList = state.vendors.push(payload);
  dispatch("ActionSetVendorList", vendorList);
};
