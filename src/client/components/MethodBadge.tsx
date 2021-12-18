import React from "react";

export enum Method {
  GET = "GET",
  PATCH = "PATCH",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

interface Props {
  method: Method;
}

const colors = {
  [Method.GET]: "bg-blue-400",
  [Method.PATCH]: "bg-pink-400",
  [Method.PUT]: "bg-yellow-500",
  [Method.POST]: "bg-green-400",
  [Method.DELETE]: "bg-red-500",
};

const MethodBadge: React.FC<Props> = ({ method }) => {
  return (
    <div
      className={`font-sans flex-shrink-0 font-bold	inline-block text-center w-16 h-6 leading-5 text-xs py-0.5 rounded text-white ${colors[method]}`}
    >
      {method}
    </div>
  );
};

export default MethodBadge;
