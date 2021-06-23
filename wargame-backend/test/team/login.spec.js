/**
    * @description      : 
    * @author           : dev1
    * @group            : 
    * @created          : 01/06/2021 - 13:01:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/06/2021
    * - Author          : dev1
    * - Modification    : 
**/
const chai = require("chai");
const { expect, should, assert } = chai;
require("mocha");
const request = require("supertest");

describe("User Login", () => {
  let loginData,
    userDataWithoutEmail,
    userDataWithoutPassword,
    loginDataFake,
    loginDataInvalidPass,
    userNotVerified;

  beforeEach(() => {
    loginData = {
      email: "sherif0@mailsac.com",
      password: "@isec2020",
    };

    loginDataFake = {
      email: "sherif5@mailsac.com",
      password: "@isec2020",
    };

    loginDataInvalidPass = {
      email: "sherif5@mailsac.com",
      password: "@isec2022",
    };

    userDataWithoutEmail = {
      password: "@isec2020",
    };

    userDataWithoutPassword = {
      email: "sherif@mailsac.com",
    };

    userDataWithInvalidEmail = {
      email: "sherif@mailsac",
      password: "@isec2020",
    };

    userNotVerified = {
      email: "mina@mailsac.com",
      password: "@isec2020",
    };
  });

  describe("Login Validation Schema", () => {
    it("email Required", () => {
      return request("localhost:3000/api")
        .post("/user/login")
        .send(userDataWithoutEmail)
        .then((response) => {
          expect(response.status).to.equal(400)
          expect('Content-Type', /json/)
          expect(response.body)
            .to.have.property("message")
            .to.equal("email is required")
            ;
        });
    });

    it("Password Required", () => {
      return request("localhost:3000/api")
        .post("/user/login")
        .send(userDataWithoutPassword)
        .then((response) => {
          expect(response.status).to.equal(400)
          expect('Content-Type', /json/)
          expect(response.body)
            .to.have.property("message")
            .to.equal("password is required");
        });
    });

    it("Email Invalid", () => {
      return request("localhost:3000/api")
        .post("/user/login")
        .send(userDataWithInvalidEmail)
        .then((response) => {
          expect(response.status).to.equal(400)
          expect('Content-Type', /json/)
          expect(response.body)
            .to.have.property("message")
            .to.equal("email must be a valid email");
        });
    });
  });

  describe("User Data Valid", () => {
    it("Email not Exists", () => {
      return request("localhost:3000/api")
        .post("/user/login")
        .send(loginDataFake)
        .then((response) => {
          expect(response.status).to.equal(401)
          expect('Content-Type', /json/)
          expect(response.body)
            .to.have.property("message")
            .to.equal("Invalid email or password");
        });
    });

    it("Password not Valid", () => {
      return request("localhost:3000/api")
        .post("/user/login")
        .send(loginDataInvalidPass)
        .then((response) => {
          expect(response.status).to.equal(401)
          expect('Content-Type', /json/)
          expect(response.body)
            .to.have.property("message")
            .to.equal("Invalid email or password");
        });
    });

    it("User not verified", () => {
      return request("localhost:3000/api")
        .post("/user/login")
        .send(userNotVerified)
        .then((response) => {
          expect(response.status).to.equal(403)
          expect('Content-Type', /json/)
          expect(response.body)
            .to.have.property("message")
            .to.equal("Email  not verified please check email address");
        });
    });

    it("User Login successfully", () => {
      return request("localhost:3000/api")
        .post("/user/login")
        .send(loginData)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body).not.to.be.empty;
          expect(response.body).to.have.property("token");
        });
    });
  });
});
