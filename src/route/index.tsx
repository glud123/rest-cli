import React, { Suspense, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";
import routes from "./routes";

export default function RouteConfig() {
  return <Router>{RouterWrapperWithChildren(routes)}</Router>;
}

const RouterWrapperWithChildren = (routes: any[]) => {
  const createRouter = (routesArray: any[]) => {
    return routesArray.map((route: any, i: any) => {
      if (route.children && route.children.length > 0) {
        route.component = () => (
          <Switch key={route.name}>{createRouter(route.children)}</Switch>
        );
      }
      return <RouteWithSubRoutes key={route.name} {...route} />;
    });
  };
  return <Switch>{createRouter(routes)}</Switch>;
};

const RouteWithSubRoutes = (route: any) => {
  useEffect(() => {
    if (route.title) document.title = route.title;
  }, [route.title]);
  return (
    <Route
      path={route.path}
      render={(props) => {
        return (
          <Suspense fallback={"loading..."}>
            <route.component {...props} routes={route.routes} />
          </Suspense>
        );
      }}
    />
  );
};
