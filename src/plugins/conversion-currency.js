export default {
  install(Vue) {
    Vue.directive("moeda-br", {
      bind: (el, binding) => {
        const moeda = new Intl.NumberFormat("pt-br", {
          style: "currency",
          currency: "BRL"
        }).format(binding.value);
        el.innerHTML = moeda;
      }
    });
  }
};
