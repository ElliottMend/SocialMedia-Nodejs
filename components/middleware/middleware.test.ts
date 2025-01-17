import { Request, Response, NextFunction } from "express";
import { userAuthentication } from "./middlewareController";
import { app } from "../../app";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import { pool } from "../../connection";
let mockRequest: Partial<Request>;
let mockResponse: Partial<Response>;
let nextFunction: NextFunction = jest.fn();

describe("Tests userAuth stringNotEmpty", () => {
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });
  test.each([
    { username: "dafxdsfs", password: "dg98gd8gy", email: "Dsd@d.com" },
    { password: "43dgfdg43t", email: "vnbvng@dsda.com" },
    { password: "43dgfdg43t", email: "vnbvng@dsda.com" },
  ])(
    "should call nextFunction",
    async (
      value: { username?: string; password: string; email: string },
      done: jest.DoneCallback
    ) => {
      const jwtSpy = jest.spyOn(jwt, "verify");
      // @ts-ignore
      jwtSpy.mockReturnValueOnce({ username: "username", userID: 1 });
      const res = await supertest(app).get("/api/verify").send(value);
      expect(res.status).toBe(200);
      done();
    }
  );
  test.each([
    { username: "", password: "dsadsa", email: "dsa" },
    { username: "dsads", password: "", email: "dsa" },
    { username: "gdfgfdg", password: "dsadsa", email: "" },
    { password: "dsadsa", email: "" },
    { password: "", email: "dsa" },
  ])("should return 403", () => {
    async (
      value: { username?: string; password: string; email: string },
      done: jest.DoneCallback
    ) => {
      const res = await supertest(app).get("/api/verify").send(value);
      expect(res).toBe(403);
      done();
    };
  });
});

describe("Test userAuthentication middleware", () => {
  const jwtSpy = jest.spyOn(jwt, "verify");
  test("Successfully test AccessToken returns 200", async (done: jest.DoneCallback) => {
    // @ts-ignore
    jwtSpy.mockReturnValueOnce({ username: "username", userID: 1 });
    const res = await supertest(app)
      .get("/api/verify")
      .set("Cookie", ["AccessToken=fsdyf8sd9f7"]);
    expect(res.status).toBe(200);
    done();
  });

  test("Successfully test RefreshToken returns 200 and new AccessToken", async (done: jest.DoneCallback) => {
    //@ts-ignore
    jwtSpy.mockReturnValueOnce({ username: "user", userID: 2 });
    const res = await supertest(app)
      .get("/api/verify")
      .set("Cookie", ["RefreshToken=fsdyf8sd9f7"]);
    expect(res.header["set-cookie"][0]).toBeDefined();
    expect(res.status).toBe(200);
    done();
  });

  test("Unsuccessfully test userAuthentication middleware should return 401", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/verify");
    expect(res.status).toBe(401);
    expect(!res.header["set-cookie"]);
    done();
  });
});
afterAll(() => {
  pool.end();
});
