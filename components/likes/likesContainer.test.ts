import { pool } from "../../connection";
import { app } from "../../app";
import supertest from "supertest";
import jwt from "jsonwebtoken";
const jwtSpy = jest.spyOn(jwt, "verify");
beforeAll(async () => {
  //@ts-ignore
  jwtSpy.mockReturnValue({ username: "username", userID: 1 });
});
describe("tests changing likes", () => {
  test("tests successfully adding likes", async (done: jest.DoneCallback) => {
    const res = await supertest(app).put("/api/changeLike").send({ id: 1 });
    const likes = await pool.query(
      "SELECT FROM likes WHERE user_id = $1 AND post_id = $2",
      [1, 1]
    );
    expect(res.status).toBe(200);
    expect(likes.rows[0]).toBeDefined();
    done();
  });
  test("tests successfully removing like", async (done: jest.DoneCallback) => {
    const res = await supertest(app).put("/api/changeLike").send({ id: 1 });
    const likes = await pool.query(
      "SELECT FROM likes WHERE user_id = $1 AND post_id = $2",
      [1, 1]
    );
    expect(res.status).toBe(200);
    expect(likes.rows[0]).toBeUndefined();
    done();
  });
});

describe("tests checking likes", () => {
  test("successfully checks likes on unliked post", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/checkliked/1");
    expect(res.status).toBe(200);
    done();
  });
  test("successfully checks likes on liked post", async (done: jest.DoneCallback) => {
    await supertest(app).put("/api/changeLike").send({ id: 1 });
    const res = await supertest(app).get("/api/checkliked/1");
    expect(res.status).toBe(200);
    expect(res.text).toBe("liked");
    done();
  });
});
afterAll(async () => {
  await pool.end();
});
