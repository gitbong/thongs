import _flow from "lodash/flow";
import { RoutesState, RouteState } from "../store/routesSlice";

export const selectRoutes = (state: RoutesState): RouteState[] => state.routes;

export const selectRouteById = (routeId: string) =>
  _flow([
    selectRoutes,
    (routes: RouteState[]) => routes.find(({ id }) => id === routeId),
  ]);
