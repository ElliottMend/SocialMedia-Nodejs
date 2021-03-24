import supertest from "supertest";
import { app } from "../../app";
import { createServer } from "http";
import { pool } from "../../connection";
let request: supertest.SuperTest<supertest.Test>;

describe("Test userAuthentication middleware", () => {
  let server;
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
  test("Tests AccessToken success", () => {
    return request.get("");
  });
  afterAll(() => {});
});
