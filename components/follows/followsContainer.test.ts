import { pool } from "../../connection";
import { app } from "../../app";
import supertest from "supertest";
import jwt from "jsonwebtoken";
const jwtSpy = jest.spyOn(jwt, "verify");

beforeAll(async () => {
  //@ts-ignore
  jwtSpy.mockReturnValue({ username: "username", userID: 1 });
  pool.query(
    "\
    DELETE FROM posts WHERE user_id != 1 AND user_id != 2;\
    DELETE FROM user_profiles WHERE user_id != 1 AND user_id != 2;\
    DELETE FROM user_accounts WHERE user_id != 1 AND user_id != 2;"
  );
});

describe("tests changing follows", () => {
  test("tests successfully adding follow", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .put("/api/changeFollow")
      .send({ user: "usernam" });
    const follow = await pool.query(
      "SELECT * FROM follows WHERE follower_user_id = $1 AND following_user_id = $2",
      [1, 2]
    );
    expect(follow.rows[0].follower_user_id).toBe(1);
    expect(res.status).toBe(200);
    done();
  });
  test("tests successfully removing follow", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .put("/api/changeFollow")
      .send({ user: "usernam" });
    const follow = await pool.query(
      "SELECT * FROM follows WHERE follower_user_id = $1 AND following_user_id = $2",
      [1, 2]
    );
    expect(follow.rows[0]).toBeUndefined();
    expect(res.status).toBe(200);
    done();
  });
});

describe("tests checkUserFollow", () => {
  test("checks someone not following", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/checkFollow/usernam");
    expect(res.status).toBe(200);
    expect(res.text).toBe("false");
    done();
  });
  test("checks someone following", async (done: jest.DoneCallback) => {
    await supertest(app).put("/api/changeFollow").send({ user: "usernam" });
    const res = await supertest(app).get("/api/checkFollow/usernam");
    expect(res.status).toBe(200);
    expect(res.text).toBe("true");
    done();
  });
});

describe("tests followSuggestions", () => {
  test("get 0 follow suggestion", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/followSuggestions");
    expect(res.status).toBe(200);
    expect(res.body[0]).toBeUndefined();
    done();
  });

  test("get 1 follow suggestions", async (done: jest.DoneCallback) => {
    await supertest(app).put("/api/changeFollow").send({ user: "usernam" });
    const res = await supertest(app).get("/api/followSuggestions");
    expect(res.status).toBe(200);
    expect(res.body[0].username).toBe("usernam");
    done();
  });
});

describe("tests userFollowData", () => {
  test("checks user with 0 followers", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/users/usernam/followers");
    expect(res.status).toBe(200);
    expect(res.body[0]).toBeUndefined();
    done();
  });
  test("checks user with 1 follower", async (done: jest.DoneCallback) => {
    await supertest(app).put("/api/changeFollow").send({ user: "usernam" });
    const res = await supertest(app).get("/api/users/usernam/followers");
    expect(res.status).toBe(200);
    expect(res.body[0].username).toBe("username");
    done();
  });
  test("checks user following 0 people", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/users/usernam/following");
    expect(res.status).toBe(200);
    expect(res.body[0]).toBeUndefined();
    done();
  });
  test("checks user following 1 person", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/users/username/following");
    expect(res.status).toBe(200);
    expect(res.body[0].username).toBe("usernam");
    done();
  });
});

afterAll(async () => {
  await pool.end();
});
