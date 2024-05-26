import {
  RouteConfig,
  HandlerConfig,
  RouteState,
  RootState,
  store,
} from "./store";

const buildRouteConfig = (
  override: Partial<RouteConfig> = {}
): RouteConfig => ({
  name: "name",
  path: "/name",
  method: "GET",
  handlers: [],
  ...override,
});
const buildHandlerConfig = (
  override: Partial<HandlerConfig> = {}
): HandlerConfig => ({
  name: "handler",
  status: 200,
  handler: () => {},
  ...override,
});
export const buildRouteState = (
  override: Partial<RouteState> = {}
): RouteState => ({
  id: "00000",
  name: "name",
  path: "/name",
  method: "GET",
  currentHandlerIdx: null,
  handlers: [],
  delay: 0,
  ...override,
});

describe("store", () => {
  const handler0 = (req, res) => {};
  const handler1 = (req, res) => {};
  describe("saveRouteConfig()", () => {
    it("should save route config with id and currentHandlerIdx", () => {
      const routeConfig = buildRouteConfig({
        handlers: [buildHandlerConfig()],
      });

      store.initialise([routeConfig]);

      expect(store.getState()).toEqual({
        config: [routeConfig],
        routes: [
          {
            ...routeConfig,
            id: "00000",
            currentHandlerIdx: 0,
            delay: 0,
          },
        ],
      });
    });

    it("should set currentHandlerIdx to null when handlers is empty", () => {
      const routeConfig = buildRouteConfig({
        handlers: [],
      });

      store.initialise([routeConfig]);

      expect(store.getState()).toEqual(
        expect.objectContaining({
          routes: [
            expect.objectContaining({
              currentHandlerIdx: null,
            }),
          ],
        })
      );
    });
  });
  describe("updateRoute()", () => {
    const routeConfig = buildRouteConfig({
      handlers: [
        buildHandlerConfig({ handler: handler0 }),
        buildHandlerConfig({ handler: handler1 }),
      ],
    });
    it("should set currentHandlerIdx when routeId and handlerId are valid", () => {
      store.initialise([routeConfig]);
      store.updateRoute("00000", { currentHandlerIdx: 1 });
      expect(store.getState()).toEqual(
        expect.objectContaining({
          routes: [expect.objectContaining({ currentHandlerIdx: 1 })],
        })
      );
    });
    it("should throw error when routeId is invalid", () => {
      store.initialise([routeConfig]);
      expect(() => {
        store.updateRoute("unknown-route-id", { currentHandlerIdx: 1 });
      }).toThrowError("Route with id unknown-route-id not found");
    });
  });
});
