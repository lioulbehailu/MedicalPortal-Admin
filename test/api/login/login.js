process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../app");
const conn = require("../../../config/index");

describe("POST /api/doctor/login", () => {
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

  it("OK, searching for doctor", (done) => {
    // this.timeout(10000);
    request(app)
      .post("/api/doctor/searchpatient")
      .send({ query: "patient Name" })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("name");
        expect(body).to.contain.property("fatherName");
        expect(body).to.contain.property("grandFatherName");
        done();
      });
  });

  it("OK, Update Account doctor", (done) => {
    // this.timeout(10000);
    request(app)
      .post("/api/doctor/update-profile")
      .send({ doctorName: "new Name", email: "new@email.com" })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("doctorName");
        expect(body).to.contain.property("email");
        expect(body).to.contain.property("username");
        expect(body).to.contain.property("password");
        expect(body).to.contain.property("address");
        expect(body).to.contain.property("hospitalInfo");
        done();
      });
  });
});
