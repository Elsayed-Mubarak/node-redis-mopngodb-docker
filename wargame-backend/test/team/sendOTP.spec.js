const chai = require("chai");
const { expect } = chai;
require("mocha");
const request = require("supertest");

describe("Send OTP", () => {
  let tempToken, tempTokenVerifiedBefore;

  beforeEach(() => {
    tempToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI0ZjkwNzAyNmNkMzM5OTRmZTdhNzYiLCJlbWFpbCI6InlhbGxhcGxhY2VzaW5mb0BnbWFpbC5jb20iLCJpYXQiOjE2MjI0NzI5NjcsImV4cCI6MTYyMjQ3NjU2N30.TauDEy2QDAdaCzBjmZsb0Zswj-qMh8H2gxlqNwMWbNk";

    tempTokenVerifiedBefore =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGI0ZjU0NmFkYjU2MTJiODQ4MTliMWIiLCJlbWFpbCI6InlhbGxhcGxhY2VzaW5mb0BnbWFpbC5jb20iLCJpYXQiOjE2MjI0NzIwMDYsImV4cCI6MTYyMjQ3MjA2Nn0.Ig9hxwo8YtQqbhIjrn_7hmG7wLnVl3bo1CrtF4GFzb0";
  });

  it("Without temp token", () => {
    return request("localhost:5000/api")
      .post("/team/verification-code.json")
      .set({ authorization: "" })
      .then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body)
          .to.have.property("message")
          .to.equal("OTP validation time expired");
      });
  });

  it("With expired temp token", () => {
    return request("localhost:5000/api")
      .post("/team/verification-code.json")
      .set({ authorization: tempTokenVerifiedBefore })
      .then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body)
          .to.have.property("message")
          .to.equal("OTP validation time expired");
      });
  });

  it("With temp token but user verified before", () => {
    return request("localhost:5000/api")
      .post("/team/verification-code.json")
      .set({ authorization: tempToken })
      .then((response) => {
        expect(response.status).to.equal(409);
        expect(response.body)
          .to.have.property("message")
          .to.equal("Team is already verified");
      });
  });

  it("With temp token", () => {
    return request("localhost:5000/api")
      .post("/team/verification-code.json")
      .set({ authorization: tempToken })
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body)
          .to.have.property("message")
          .to.equal("Please Check your Email");
      });
  });
  
});
