import { client } from "./testDB";
beforeAll(() => {
  client.connect();
});
afterAll(() => {
  client.end();
});
describe("Tests database connection", () => {
  it("It should return empty row", async () => {
    const query = await client.query("SELECT * FROM posts");
    expect(query.rows).toEqual([]);
  });
});
