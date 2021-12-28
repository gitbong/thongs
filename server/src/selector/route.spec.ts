import { buildRouteState } from "../store/routesSlice.spec";
import { selectRouteById, selectRoutes } from "./route";

describe("route", () => {
  describe("selectRoutes()", () => {
    it("should return routes", () => {
      const routesState = [buildRouteState()];
      expect(selectRoutes({ config: [], routes: routesState })).toEqual(
        routesState
      );
    });
  });
  describe("selectRouteById()", () => {
    it("should return route state with id 1", () => {
      const routeId = "100";
      const routeState = buildRouteState({ id: routeId });
      const state = { routes: [routeState] };
      expect(selectRouteById(routeId)(state)).toEqual(routeState);
    });
  });
});
