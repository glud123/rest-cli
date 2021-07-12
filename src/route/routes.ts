import mainPage from "@/modules/node";
import page from "@/modules/node2";
import page1 from "@/modules/node2/page1";
import page2 from "@/modules/node2/page2";

const routes = [
  {
    path: "/",
    title: "主页",
    name: "home",
    exact: true,
    component: mainPage,
  },
  {
    path: "/node",
    name: "node",
    component: mainPage,
    children: [
      {
        path: "",
        exact: true,
        title: "节点二",
        name: "node:page",
        component: page,
      },
      {
        path: "/node/page1",
        title: "节点二 - 页面1",
        name: "node:page1",
        component: page1,
      },
      {
        path: "/node/page2",
        title: "节点二 - 页面2",
        name: "node:page2",
        component: page2,
      },
    ],
  },
];

export default routes;
