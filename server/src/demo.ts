import Thongs from "./Thongs";

const myApp = Thongs([
  {
    name: "Get call",
    path: "/pages/goods",
    method: "GET",
    handlers: [
      {
        name: "success",
        status: 200,
        handler: (req: any, res) => {
          const {
            query: { a },
          } = req;
          return { a, b: 1 };
        },
      },
      {
        name: "fail",
        status: 400,
        handler: ({ query: { a } }: any, res) => {
          return { a, b: 33 };
        },
      },
    ],
  },
  {
    name: "Pose call",
    path: "/pages/goods",
    method: "POST",
    handlers: [
      {
        name: "success",
        status: 200,
        handler: (req: any, res) => {
          const {
            query: { a },
          } = req;
          return { data: "response for post call" };
        },
      },
      {
        name: "fail",
        status: 300,
        handler: ({ query: { a } }: any, res) => {
          return { data: "response for failed post call" };
        },
      },
    ],
  },
  {
    name: "Put call",
    path: "/pages/goods",
    method: "PUT",
    handlers: [
      {
        name: "success",
        status: 500,
        handler: (req: any, res) => {
          const {
            query: { a },
          } = req;
          return { a, b: 1 };
        },
      },
      {
        name: "fail",
        status: 400,
        handler: ({ query: { a } }: any, res) => {
          return { a, b: 33 };
        },
      },
    ],
  },
  {
    name: "Patch call",
    path: "/pages/goods",
    method: "PATCH",
    handlers: [
      {
        name: "success",
        status: 500,
        handler: (req: any, res) => {
          const {
            query: { a },
          } = req;
          return { a, b: 1 };
        },
      },
      {
        name: "fail",
        status: 400,
        handler: ({ query: { a } }: any, res) => {
          return { a, b: 33 };
        },
      },
    ],
  },
  {
    name: "Delete call",
    path: "/pages/goods",
    method: "DELETE",
    handlers: [
      {
        name: "success",
        status: 500,
        handler: (req: any, res) => {
          const {
            query: { a },
          } = req;
          return { a, b: 1 };
        },
      },
      {
        name: "fail",
        status: 400,
        handler: ({ query: { a } }: any, res) => {
          return { a, b: 33 };
        },
      },
    ],
  },
]);
myApp.start();

const fun = (a = [], b) => {};
