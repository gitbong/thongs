import request from "supertest";
import Thongs from "../Thongs";

describe("Thongs", () => {
  const route0Id = "00000";
  const app = Thongs([
    {
      name: "route0",
      path: "/path0",
      method: "GET",
      handlers: [
        {
          name: "handler0",
          status: 200,
          handler: (req: any, res) => {
            return { name: req.query.name };
          },
        },
        {
          name: "handler1",
          status: 204,
          handler: (req, res: any) => {
            res.status(400);
          },
        },
      ],
    },
    {
      name: "route1",
      path: "/path1",
      method: "POST",
      handlers: [
        {
          name: "success",
          status: 201,
          handler: (req, res) => {
            return { data: "response for post call" };
          },
        },
      ],
    },
    {
      name: "route2",
      path: "/path2",
      method: "PUT",
      handlers: [
        {
          name: "success",
          status: 202,
          handler: (req, res) => {
            return { data: "response for put call" };
          },
        },
      ],
    },
    {
      name: "route3",
      path: "/path3",
      method: "PATCH",
      handlers: [
        {
          name: "success",
          status: 203,
          handler: (req, res) => {
            return { data: "response for patch call" };
          },
        },
      ],
    },
    {
      name: "route4",
      path: "/path4",
      method: "DELETE",
      handlers: [
        {
          name: "success",
          status: 400,
          handler: (req, res) => {
            return { data: "response for delete call" };
          },
        },
      ],
    },
  ]);
  const expectedRoutesResponse = {
    routes: [
      {
        id: route0Id,
        name: "route0",
        path: "/path0",
        method: "GET",
        currentHandlerIdx: 0,
        delay: 0,
        handlers: [
          {
            name: "handler0",
            status: 200,
          },
          {
            name: "handler1",
            status: 204,
          },
        ],
      },
      {
        id: "00001",
        name: "route1",
        path: "/path1",
        method: "POST",
        currentHandlerIdx: 0,
        delay: 0,
        handlers: [
          {
            name: "success",
            status: 201,
          },
        ],
      },
      {
        id: "00002",
        name: "route2",
        path: "/path2",
        method: "PUT",
        currentHandlerIdx: 0,
        delay: 0,
        handlers: [
          {
            name: "success",
            status: 202,
          },
        ],
      },
      {
        id: "00003",
        name: "route3",
        path: "/path3",
        method: "PATCH",
        currentHandlerIdx: 0,
        delay: 0,
        handlers: [
          {
            name: "success",
            status: 203,
          },
        ],
      },
      {
        id: "00004",
        name: "route4",
        path: "/path4",
        method: "DELETE",
        currentHandlerIdx: 0,
        delay: 0,
        handlers: [
          {
            name: "success",
            status: 400,
          },
        ],
      },
    ],
  };
  test("GET /thongs/routes", async () => {
    const res = await request(app.__expressIns()).get("/thongs/routes");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedRoutesResponse);
  });

  describe("PATCH /thongs/routes/:id", () => {
    test("PATCH currentHandlerIdx", async () => {
      const patchResponse = await request(app.__expressIns())
        .patch(`/thongs/routes/${route0Id}`)
        .send({
          currentHandlerIdx: 1,
        });

      expect(patchResponse.header["content-type"]).toBe(
        "application/json; charset=utf-8"
      );
      expect(patchResponse.statusCode).toBe(200);
      expect(patchResponse.body).toEqual(
        expect.objectContaining({
          currentHandlerIdx: 1,
        })
      );

      const getRoutesResponse = await request(app.__expressIns()).get(
        "/thongs/routes"
      );
      expect(getRoutesResponse.body.routes[0]).toEqual({
        id: route0Id,
        name: "route0",
        path: "/path0",
        method: "GET",
        currentHandlerIdx: 1,
        delay: 0,
        handlers: [
          {
            name: "handler0",
            status: 200,
          },
          {
            name: "handler1",
            status: 204,
          },
        ],
      });
    });
    test("PATCH delay", async () => {
      const patchResponse = await request(app.__expressIns())
        .patch(`/thongs/routes/${route0Id}`)
        .send({
          delay: 10,
        });

      expect(patchResponse.statusCode).toBe(200);
      expect(patchResponse.body).toEqual(
        expect.objectContaining({
          delay: 10,
        })
      );

      const getRoutesResponse = await request(app.__expressIns()).get(
        "/thongs/routes"
      );
      expect(getRoutesResponse.body.routes[0]).toEqual({
        id: route0Id,
        name: "route0",
        path: "/path0",
        method: "GET",
        currentHandlerIdx: 1,
        delay: 10,
        handlers: [
          {
            name: "handler0",
            status: 200,
          },
          {
            name: "handler1",
            status: 204,
          },
        ],
      });
    });
  });
});
