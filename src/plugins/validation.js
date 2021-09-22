export default {
  install(Vue) {
    Vue.prototype.$formValidate = function(datas, validation) {
      let validate = true;
      Object.keys(datas).forEach(value => {
        validation[value] ? (validation[value]["is-invalid"] = false) : null;

        if (datas[value] && typeof datas[value] === "object") {
          let ObjectValidate = Object.keys(datas[value]).filter(data => {
            return !!datas[value][data];
          });

          if (ObjectValidate.length === 0 && validation[value]) {
            validation[value]["is-invalid"] = true;
          }
        } else if (!datas[value] && validation[value]) {
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
