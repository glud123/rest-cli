import mainPage from "@/modules/node";
import page from "@/modules/node";

const routes = [
  {
    path: "/",
    name: "主页",
    exact: true,
    component: mainPage,
  },
  {
    path: "/node2",
    name: "节点二",
    component: page,
  },
];

export default routes;
