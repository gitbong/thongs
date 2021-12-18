import express, { Request, Response } from "express";
import { useSelector } from "../selector";
import { selectRoutes } from "../selector/route";
import { RouteState } from "../store/routesSlice";
import delay from "../utils/delay";

const router = express.Router();

export default () => {
  const routesConfig = useSelector<RouteState[]>(selectRoutes);
  routesConfig.forEach((route) => {
    const method = route.method.toLowerCase();
    const { path, id } = route;

    router[method](path, async (request: Request, response: Response) => {
      const currentRoute = useSelector<RouteState[]>(selectRoutes).find(
        ({ id: routeId }) => routeId === id
      );

      if (!currentRoute) throw new Error(`Route with id ${id} not found`);

      const { handlers, currentHandlerIdx, delay: delayTime } = currentRoute;
      if (currentHandlerIdx === null) throw new Error("No handler found");

      const { handler, status } = handlers[currentHandlerIdx];

      if (delayTime > 0) await delay(delayTime * 1000);

      response.status(status);
      response.send(handler(request, response));
    });
  });
  return router;
};
