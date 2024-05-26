import _forIn from "lodash/forIn";
import _isEmpty from "lodash/isEmpty";

export interface RootState {
  config: RouteConfig[];
  routes: RouteState[];
}

export interface RouteConfig {
  name: string;
  path: string;
  method: string;
  handlers: HandlerConfig[];
}

export interface RouteState extends RouteConfig {
  id: string;
  currentHandlerIdx: number | null;
  delay: number;
}

export interface HandlerConfig {
  name: string;
  status: number;
  handler: (req: Request, res: Response) => unknown;
}

const state: RootState = {
  config: [],
  routes: [],
};

const initializeRoutesConfig = (
  id: string,
  config: RouteConfig
): RouteState => ({
  ...config,
  id: id.padStart(5, "0"),
  currentHandlerIdx: _isEmpty(config.handlers) ? null : 0,
  delay: 0,
});

export const store = {
  getState: () => state,
  initialise: (routesConfig: RouteConfig[]) => {
    state.config = [];
    state.routes = [];
    routesConfig.forEach((config) => {
      state.config.push(config);
      const routeId = state.routes.length;
      state.routes.push(initializeRoutesConfig(String(routeId), config));
    });
  },
  updateRoute: (routeId: string, patchedData: Partial<RouteState>) => {
    const { routes } = state;

    const foundRoute = routes.find((route) => route.id === routeId);
    if (!foundRoute) throw new Error(`Route with id ${routeId} not found`);

    _forIn(patchedData, (value, key) => {
      foundRoute[key] = value;
    });
  },
};
