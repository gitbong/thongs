import _flow from "lodash/flow";
import { RouteState, RootState } from "../store/store";

export const selectRoutes = (state: RootState): RouteState[] => state.routes;

export const selectRouteById = (routeId: string) =>
  _flow([
    selectRoutes,
    (routes: RouteState[]) => routes.find(({ id }) => id === routeId),
  ]);
