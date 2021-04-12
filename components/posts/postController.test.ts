import { pool } from "../../connection";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import { app } from "../../app";
const jwtSpy = jest.spyOn(jwt, "verify");

beforeAll(async () => {
  //@ts-ignore
  jwtSpy.mockReturnValue({ username: "username", userID: 1 });
});

describe("tests post creation", () => {
  test("Successfully creates post", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .post("/api/newPost")
      .send({ body: "dsada" });
    expect(res.status).toBe(200);
    expect(res.body.post_id).toBeDefined();
    done();
  });
  test("Unsuccessfully creates empty post", async (done: jest.DoneCallback) => {
    const res = await supertest(app).post("/api/newPost").send({ body: "" });
    expect(res.status).toBe(403);
    done();
  });
  test("Unsuccessfully creates post too long", async (done: jest.DoneCallback) => {
    const res = await supertest(app).post("/api/newPost").send({
      body:
        "1159292522617945020893248462650701435296702746517621143816129860765878902758556249769828842846996602621735064493734891820756884177594212247227332526770132827630",
    });
    expect(res.status).toBe(400);
    done();
  });
});
describe("tests getting posts", () => {
  test("Successfully gets post within radius", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/getPosts/15");
    expect(res.status).toBe(200);
    expect(res.body[0]).toBeDefined();
    expect(res.body[0].post_id).toBe(1);
    done();
  });
});
describe("test removing posts", () => {
  test("Successfully removes post", async (done: jest.DoneCallback) => {
    const res = await supertest(app).put("/api/removePost").send({ id: 1 });
    expect(res.status).toBe(200);
    done();
  });
  test("Unsuccessfully removes post", async (done: jest.DoneCallback) => {
    const res = await supertest(app).put("/api/removePost").send({ id: 2 });
    expect(res.status).toBe(400);
    done();
  });
});
afterAll(async () => {
  await pool.end();
});
