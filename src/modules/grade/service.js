export default {
  listGrades: { method: "get", url: "grade" },
  registerGrade: {
    method: "post",
    url: "grade",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  }
};
