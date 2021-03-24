import { Server } from "node:http";
import { app } from "../app";
import { createServer } from "http";
import { pool } from "../connection";
let server: Server;
describe("Tests database connection", () => {
  beforeAll((done) => {
    server = createServer(app);
    server.listen(done);
  });

  it("It should return empty row", async (done) => {
    const query = await pool.query("SELECT * FROM posts");
    expect(query.rows).toEqual([]);
    done();
  });
  afterAll(async (done) => {
    try {
      pool.end();
      server.close(done);
    } catch (err) {
      throw err;
    }
  });
});
