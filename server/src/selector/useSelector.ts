import { store } from "../store/store";

export const useSelector = <T = any>(selector): T => selector(store.getState());
