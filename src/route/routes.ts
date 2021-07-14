import mainPage from "@/modules/node";
import page from "@/modules/node2";
import page1 from "@/modules/node2/page1";
import page2 from "@/modules/node2/page2";

const routes = [
  {
    path: "/",
    title: "主页",
    exact: true,
    component: mainPage,
  },
  {
    path: "/node",
    children: [
      {
        path: "/node/page1",
        title: "节点二 - 页面1",
        component: page1,
      },
      {
        path: "/node/page2",
        title: "节点二 - 页面2",
        component: page2,
      },
      {
        path: "/node/page3",
        children: [
          {
            path: "/node/page3/1",
            title: "节点二 - 页面3 - 1",
            component: page2,
          },
          {
            path: "",
            title: "节点二 - 页面3",
            component: page2,
          },
        ],
      },
      {
        path: "",
        exact: true,
        title: "节点二",
        component: page,
      },
    ],
  },
];

export default routes;
