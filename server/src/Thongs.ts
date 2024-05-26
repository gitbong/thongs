import bodyParser from "body-parser";
import express from "express";
import path from "path";
import commonHeader from "./middleware/commonHeader";
import router from "./router/router";
import { selectRouteById, selectRoutes } from "./selector/route";
import { Route } from "./shared/types";
import { RouteConfig, RouteState, store } from "./store/store";
import { useSelector } from "./selector/useSelector";

export default (routesConfig: RouteConfig[]) => {
  const app = express();
  app.use(express.static(path.join(__dirname, "www")));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(commonHeader);

  store.initialise(routesConfig);

  app.use("/", router());

  app.get("/thongs/routes", (req, res) => {
    const routes = useSelector<RouteState[]>(selectRoutes);

    res.send({
      routes: routes.map(
        (route) =>
          ({
            ...route,
            handlers: route.handlers.map(({ name, status }) => ({
              name,
              status,
            })),
          } as Route)
      ),
    });
  });
  app.patch("/thongs/routes/:id", (req, res) => {
    const routeId = req.params.id;
    store.updateRoute(routeId, req.body);

    res.send(useSelector(selectRouteById(routeId)));
  });

  return {
    __expressIns: () => app,
    start: (port = 3000) => {
      app.listen(port, () => {
        console.log(
          "Thongs mock server is running on http://localhost:" + port
        );
      });
    },
  };
};
