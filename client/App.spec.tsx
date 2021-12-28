import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockAxios from "jest-mock-axios";
import App from "./App";

describe("App", () => {
  afterEach(() => {
    mockAxios.reset();
  });
  const renderApp = () => {
    const screen = render(<App />);
    const getRoutesResponse = {
      routes: [
        {
          name: "Thongs is a mock server",
          path: "/pages/goods",
          method: "POST",
          handlers: [
            { name: "success", status: 200 },
            { name: "fail", status: 400 },
          ],
          id: 0,
          currentHandlerIdx: 1,
          delay: 2,
        },
      ],
    };
    mockAxios.mockResponse({ data: getRoutesResponse });
    return screen;
  };

  it("should render App correctly", async () => {
    const { findByText, getByText, getByTestId } = renderApp();

    expect(await findByText("/pages/goods")).toBeInTheDocument();
    expect(getByText("POST")).toBeInTheDocument();
    expect(getByText("Thongs is a mock server")).toBeInTheDocument();

    const handlerSelect = getByTestId("handler") as HTMLSelectElement;
    expect(handlerSelect.value).toBe("1");
    expect(getByText("success")).toBeInTheDocument();
    expect(getByText("fail")).toBeInTheDocument();

    const delaySelect = getByTestId("delay") as HTMLSelectElement;
    expect(delaySelect.value).toBe("2");
    expect(getByText("0s")).toBeInTheDocument();
    expect(getByText("2s")).toBeInTheDocument();
    expect(getByText("5s")).toBeInTheDocument();
    expect(getByText("10s")).toBeInTheDocument();

    expect(mockAxios.get).toHaveBeenCalledWith("/thongs/routes");
  });

  it("should patch route config when select handler", () => {
    const { getByTestId } = renderApp();
    userEvent.selectOptions(getByTestId("handler"), ["0"]);
    expect(mockAxios.patch).toHaveBeenCalledWith("/thongs/routes/0", {
      currentHandlerIdx: 0,
    });
    expect(mockAxios.get).toHaveBeenCalledWith("/thongs/routes");
  });

  it("should patch route config when select delay time", () => {
    const { getByTestId } = renderApp();
    userEvent.selectOptions(getByTestId("delay"), ["0"]);
    expect(mockAxios.patch).toHaveBeenCalledWith("/thongs/routes/0", {
      delay: 0,
    });
    expect(mockAxios.get).toHaveBeenCalledWith("/thongs/routes");
  });

  describe("search", () => {
    it("should not show route when search value does not match any route", async () => {
      const { getByRole, findByText } = renderApp();
      userEvent.type(getByRole("searchbox"), "a string");
      expect(await findByText("No route is found", { exact: false }))
        .toBeInTheDocument;
    });
    it("should show route when search value matches the patch", async () => {
      const { getByRole, findByText, queryByText } = renderApp();
      userEvent.type(getByRole("searchbox"), "pages/goods");
      expect(await findByText("Thongs is a mock server")).toBeInTheDocument;
      expect(
        queryByText("No route is found", { exact: false })
      ).not.toBeInTheDocument();
    });
  });
});
