import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";

export default function RouteConfig() {
  const createRouter = (routesArray: any[]) => {
    return routesArray.map((route: any, i: any) => {
      if (route.children && route.children.length > 0) {
        route.component = () => (
          <Switch key={route.path}>{createRouter(route.children)}</Switch>
        );
      }
      return <RouteWithSubRoutes key={route.path} {...route} />;
    });
  };
  return <Switch>{createRouter(routes)}</Switch>;
}

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
