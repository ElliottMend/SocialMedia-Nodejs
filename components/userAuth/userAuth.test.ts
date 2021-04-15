import { pool } from "../../connection";
import { app } from "../../app";
import supertest from "supertest";
import { stringHasNumbers } from "./userAuthController";
interface IRegister {
  username: string;
  password: string;
  email: string;
}

interface ILogin {
  email: string;
  password: string;
}

describe("Tests userAuth stringHasNumbers", () => {
  test.each(["1", "2dsadsa"])(
    "should return true",
    (value: string, done: jest.DoneCallback) => {
      const res = stringHasNumbers(value);
      expect(res).toBe(true);
      done();
    }
  );
  test.each(["abc", "def"])(
    "should return false",
    (value: string, done: jest.DoneCallback) => {
      const res = stringHasNumbers(value);
      expect(res).toBe(false);
      done();
    }
  );
});

describe("test userAuth register routes", () => {
  test.each([
    { username: "dsasa", password: "password1", email: "g@h.com" },
    { username: "dsaa", password: "password2", email: "gdfg@f.com" },
    { username: "fds", password: "password3", email: "gdfgdf@dsa.com" },
  ])("should return 200", async (value: IRegister, done: jest.DoneCallback) => {
    await supertest(app).post("/api/register").send(value).expect(200);
    done();
  });
  test.each([
    { username: "dsfdsasa", password: "password", email: "gdfgzxcdf@h.com" },
    { username: "dxcvsaa", password: "password1", email: "gdasdfgf.com" },
    { username: "fgdds", password: "password2", email: "gdfvcgdf@dsacom" },
    { username: "fds", password: "password3", email: "gdfgeqwdf@a.com" },
  ])("should return 400", async (value: IRegister, done: jest.DoneCallback) => {
    await supertest(app).post("/api/register").send(value).expect(400);
    done();
  });
});

describe("test userAuth login routes", () => {
  test.each([
    { password: "password1", email: "g@h.com" },
    { password: "password2", email: "gdfg@f.com" },
    { password: "password3", email: "gdfgdf@dsa.com" },
  ])("should return 200", async (value: ILogin, done: jest.DoneCallback) => {
    const res = await supertest(app).post("/api/login").send(value);
    expect(res.status).toBe(200);
    expect(res.header["set-cookie"][0]).toBeDefined();
    expect(res.header["set-cookie"][1]).toBeDefined();
    done();
  });
  test.each([
    { password: "password", email: "g@h.com" },
    { password: "password2", email: "gdfg@.com" },
  ])("should return 400", async (value: ILogin, done: jest.DoneCallback) => {
    await supertest(app).post("/api/login").send(value).expect(400);
    done();
  });
});
describe("Tests userAuth logout route", () => {
  test("Should return 200", async (done: jest.DoneCallback) => {
    await supertest(app).get("/api/logout").expect(200);
    done();
  });
});
afterAll(() => {
  try {
    pool.end();
  } catch (err) {
    throw err;
  }
});
