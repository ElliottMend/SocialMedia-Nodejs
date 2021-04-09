import { generateTokens } from "./generateTokens";
import { IGenerate } from "./userAuthentication";
import { Request, Response, NextFunction } from "express";
import { checkBodyData } from "./checkBodyData";
import { app } from "../../app";
import jwt from "jsonwebtoken";
import { userAuthentication } from "./userAuthentication";
import supertest from "supertest";
interface IEach {
  userId: number;
  username: string;
}
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
    (
      value: { username?: string; password: string; email: string },
      done: any
    ) => {
      mockRequest = { body: value };
      checkBodyData(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );
      expect(nextFunction).toBeCalled();
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
    (
      value: { username?: string; password: string; email: string },
      done: any
    ) => {
      mockRequest = {};
      const res = checkBodyData(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );
      expect(res).toBe(403);
      done();
    };
  });
});

describe("Testing generateTokens middleware", () => {
  test.each([
    { userId: 0, username: "a" },
    { userId: 10000000, username: "sfsddxfzddtertsgfgfhfdhgfdh" },
  ])("Successfully test generating tokens", (value: IEach, done: any) => {
    let response: IGenerate = generateTokens(value.userId, value.username);
    const val1 = response.access.value;
    const val2 = response.refresh.value;
    expect(response).toStrictEqual({
      access: {
        name: "AccessToken",
        value: val1,
        options: {
          httpOnly: true,
          maxAge: 3600000,
          secure: true,
          sameSite: "none",
        },
      },
      refresh: {
        name: "RefreshToken",
        value: val2,
        options: {
          httpOnly: true,
          maxAge: 259200000,
          secure: true,
          sameSite: "none",
        },
      },
    });
    done();
  });
});

describe("Test userAuthentication middleware", () => {
  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  test("Successfully test AccessToken returns 200", async (done: any) => {
    const jwtSpy = jest.spyOn(jwt, "verify");
    // @ts-ignore
    jwtSpy.mockReturnValue({ username: "", user: "" });
    const res = await supertest(app)
      .get("/api/verify")
      .set("Cookie", ["AccessToken=fsdyf8sd9f7"])
      .send({});
    expect(res.status).toBe(200);
    done();
  });

  test("Successfully test RefreshToken returns 200 and new AccessToken", async (done: any) => {
    const jwtSpy = jest.spyOn(jwt, "verify");
    // @ts-ignore
    jwtSpy.mockReturnValue({ username: "", user: "" });
    const res = await supertest(app)
      .get("/api/verify")
      .set("Cookie", ["RefreshToken=fsdyf8sd9f7"])
      .send({});
    expect(res.header["set-cookie"][0]).toBeDefined();
    expect(res.status).toBe(200);
    done();
  });
  test("Unsuccessfully test userAuthentication middleware should return 401", async (done: any) => {
    const res = await supertest(app).get("/api/verify").send({});
    expect(res.status).toBe(401);
    done();
  });
});
