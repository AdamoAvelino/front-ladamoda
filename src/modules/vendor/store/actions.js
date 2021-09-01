import * as types from "./mutation-types";

export const ActionSetVendorList = ({ commit }, payload) => {
  commit(types.SET_VENDOR, payload);
};

export const ActionSetVendor = ({ dispatch, state }, payload) => {
  let vendorList = state.vendors;
  vendorList.push(payload);
  dispatch("ActionSetVendorList", vendorList);
};
