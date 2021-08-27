export default [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChanckName: "Home" */ "../common/screen/Home"),
    meta: {
      showMenu: true,
      title: "Home"
    }
  }
];
