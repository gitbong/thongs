import _debounce from "lodash/debounce";
import React from "react";
import { useAppContext } from "../AppContext";
import { searchAction } from "../reducer/actions";

const Header: React.FC = () => {
  const { dispatch } = useAppContext();
  return (
    <header className="z-10 fixed w-full top-0 h-16 px-4 flex flex-row justify-between items-center border-b border-gray-100 bg-white">
      <h1 className="logo text-2xl">
        <a
          href="https://github.com/gitbong/thongs"
          target="_blank"
          rel="noopener"
        >
          <span className="text-3xl">🩴</span>
          <span className="text-red-400 ml-2">T</span>
          <span className="text-blue-400">hongs</span>
        </a>
        <span className="ml-2 text-xs">mock server dashboard</span>
      </h1>
      <div className="flex flex-row items-center text-gray-600 text-sm">
        <label htmlFor="search-box">Search:</label>
        <input
          id="search-box"
          role="textbox"
          className="w-full rounded outline-none border border-solid ring-gray-200 ml-2 pl-2 py-0.5 text-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all"
          type="text"
          aria-roledescription="search route"
          onChange={_debounce((e) => {
            dispatch(searchAction(e.target.value));
          }, 300)}
        />
      </div>
    </header>
  );
};

export default Header;
