import { app } from "../../app";
import supertest from "supertest";
import { pool } from "../../connection";
import jwt from "jsonwebtoken";
const jwtSpy = jest.spyOn(jwt, "verify");

describe("Tests userController getUserProfile", () => {
  test("Successfully get user profile", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/users/username");
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    done();
  });
  test("Unsuccessfully get user profile", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/users/cxcx");
    expect(res.status).toBe(400);
    expect(res.body.data).toBe(undefined);
    done();
  });
});

describe("Test userController getUserEdit", () => {
  const jwtSpy = jest.spyOn(jwt, "verify");
  test("Successfully gets user edit", async (done: jest.DoneCallback) => {
    // @ts-ignore
    jwtSpy.mockReturnValueOnce({ username: "username", userID: 1 });
    const res = await supertest(app)
      .get("/api/getUserEdit")
      .set("Cookie", ["RefreshToken=fsdyf8sd9f7"]);
    expect(res.status).toBe(200);
    expect(res.body.bio).toBeDefined();
    done();
  });
  test("Unsuccessfully gets user edit", async (done: jest.DoneCallback) => {
    // @ts-ignore
    jwtSpy.mockReturnValueOnce({ username: "username", userID: 20 });
    const res = await supertest(app)
      .get("/api/getUserEdit")
      .set("Cookie", ["RefreshToken=fsdyf8sd9f7"]);
    expect(res.status).toBe(400);
    done();
  });
});

describe("Tests userController userEdit", () => {
  test("Successfully edits user profile", async (done: jest.DoneCallback) => {
    // @ts-ignore
    jwtSpy.mockReturnValueOnce({ username: "username", userID: 1 });
    const editData = {
      latlng: { lat: 10, lng: 25 },
      location: "Austin, TX",
      image: "dsa",
      bio: "dasb",
    };
    try {
      const res = await supertest(app)
        .put("/api/userEdit")
        .send(editData)
        .set("Cookie", ["RefreshToken=fsdyf8sd9f7"]);
      expect(res.status).toBe(200);
      done();
    } catch (err) {
      done(err);
    }
  });
  test("Unsuccessfully edits user profile", async (done: jest.DoneCallback) => {
    // @ts-ignore
    jwtSpy.mockReturnValueOnce({ username: "username", userID: 10 });
    const editData = {
      latlng: { lat: 10, lng: 25 },
      location: "Austin, TX",
      image: "dsa",
      bio: "dasb",
    };
    const res = await supertest(app)
      .put("/api/userEdit")
      .send(editData)
      .set("Cookie", ["RefreshToken=fsdyf8sd9f7"]);

    expect(res.status).toBe(400);
    done();
  });
});
afterAll(async () => {
  await pool.end();
});
