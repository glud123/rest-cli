import React, { Suspense, useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";
import { Menu } from "antd";
import routes from "./routes";

const MenuComponent = () => {
  let location = useLocation();
  const [current, setCurrnet] = useState(location.pathname);

  const handleClick = (e: any) => {
    setCurrnet(e.key);
  };

  return (
    <Menu selectedKeys={[current]} mode="horizontal" onClick={handleClick}>
      {routes.map(({ name, path }) => {
        return (
          <Menu.Item key={path}>
            <Link to={path}>{name}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default function RouteConfig() {
  return (
    <Router>
      <MenuComponent />
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Router>
  );
}

const RouteWithSubRoutes = (route: any) => {
  useEffect(() => {
    if (route.name) document.title = route.name;
  }, [route.name]);
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <Suspense fallback={"loading..."}>
          <route.component {...props} routes={route.routes} />
        </Suspense>
      )}
    />
  );
};
