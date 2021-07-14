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
    title: "节点二",
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
        title: "节点二 - 页面3 - 1",
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

export const menuList = (() => {
  const createList = (list: any[], parent?: string) => {
    let newlist: { title: any; children?: any[]; path: any; name: any }[] = [];
    list.forEach((item) => {
      const { path, title, children } = item;
      let obj: {
        title: string;
        path: string;
        name: string;
        children?: any[];
      } = {
        title: title,
        path: path,
        name: `${parent || ""}${path || "/"}`,
      };

      if (children) {
        obj.children = createList(children, path);
      }
      newlist.push(obj);
    });
    return newlist;
  };
  return createList(routes);
})();

export default routes;
