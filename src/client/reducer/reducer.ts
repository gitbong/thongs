import { SAVE_ROUTES, SEARCH } from "./actions";
import { RootState } from "./store";

export default function (
  state: RootState,
  action: { type: string; payload: any }
): RootState {
  switch (action.type) {
    case SEARCH: {
      return { ...state, searchValue: action.payload };
    }
    case SAVE_ROUTES: {
      return { ...state, routes: action.payload };
    }
    default:
      throw new Error();
  }
}
