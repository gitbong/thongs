import _isEmpty from "lodash/isEmpty";
import React from "react";
import { Dispatch, useAppContext } from "../AppContext";
import { useUpdateRoute } from "../hooks";
import { Route } from "../shared/types";
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
    dispatch as Dispatch,
  );

  const filteredRoutes = filterRoutes(routes, searchValue);

  return (
    <>
      <div className="mt-0 ">
        <table className="w-full">
          <thead>
            <tr>
              <th>
                <div className="font-normal text-left px-4 py-3">Route</div>
              </th>
              <th>
                <div className="font-normal text-left px-4 py-3">Response</div>
              </th>
              <th className="w-28">
                <div className="font-normal text-left px-4 py-3">Delay</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {_isEmpty(filteredRoutes) && (
              <tr className="items-center">
                <td className="py-3 pl-4 text-lg">🙁 No route found...</td>
              </tr>
            )}
            {filteredRoutes.map((route, idx) => (
              <tr className=" odd:bg-gray-100 items-center" key={idx}>
                <td className="py-3 pl-4 text-lg flex justify-start items-center">
                  <MethodBadge method={route.method as Method} />
                  <dl>
                    <dt className="ml-3 text-xs font-bold text-gray-600">
                      {route.name}
                    </dt>
                    <dd className="ml-3 text-xs text-gray-800">{route.path}</dd>
                  </dl>
                </td>
                <td className="py-1 pl-4">
                  <Select
                    name={"handler"}
                    value={String(route.currentHandlerIdx)}
                    options={route.handlers.map((handler, idx) => ({
                      label: handler.name,
                      value: String(idx),
                    }))}
                    onChange={(e) => {
                      updateRouteQuery(route.id, {
                        currentHandlerIdx: Number(e.target.value),
                      });
                    }}
                  />
                </td>
                <td className="py-1 px-4">
                  <Select
                    name={"delay"}
                    value={String(route.delay)}
                    options={[
                      { label: "0s", value: "0" },
                      { label: "2s", value: "2" },
                      { label: "5s", value: "5" },
                      { label: "10s", value: "10" },
                    ]}
                    onChange={(e) => {
                      updateRouteQuery(route.id, {
                        delay: Number(e.target.value),
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
