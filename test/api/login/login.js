process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../app");
const conn = require("../../../config/index");

describe("POST /api/doctor/login", () => {
  // before((done) => {
  //   conn
  //     .connect()
  //     .then(() => done())
  //     .catch((err) => done(err));
  // });

  // after((done) => {
  //   conn
  //     .close()
  //     .then(() => done())
  //     .catch((err) => done(err));
  // });

  it("OK, creating new login request", (done) => {
    // this.timeout(10000);
    request(app)
      .post("/api/doctor/login")
      .send({ email: "lioul@gmail.com", password: "123456" })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("_id");
        done();
      });
  });
});
