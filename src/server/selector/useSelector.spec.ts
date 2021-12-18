import { useSelector } from ".";
import * as store from "../store";
import { buildRouteState } from "../store/routesSlice.spec";

describe("useSelector()", () => {
  const mockState = { config: [], routes: [buildRouteState()] };
  jest.spyOn(store, "getState").mockReturnValue(mockState);
  it("should call selector with state", () => {
    const selector = jest.fn();
    useSelector(selector);
    expect(selector).toHaveBeenCalledWith(mockState);
  });
});
