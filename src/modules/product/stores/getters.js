export const getGrade = state => gradeId => {
  return state.product.grade.filter(grade => (grade.id = gradeId));
};
