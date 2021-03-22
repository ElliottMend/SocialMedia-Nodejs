import { Server } from "node:http";
import { Pool } from "pg";
import { app } from "../app";
import { setupDatabase } from "./testDB";
import { createServer } from "http";
let server: Server;
describe("Tests database connection", () => {
  let pool: Pool;
  beforeAll((done) => {
    server = createServer(app);
    server.listen(done);
    pool = setupDatabase();
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
