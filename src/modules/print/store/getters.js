export const print = state => id => {
  const print = state.prints.filter(print => print.id == id);
  return print[0];
};
