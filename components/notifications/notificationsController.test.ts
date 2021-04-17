import { app } from "../../app";
import jwt from "jsonwebtoken";
import { pool } from "../../connection";
import { validNotification } from "./notificationsController";
import supertest from "supertest";
const jwtSpy = jest.spyOn(jwt, "verify");

beforeAll(async () => {
  //@ts-ignore
  jwtSpy.mockReturnValue({ username: "username", userID: 1 });
});

describe("Tests valid notification", () => {
  test("Correct user notification", async (done: jest.DoneCallback) => {
    const q = await pool.query("SELECT * FROM notifications");
    const res = await validNotification(2, 1);
    expect(res[0]).toBeDefined();
    done();
  });
  test("Incorrect notification", async (done: jest.DoneCallback) => {
    await expect(() => validNotification(1, 20)).rejects.toBe(
      "Incorrect notification"
    );
    done();
  });
});

describe("Tests getting notifications", () => {
  test("Successfully get notifications", async (done: jest.DoneCallback) => {
    jwtSpy.mockReset();
    //@ts-ignore
    jwtSpy.mockReturnValue({ username: "usernam", userID: 2 });
    const res = await supertest(app).get("/api/getnotifications");
    expect(res.status).toBe(200);
    expect(res.body[0]).toBeDefined();
    done();
  });
});

describe("Test updating notifications", () => {
  test("Successfully updates notification seen", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .put("/api/updateNotifications")
      .send({ notifications: [1] });
    const seen = await pool.query(
      "SELECT * FROM notifications WHERE notification_id = 1"
    );
    expect(res.status).toBe(200);
    expect(seen.rows[0].seen).toBe(true);
    done();
  });
});

afterAll(async () => {
  await pool.end();
});
