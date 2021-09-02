export default {
  install(Vue) {
    Vue.prototype.$formValidate = function(datas, validation) {
      let validate = true;
      Object.keys(datas).forEach(value => {
        validation[value] ? (validation[value]["is-invalid"] = false) : null;
        if (!datas[value] && validation[value]) {
          validation[value]["is-invalid"] = true;
          validate = false;
        }
      });

      return {
        validate,
        validation
      };
    };
  }
};
