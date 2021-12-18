import React, { useEffect, useReducer } from "react";
import { AppProvider } from "./AppContext";
import Header from "./components/Header";
import Table from "./components/Table";
import { useGetRoutes } from "./hooks";
import reducer from "./reducer/reducer";
import { initialState } from "./reducer/store";

const App: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { getRoutes } = useGetRoutes(dispatch);
  useEffect(() => {
    getRoutes();
  }, []);
  return (
    <AppProvider value={{ state, dispatch }}>
      <div className="font-mono text-gray-500 font-thin">
        <Header />
        <main className="mt-16">
          <Table />
        </main>
      </div>
    </AppProvider>
  );
};

export default App;
