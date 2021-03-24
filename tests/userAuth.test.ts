import { pool } from "../models/connection";
import { app } from "../app";
import { createServer } from "http";
import supertest from "supertest";
import { Server } from "node:http";
let server: Server;
interface IEach {
  username: string;
  password: string;
  email: string;
}
let request: supertest.SuperTest<supertest.Test>;
describe("test userAuth register routes", () => {
  beforeAll(async (done) => {
    try {
      server = createServer(app);
      server.listen(done);
      pool.query("DELETE FROM user_accounts;");
      pool.query("DELETE FROM user_profiles");
      request = supertest(server);
    } catch (err) {
      throw err;
    }
  });
  test.each([
    { username: "dsasa", password: "password1", email: "g@h.com" },
    { username: "dsaa", password: "password2", email: "gdfg@f.com" },
    { username: "fds", password: "password3", email: "gdfgdf@dsa.com" },
    { username: "gdfcbc", password: "password4", email: "gdfgdf@a.com" },
    { username: "bvcbvc", password: "password5", email: "gdfgdf@ad.dsad" },
  ])("Tests register route successfully", async (value: IEach, done: any) => {
    return request
      .post("/api/register")
      .send(value)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
  test.each([
    { username: "dsfdsasa", password: "password", email: "gdfgzxcdf@h.com" },
    { username: "dxcvsaa", password: "password1", email: "gdasdfgf.com" },
    { username: "fgdds", password: "password2", email: "gdfvcgdf@dsacom" },
    { username: "fds", password: "password3", email: "gdfgeqwdf@a.com" },
    { username: "", password: "", email: "" },
  ])("Tests register route unsuccessfully", (value: IEach, done: any) => {
    return request
      .post("/api/register")
      .send(value)
      .then((res) => {
        expect(res.status).toBe(400);
        done();
      });
  });
  afterAll((done) => {
    try {
      pool.query("ROLLBACK");
      pool.end();
      server.close(done);
    } catch (err) {
      throw err;
    }
  });
});
//   it("Tests register route successfully", async (done) => {
//     const response = await supertest(app).post("/api/register").send({
//       username: "Elliott",
//       password: "password",
//       email: "email@email.com",
//     });
//     expect(response.status).toBe(200);
//     done();
//   });
//   it("Test register route incorrect format", async (done) => {});
// });
// it("Tests login route", async (done) => {
//   const response = await supertest(app)
//     .post("/api/login")
//     .send({ email: "email@email.com", password: "password" });
//   expect(response.status).toBe(200);
//   done();
// });
// it("Tests logout route", async (done) => {
//   const response = await supertest(app).get("/api/logout");
//   expect(response.status).toBe(200);
//   done();
// })
