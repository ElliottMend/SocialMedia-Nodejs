import { app } from "../../app";
import supertest from "supertest";
import { pool } from "../../connection";
import jwt from "jsonwebtoken";
beforeAll(() => {});
// describe("Tests userController getUserProfile", () => {
//   test("Successfully get user profile", async (done: any) => {
//     const res = await supertest(app)
//       .get("/api/users/username")
//       .expect(200)
//       .then(() => {
//         done();
//       });
//   });
// });
describe("Test userController getUserEdit", () => {
  test("Successfully gets user edit", async (done: any) => {
    const jwtSpy = jest.spyOn(jwt, "verify");
    // @ts-ignore
    jwtSpy.mockReturnValue({ username: "username", user: "1" });
    const res = await supertest(app)
      .get("/api/getUserEdit")
      .set("Cookie", ["RefreshToken=fsdyf8sd9f7"])
      .send({});
    expect(res.status).toBe(200);
    done();
  });
});
afterAll(() => {});
