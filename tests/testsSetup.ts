import { Server } from "node:http";
import { app } from "../app";
import { createServer } from "http";
import { pool } from "../connection";
import supertest from "supertest";
let server: Server;
let request: supertest.SuperTest<supertest.Test>;
export = (done: any) => {
  // server = createServer(app);
  // server.listen(done);
  request = supertest(app);
};
describe("Tests database connection", () => {
  it("It should return empty row", async (done) => {
    const query = await pool.query("SELECT * FROM posts");
    expect(query.rows).toEqual([]);
    done();
  });
});
// afterAll(async (done) => {
//   try {
//     pool.end();
//     server.close(done);
//   } catch (err) {
//     throw err;
//   }
// });
