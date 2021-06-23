const chai = require("chai");
const { expect, should } = chai;
require("mocha");
const request = require("supertest");

describe("Testing User Signup POST api/team/signup.json", () => {
  let teamDataWithoutName,
    teamDataWithEmptyName,
    teamDataWithInvalidMinName,
    teamDataWithInvalidMaxName,
    teamDataWithInvalidName;

  beforeEach(() => {
    // team name
    teamDataWithoutName = {
      email: "sherif@mailsac.com",
      password: "@isec2020",
      country: "Egypt",
    };

    teamDataWithEmptyName = {
      name: "",
      email: "sherif@mailsac.com",
      password: "@isec2020",
      country: "Egypt",
    };

    teamDataWithInvalidMinName = {
      name: "as",
      email: "sherif@mailsac.com",
      password: "@isec2020",
      country: "Egypt",
    };

    teamDataWithInvalidMaxName = {
      name: "asdffdgfdgfdgfhghghghgfjhgjgdgfesrfewrewrfer",
      email: "sherif@mailsac.com",
      password: "@isec2020",
      country: "Egypt",
    };

    teamDataWithInvalidName = {
      name: "ra&8d",
      email: "ramy@mailsac.com",
      password: "@isec2020",
      country: "Egypt",
    };
  });

  describe("Signup Validation Schema", () => {
    describe("Team name Validation", () => {
      it("Team name Required", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamDataWithoutName)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .be.a("object")
              .to.have.property("message")
              .to.equal("team name is required");
          });
      });

      it("Team name is empty filed", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamDataWithEmptyName)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("team name cannot be an empty field");
          });
      });

      it("team name min length 3", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamDataWithInvalidMinName)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal(
                "team name should have a minimum length of 3 (letters & numbers)"
              );
          });
      });

      it("Team name max length 30", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamDataWithInvalidMaxName)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal(
                "team name should have a maximum length of 30 (letters & numbers)"
              );
          });
      });

      it("Team name Invalid", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamDataWithInvalidName)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("team name must be consists of letters & numbers only");
          });
      });
    });

    describe("Team Email Validation", () => {
      let teamWithoutEmail, teamWithEmptyEmail, teamWithInvalidEmail;
      beforeEach(() => {
        // team name
        teamWithoutEmail = {
          name: "sherif",
          password: "@isec2020",
          country: "Egypt",
        };

        teamWithEmptyEmail = {
          name: "sherif",
          email: "",
          password: "@isec2020",
          country: "Egypt",
        };

        teamWithInvalidEmail = {
          name: "sherif",
          email: "sherif@mailsac",
          password: "@isec2020",
          country: "Egypt",
        };
      });

      it("Team email Required", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamWithoutEmail)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("email is required");
          });
      });

      it("Team Email is empty filed", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamWithEmptyEmail)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("email cannot be an empty field");
          });
      });

      it("Team Email Invalid", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamWithInvalidEmail)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("Invalid email");
          });
      });
    });

    describe("Team Password Validation", () => {
      let teamWithoutPassword, teamWithEmptyPassword, teamWithInvalidPassword;
      beforeEach(() => {
        // team name
        teamWithoutPassword = {
          name: "sherif",
          email: "max@gmail.com",
          country: "Egypt",
        };

        teamWithEmptyPassword = {
          name: "sherif",
          email: "max@gmail.com",
          password: "",
          country: "Egypt",
        };

        teamWithInvalidPassword = {
          name: "sherif",
          email: "sherif@mailsac.com",
          password: "isec2020",
          country: "Egypt",
        };
      });

      it("Team password Required", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamWithoutPassword)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("password is required");
          });
      });

      it("Team password is empty filed", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamWithEmptyPassword)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("password cannot be an empty field");
          });
      });

      it("Team password Invalid", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamWithInvalidPassword)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal(
                "password must be at least a minimum of 8 characters long with 1 small letter, 1 capital letter, 1 number and 1 special character"
              );
          });
      });
    });

    describe("Team Country Validation", () => {
      let teamWithoutCountry, teamWithEmptyCountry, teamWithInvalidCountry;
      beforeEach(() => {
        // team name
        teamWithoutCountry = {
          name: "sherif",
          email: "max@gmail.com",
          password: "@Isec2020",
        };

        teamWithEmptyCountry = {
          name: "sherif",
          email: "max@gmail.com",
          password: "@Isec2020",
          country: "",
        };

        teamWithInvalidCountry = {
          name: "sherif",
          email: "sherif@mailsac.com",
          password: "@Isec2020",
          country: "E52",
        };
      });

      it("Team country Required", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamWithoutCountry)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("country is required");
          });
      });

      it("Team country is empty filed", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamWithEmptyCountry)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("country cannot be an empty field");
          });
      });

      it("Team country Invalid", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamWithInvalidCountry)
          .then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body)
              .to.have.property("message")
              .to.equal("country must be only characters");
          });
      });
    });
  });

  describe("Signup Valid", () => {
    let teamData, teamNameUsed;
    beforeEach(() => {
      teamData = {
        name: "get",
        email: "shady@mailsac.com",
        password: "@Isec2020",
        country: "Egypt",
      };

      teamNameUsed = {
        name: "get",
        email: "shady2@mailsac.com",
        password: "@Isec2020",
        country: "Egypt",
      };
    });

    describe("Register and send temp token", () => {
      it("Save User Data and Send temp token", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamData)
          .then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property("temp");
          });
      });
    });

    describe("Register Email Already registered before", () => {
      it("Email Already used before", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamData)
          .then((response) => {
            expect(response.status).to.equal(409);
            expect(response.body)
              .to.have.property("message")
              .to.equal("Email already registered before");
          });
      });
    });

    describe("Register Name Already registered before", () => {
      it("Name Already Used before", () => {
        return request("localhost:5000/api")
          .post("/team/signup.json")
          .send(teamNameUsed)
          .then((response) => {
            expect(response.status).to.equal(409);
            expect(response.body)
              .to.have.property("message")
              .to.equal("Team name is used");
          });
      });
    });
  });
});
