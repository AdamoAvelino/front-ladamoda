export const size = state => id => {
  const size = state.sizes.filter(size => size.id == id);
  return size[0];
};
