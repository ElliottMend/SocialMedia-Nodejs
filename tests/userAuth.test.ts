import { Request, Response } from "express";
import { client } from "./testDB";
import { app } from "../app";
import { register } from "../controller/userAuth/register";
import supertest from "supertest";
describe("test userAuth rotues", () => {
  beforeAll(() => {
    client.connect();
  });
  afterAll(() => {
    client.end();
  });
  it("Tests register route", async () => {
    const res = await supertest(app)
      .post("/register")
      .send({
        username: "Elliott",
        password: "password",
        email: "email@email.com",
      })
      .expect(200);
  });
});
describe("tests userAuth controllers", () => {
  it("Tests user register controller", () => {});
});
