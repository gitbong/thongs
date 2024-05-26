import { store } from "../store/store";
import { buildRouteState } from "../store/store.spec";
import { useSelector } from "./useSelector";

describe("useSelector()", () => {
  const mockState = { config: [], routes: [buildRouteState()] };
  jest.spyOn(store, "getState").mockReturnValue(mockState);
  it("should call selector with state", () => {
    const selector = jest.fn();
    useSelector(selector);
    expect(selector).toHaveBeenCalledWith(mockState);
  });
});
