export const color = state => id => {
  const color = state.colors.filter(color => color.id == id);
  return color[0];
};
