import supertest from "supertest";
import { app } from "../../app";
import jwt from "jsonwebtoken";
import { pool } from "../../connection";
const jwtSpy = jest.spyOn(jwt, "verify");
beforeAll(async () => {
  //@ts-ignore
  jwtSpy.mockReturnValue({ username: "username", userID: 1 });
});

describe("Test creating comments", () => {
  test("tests successfully creating a comment", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .post("/api/createComment")
      .send({ text: "gdfgdg", id: 1 });
    expect(res.status).toBe(200);
    expect(res.body.comment_id).toBeDefined();
    done();
  });
  test("tests unsuccessfully creating a comment", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .post("/api/createComment")
      .send({ text: "gdfgdg", id: 1100 });
    expect(res.status).toBe(400);
    done();
  });
});

describe("Test getting comments", () => {
  test("tests successfully getting comments", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/getComments/1");
    expect(res.status).toBe(200);
    expect(res.body[0].comment_id).toBeDefined();
    done();
  });
  test("tests unsuccessfully creating a comment", async (done: jest.DoneCallback) => {
    const res = await supertest(app).post("/api/getComments/1424");
    expect(res.status).toBe(404);
    done();
  });
});

describe("Test creating comments", () => {
  test("tests successfully creating a comment", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .put("/api/removeComment")
      .send({ text: "gdfgdg", commentId: 1 });
    expect(res.status).toBe(200);
    done();
  });
  test("tests unsuccessfully creating a comment", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .put("/api/removeComment")
      .send({ text: "gdfgdg", commentId: 200 });
    expect(res.status).toBe(400);
    done();
  });
});

afterAll(async () => {
  await pool.end();
});
