import { app } from "../../app";
import supertest from "supertest";
import { pool } from "../../connection";
describe("Creates message room", () => {
  test("create room with name", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .post("/createMessageRoom")
      .send({ roomName: "abc" });
    expect(res.status).toBe(200);
    expect(res.body.room_name).toBe("abc");
    done();
  });
  test("create room with name and invite", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .post("/createMessageRoom")
      .send({ roomName: "abc", invited: ["usernam"] });
    const query = await pool.query(
      "SELECT * FROM notifications WHERE sending_user = 1 AND receiving_user = 2"
    );
    expect(res.status).toBe(200);
    expect(res.body.room_name).toBe("abc");
    expect(query.rows[0]).toBeDefined();
    done();
  });
  test("create room without name", async (done: jest.DoneCallback) => {
    const res = await supertest(app).post("/createMessageRoom");
    expect(res.status).toBe(200);
    expect(res.body.room_name).toBe("username");
    done();
  });
  test("create room without name and with invite", async (done: jest.DoneCallback) => {
    const res = await supertest(app)
      .post("/createMessageRoom")
      .send({ invited: ["usernam"] });
    const query = await pool.query(
      "SELECT * FROM notifications WHERE sending_user = 1 AND receiving_user = 2"
    );
    expect(res.status).toBe(200);
    expect(res.body.room_name).toBe("abc");
    expect(query.rows[0]).toBeDefined();
    done();
  });
});
