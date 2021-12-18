import axios from "axios";
import { Dispatch } from "./AppContext";
import { saveRoutesAction } from "./reducer/actions";

export const useGetRoutes = (dispatch: Dispatch) => {
  const getRoutes = async () => {
    axios.get("/thongs/routes").then(({ data: { routes } }) => {
      dispatch(saveRoutesAction(routes));
    });
  };

  return {
    getRoutes,
  };
};

interface UpdatedData {
  currentHandlerIdx: number;
  delay: number;
}

export const useUpdateRoute = (dispatch: Dispatch) => {
  const updateRoute = (routeId: string, updatedData: Partial<UpdatedData>) =>
    axios.patch(`/thongs/routes/${routeId}`, updatedData);

  const { getRoutes } = useGetRoutes(dispatch);
  return {
    updateRoute: async (routeId: string, updatedData: Partial<UpdatedData>) => {
      await updateRoute(routeId, updatedData);
      getRoutes();
    },
  };
};

const etch = async (path = [], url: string) => {};
