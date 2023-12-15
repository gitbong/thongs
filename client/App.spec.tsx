import { render, screen } from "@testing-library/react";
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
    renderApp();

    expect(await screen.findByText("/pages/goods")).toBeInTheDocument();
    expect(screen.getByText("POST")).toBeInTheDocument();
    expect(screen.getByText("Thongs is a mock server")).toBeInTheDocument();

    const handlerSelect = screen.getByTestId("handler") as HTMLSelectElement;
    expect(handlerSelect.value).toBe("1");
    expect(screen.getByText("success")).toBeInTheDocument();
    expect(screen.getByText("fail")).toBeInTheDocument();

    const delaySelect = (await screen.findByTestId(
      "delay"
    )) as HTMLSelectElement;

    expect(delaySelect.value).toBe("2");
    expect(screen.getByText("0s")).toBeInTheDocument();
    expect(screen.getByText("2s")).toBeInTheDocument();
    expect(screen.getByText("5s")).toBeInTheDocument();
    expect(screen.getByText("10s")).toBeInTheDocument();

    expect(mockAxios.get).toHaveBeenCalledWith("/thongs/routes");
  });

  it("should patch route config when select handler", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.selectOptions(await screen.findByTestId("handler"), ["0"]);
    expect(mockAxios.patch).toHaveBeenCalledWith("/thongs/routes/0", {
      currentHandlerIdx: 0,
    });
    expect(mockAxios.get).toHaveBeenCalledWith("/thongs/routes");
  });

  it("should patch route config when select delay time", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.selectOptions(await screen.findByTestId("delay"), ["0"]);
    expect(mockAxios.patch).toHaveBeenCalledWith("/thongs/routes/0", {
      delay: 0,
    });
    expect(mockAxios.get).toHaveBeenCalledWith("/thongs/routes");
  });

  describe("search", () => {
    it("should not show route when search value does not match any route", async () => {
      const user = userEvent.setup();
      renderApp();

      await user.type(screen.getByRole("textbox"), "a string");
      expect(await screen.findByText("No route found", { exact: false }))
        .toBeInTheDocument;
    });
    it("should show route when search value matches the patch", async () => {
      const user = userEvent.setup();
      renderApp();

      await user.type(screen.getByRole("textbox"), "pages/goods");
      expect(await screen.findByText("Thongs is a mock server"))
        .toBeInTheDocument;
      expect(
        screen.queryByText("No route found", { exact: false })
      ).not.toBeInTheDocument();
    });
  });
});
