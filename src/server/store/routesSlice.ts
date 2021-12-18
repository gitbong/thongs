import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Request, Response } from "express";
import _forIn from "lodash/forIn";
import _isEmpty from "lodash/isEmpty";

export interface RouteConfig {
  name: string;
  path: string;
  method: string;
  handlers: HandlerConfig[];
}

export interface HandlerConfig {
  name: string;
  status: number;
  handler: (req: Request, res: Response) => unknown;
}

export interface RouteState {
  id: string;
  name: string;
  path: string;
  method: string;
  currentHandlerIdx: number | null;
  handlers: HandlerConfig[];
  delay: number;
}

export interface RoutesState {
  config: RouteConfig[];
  routes: RouteState[];
}

const initialState: RoutesState = {
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

export const routesSlice = createSlice({
  name: "routesSlice",
  initialState,
  reducers: {
    saveRouteConfig: (state, { payload }: PayloadAction<RouteConfig>) => {
      const { config, routes } = state;
      config.push(payload);

      const routeId = routes.length;
      routes.push(initializeRoutesConfig(String(routeId), payload));
    },
    updateRoute: (
      state,
      {
        payload,
      }: PayloadAction<{ routeId: string; updatedData: Partial<RouteState> }>
    ) => {
      const { routes } = state;
      const { routeId, updatedData } = payload;

      const foundRoute = routes.find((route) => route.id === routeId);
      if (!foundRoute) throw new Error(`Route with id ${routeId} not found`);

      _forIn(updatedData, (value, key) => {
        foundRoute[key] = value;
      });
    },
    reset: (state) => {
      state.routes = state.config.map((item, idx) =>
        initializeRoutesConfig(String(idx), item)
      );
    },
  },
});

export const { saveRouteConfig, updateRoute, reset } = routesSlice.actions;
export default routesSlice.reducer;
