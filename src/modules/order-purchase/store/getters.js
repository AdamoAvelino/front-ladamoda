export const getItemPurchase = state => code => {
  return state.purchase.items_purchase.filter(item => {
    return item.product.code == code;
  });
};
