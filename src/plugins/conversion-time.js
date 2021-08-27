export default {
  install(Vue) {
    Vue.directive("data-br", {
      bind: (el, binding) => {
        // console.log(binding)
        let dateResponse = binding.value
          .split("-")
          .reverse()
          .join("/");
        el.innerHTML = dateResponse;
      }
    });
  }
};
