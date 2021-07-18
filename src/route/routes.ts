import page from "@/modules/node2";
import page1 from "@/modules/node2/page1";
import page2 from "@/modules/node2/page2";

import home from "@/modules/home";
import curriculumDesign from "@/modules/curriculumDesign";
import testPaperDesign from "@/modules/testPaperDesign";

/**
 * 路由配置参数说明
 * @param {string} path 路由路径
 * @param {string} title 菜单名称
 * @param {boolean} exact 是否精准匹配
 * @param {React.Element} component 路由组件
 * @param {string[]} hidden 在指定场景下隐藏 menu 在菜单下隐藏 ，breadcrumb 在面包屑下隐藏
 * @param {string} redirect 重定向地址
 *
 * 说明： 拥有子项的的配置项无需挂载组件，通过重定向属性在指定子项此项的加载页面
 */

const routes = [
  {
    path: "/",
    title: "首页",
    exact: true,
    component: home,
  },
  {
    path: "/curriculum-design",
    title: "课程设计",
    redirect: "/curriculum-design/",
    hidden: ["breadcrumb"],
    children: [
      {
        path: "/curriculum-design/",
        exact: true,
        title: "课程设计",
        hidden: ["menu"],
        component: curriculumDesign.List,
      },
      {
        path: "/curriculum-design/details",
        title: "新增",
        hidden: ["menu"],
        component: curriculumDesign.Details,
      },
      {
        path: "/curriculum-design/details/:id",
        hidden: ["menu"],
        title: "编辑",
        component: curriculumDesign.Details,
      },
    ],
  },
  {
    path: "/test-paper-design",
    title: "试卷设计",
    redirect: "/test-paper-design/",
    hidden: ["breadcrumb"],
    children: [
      {
        path: "/test-paper-design/",
        exact: true,
        title: "试卷设计",
        hidden: ["menu"],
        component: testPaperDesign.List,
      },
    ],
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
        redirect: "/node/page3/",
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
      const { path, title, redirect, children } = item;

      let obj: {
        title: string;
        path: string;
        name: string;
        children?: any[];
        redirect?: string;
      } = {
        title: title,
        path: path,
        redirect: redirect,
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
      const { path, title, children, hidden, redirect } = item;
      let obj = {
        parent: path === parent ? undefined : parent,
        path,
        title,
      };
      if (children && children.length > 0) {
        createObj(children, redirect || path);
      }
      if ((hidden && !hidden.includes("breadcrumb")) || !hidden) {
        breadcrumbObject[path] = obj;
      }
    });
  };
  createObj(routes);
  return breadcrumbObject;
})();

export default routes;
