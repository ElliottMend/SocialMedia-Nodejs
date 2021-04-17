import { app } from "../../app";
import supertest from "supertest";
import { pool } from "../../connection";
import jwt from "jsonwebtoken";
import { validRoom } from "./messageContainer";
const jwtSpy = jest.spyOn(jwt, "verify");

beforeAll(async () => {
  //@ts-ignore
  jwtSpy.mockReturnValue({ username: "username", userID: 1 });
});

describe("Creates message room", () => {
  test("create room with name", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .post("/api/createMessageRoom")
      .send({ roomName: "abc" });
    const query = await pool.query(
      "SELECT * FROM message_rooms WHERE host_id = 1"
    );
    expect(res.status).toBe(200);
    expect(query.rows.length).toBe(2);
    done();
  });
  test("create room with name and invite", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .post("/api/createMessageRoom")
      .send({ roomName: "abc", invites: [2] });
    const query = await pool.query(
      "SELECT * FROM notifications n\
        INNER JOIN message_rooms mr ON n.sending_user = mr.host_id\
        WHERE sending_user = 1 AND receiving_user = 2"
    );
    expect(res.status).toBe(200);
    expect(query.rows[0]).toBeDefined();
    expect(query.rows.length).toBe(6);
    done();
  });
  test("create room without name", async (done: jest.DoneCallback) => {
    const res = await supertest(app).post("/api/createMessageRoom");
    const query = await pool.query(
      "SELECT * FROM message_rooms WHERE host_id = 1"
    );
    expect(res.status).toBe(200);
    expect(query.rows[3].room_name).toBe("username");
    done();
  });
  test("create room without name and with invite", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .post("/api/createMessageRoom")
      .send({ invites: [2] });
    const query = await pool.query(
      "SELECT * FROM notifications n\
          INNER JOIN message_rooms mr ON n.sending_user = mr.host_id\
          WHERE sending_user = 1 AND receiving_user = 2"
    );
    expect(res.status).toBe(200);
    expect(query.rows[4]).toBeDefined();
    expect(query.rows[4].room_name).toBe("username");
    done();
  });
});

describe("get userMessageRooms", () => {
  test("Successfully get rooms", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get("/api/getMessageRooms");
    expect(res.status).toBe(200);
    expect(res.body[0]).toBeDefined();
    done();
  });
});

describe("user accepts room invite", () => {
  test("Successfully joins room", async (done: jest.DoneCallback) => {
    jwtSpy.mockReset();
    //@ts-ignore
    jwtSpy.mockReturnValue({ username: "usernam", userID: 2 });
    const res = await supertest(app)
      .post("/api/acceptRoomInvite")
      .send({ notificationId: 1 });
    const query = await pool.query("SELECT * FROM user_message_rooms");
    expect(res.status).toBe(200);
    expect(query.rows[0]).toBeDefined();
    done();
  });
});

describe("user sends message", () => {
  test("Successfully send message", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .post("/api/sendMessage")
      .send({ roomId: "a", message: "abc" });
    const messageQuery = await pool.query("SELECT * FROM messages");
    expect(res.status).toBe(200);
    expect(messageQuery.rows[0]).toBeDefined();
    done();
  });
});

describe("Tests room validity", () => {
  test("Correct room as host", async () => {
    const res = await validRoom("a", 1);
    expect(res![0].host_id).toBe(1);
  });
  test("Incorrect user", async () => {
    await expect(() => validRoom("a", 3)).rejects.toBe("User is not in room");
  });
  test("Incorrect room", async () => {
    await expect(() => validRoom("query.rows[0].room_id", 1)).rejects.toBe(
      "User is not in room"
    );
  });
});

describe("get messages", () => {
  test("Successfully get messages", async (done: jest.DoneCallback) => {
    const res = await supertest(app).get(`/api/getMessages/a`);
    expect(res.status).toBe(200);
    expect(res.body[0].body).toBe("abc");
    done();
  });
});

afterAll(async () => {
  await pool.end();
});
