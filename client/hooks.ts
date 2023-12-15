import axios from "axios";
import { Dispatch } from "./AppContext";
import { saveRoutesAction } from "./reducer/actions";

export const useGetRoutes = (dispatch: Dispatch) => {
  const getRoutes = async () => {
    const {
      data: { routes },
    } = await axios.get("/thongs/routes");
    dispatch(saveRoutesAction(routes));
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
  const { getRoutes } = useGetRoutes(dispatch);
  return {
    updateRoute: async (routeId: string, updatedData: Partial<UpdatedData>) => {
      await axios.patch(`/thongs/routes/${routeId}`, updatedData);
      getRoutes();
    },
  };
};
