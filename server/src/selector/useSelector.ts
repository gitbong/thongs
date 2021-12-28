import { getState } from "../store";

export const useSelector = <T = any>(selector): T => selector(getState());
