import bodyParser from "body-parser";
import express from "express";
import path from "path";
import { Route } from "../shared/types";
import commonHeader from "./middleware/commonHeader";
import router from "./router/router";
import { useSelector } from "./selector";
import { selectRouteById, selectRoutes } from "./selector/route";
import { dispatch } from "./store";
import {
  reset,
  RouteConfig,
  RouteState,
  saveRouteConfig,
  updateRoute,
} from "./store/routesSlice";

export default (routesConfig: RouteConfig[]) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(commonHeader);

  routesConfig.forEach((routeConfig) => dispatch(saveRouteConfig(routeConfig)));
  app.use("/", router());
  app.use(express.static(path.join(__dirname, "www")));

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
    dispatch(updateRoute({ routeId, updatedData: req.body }));

    res.send(useSelector(selectRouteById(routeId)));
  });
  app.post("/thongs/reset", (req, res) => {
    dispatch(reset());
    res.send();
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
