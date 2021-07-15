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
    title: "节点",
    children: [
      {
        path: "/node/",
        exact: true,
        title: "节点 - 默认页面",
        component: page,
      },
      {
        path: "/node/page1",
        title: "节点1 - 页面1",
        component: page1,
      },
      {
        path: "/node/page2",
        title: "节点2 - 页面2",
        component: page2,
      },
      {
        path: "/node/page3",
        title: "节点3",
        children: [
          {
            path: "/node/page3/",
            hidden: ["menu", "breadcrumb"],
            exact: true,
            title: "节点3 - 默认页面",
            component: page1,
          },
          {
            path: "/node/page3/1",
            hidden: ["menu"],
            title: "节点3 - 页面1",
            component: page2,
          },
        ],
      },
    ],
  },
];

export const menuList = (() => {
  const createList = (list: any[], parent?: string) => {
    let newlist: {
      title: string;
      children?: any[];
      path: string;
      name: string;
    }[] = [];
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
        name: path ? path : parent,
      };

      if (children) {
        // 过滤掉不在菜单中显示的节点
        let showChildren = children.filter((child: { hidden?: string[] }) => {
          if (child.hidden && child.hidden.length > 0) {
            return !child.hidden.includes("menu");
          } else {
            return true;
          }
        });
        if (showChildren.length > 0) {
          obj.children = createList(showChildren, path);
        }
      }
      newlist.push(obj);
    });
    return newlist;
  };
  return createList(routes);
})();

export const breadcrumbList = (() => {
  let breadcrumbObject: any = {};
  const createObj = (list: any[], parent?: string) => {
    list.forEach((item) => {
      const { path, title, children, hidden } = item;
      let obj = {
        parent,
        path,
        title,
      };
      if (children && children.length > 0) {
        // 过滤掉不在菜单中显示的节点
        let showChildren = children.filter((child: { hidden?: string[] }) => {
          if (child.hidden && child.hidden.length > 0) {
            return !child.hidden.includes("breadcrumb");
          } else {
            return true;
          }
        });
        createObj(showChildren, path);
      }
      breadcrumbObject[path] = obj;
    });
  };
  createObj(routes);
  return breadcrumbObject;
})();

console.log(breadcrumbList);

export default routes;
