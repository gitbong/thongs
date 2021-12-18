import _isEmpty from "lodash/isEmpty";
import React from "react";
import { Route } from "../../shared/types";
import { Dispatch, useAppContext } from "../AppContext";
import { useUpdateRoute } from "../hooks";
import MethodBadge, { Method } from "./MethodBadge";
import Select from "./Select";

const filterRoutes = (routes: Route[], searchValue: string): Route[] => {
  const trimmedSearchValue = searchValue.trim().toLowerCase();
  if (_isEmpty(trimmedSearchValue)) return routes;

  return routes.filter((route) => {
    const text = (route.name + route.path + route.method).toLowerCase();
    return text.includes(searchValue);
  });
};

const Table: React.FC = () => {
  const {
    state: { searchValue, routes },
    dispatch,
  } = useAppContext();

  const { updateRoute: updateRouteQuery } = useUpdateRoute(
    dispatch as Dispatch
  );

  const filteredRoutes = filterRoutes(routes, searchValue);

  return (
    <>
      <div className="mt-0 ">
        <ol>
          <li className="flex even:bg-gray-100 items-center py-3 ">
            <div className="py-1 pl-4 w-6/12">Path</div>
            <div className="py-1 pl-4 w-5/12">Response</div>
            <div className="py-1 px-4 w-1/12">Delay</div>
          </li>
          {_isEmpty(filteredRoutes) && (
            <li className="pl-4 py-4 bg-gray-100">🙁 No route is found...</li>
          )}
          {filterRoutes(routes, searchValue).map(
            (
              {
                id: routeId,
                name,
                method,
                path,
                handlers,
                currentHandlerIdx,
                delay,
              },
              idx
            ) => (
              <li className="flex even:bg-gray-100 items-center " key={idx}>
                <div className="py-4 pl-4 w-6/12 text-lg flex justify-start items-center">
                  <MethodBadge method={method as Method} />
                  <span className="ml-3 text-base text-gray-800">{path}</span>
                  <span className="ml-5 text-xs text-gray-600">{name}</span>
                </div>
                <div className="py-1 pl-4 w-5/12">
                  <Select
                    name={"handler"}
                    value={String(currentHandlerIdx)}
                    options={handlers.map(({ name }, idx) => ({
                      label: name,
                      value: String(idx),
                    }))}
                    onChange={(e) => {
                      updateRouteQuery(routeId, {
                        currentHandlerIdx: Number(e.target.value),
                      });
                    }}
                  />
                </div>
                <div className="py-1 px-4 w-1/12">
                  <Select
                    name={"delay"}
                    value={String(delay)}
                    options={[
                      { label: "0s", value: "0" },
                      { label: "2s", value: "2" },
                      { label: "5s", value: "5" },
                      { label: "10s", value: "10" },
                    ]}
                    onChange={(e) => {
                      updateRouteQuery(routeId, {
                        delay: Number(e.target.value),
                      });
                    }}
                  />
                </div>
              </li>
            )
          )}
        </ol>
      </div>
    </>
  );
};

export default Table;
