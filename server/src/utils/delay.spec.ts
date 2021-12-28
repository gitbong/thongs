import delay from "./delay";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

describe("delay", () => {
  it("should ", async () => {
    delay(123);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 123);
  });
});
