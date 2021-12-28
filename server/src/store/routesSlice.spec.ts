import reducer, {
  HandlerConfig,
  reset,
  RouteConfig,
  RoutesState,
  RouteState,
  saveRouteConfig,
  updateRoute,
} from "./routesSlice";

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
const buildState = (override: Partial<RoutesState> = {}): RoutesState => ({
  config: [],
  routes: [],
  ...override,
});

describe("routesSlice", () => {
  const handler0 = (req, res) => {};
  const handler1 = (req, res) => {};

  describe("saveRouteConfig()", () => {
    it("should save route config with id and currentHandlerIdx", () => {
      const routeConfig = buildRouteConfig({
        handlers: [buildHandlerConfig()],
      });
      expect(reducer(undefined, saveRouteConfig(routeConfig))).toEqual({
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
      expect(
        reducer(
          undefined,
          saveRouteConfig(
            buildRouteConfig({
              handlers: [],
            })
          )
        )
      ).toEqual(
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
    const state = buildState({
      routes: [
        buildRouteState({
          currentHandlerIdx: 0,
          handlers: [
            buildHandlerConfig({ handler: handler0 }),
            buildHandlerConfig({ handler: handler1 }),
          ],
        }),
      ],
    });
    it("should set currentHandlerIdx when routeId and handlerId are available", () => {
      expect(
        reducer(
          state,
          updateRoute({
            routeId: "00000",
            updatedData: { currentHandlerIdx: 1 },
          })
        )
      ).toEqual(
        expect.objectContaining({
          routes: [expect.objectContaining({ currentHandlerIdx: 1 })],
        })
      );
    });
    it("should throw error when routeId is unavailable", () => {
      expect(() => {
        reducer(
          state,
          updateRoute({
            routeId: "100",
            updatedData: { currentHandlerIdx: 1 },
          })
        );
      }).toThrowError("Route with id 100 not found");
    });
  });

  describe("reset()", () => {
    it("should reset routes config", () => {
      const state = buildState({
        config: [
          buildRouteState({
            id: undefined,
            currentHandlerIdx: undefined,
            handlers: [buildHandlerConfig({ handler: handler0 })],
          }),
        ],
        routes: [
          buildRouteState({
            currentHandlerIdx: 1,
            handlers: [buildHandlerConfig({ handler: handler0 })],
          }),
        ],
      });

      expect(reducer(state, reset())).toEqual(
        expect.objectContaining({
          routes: [expect.objectContaining({ currentHandlerIdx: 0 })],
        })
      );
    });
  });
});
