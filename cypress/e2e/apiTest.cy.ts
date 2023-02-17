import user from "../fixtures/user.json";

describe("API tests", function () {
  let bearerToken: string;
  it("login to the app and save bearer token to the varriable", function () {
    cy.api({
      method: "POST",
      url: "https://demoqa.com/Account/v1/GenerateToken",
      body: {
        userName: user.username,
        password: user.password,
      },
    }).then((response) => {
      bearerToken = response.body.token;
      expect(response.status).to.eq(200);
      expect(bearerToken).to.be.a("string");
      expect(response.body.result).to.eq("User authorized successfully.");
    });
  });

  it("check varriable in other it", () => {
    cy.log(bearerToken);
  });

  it("Check If user is Authorized", function () {
    cy.api({
      method: "POST",
      url: "https://demoqa.com/Account/v1/Authorized",
      body: {
        userName: user.username,
        password: user.password,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq(true);
    });
  });
  it("uuid", function () {
    cy.api({
      method: "GET",
      url: "https://demoqa.com/Account/v1/User/" + user.uuid,
      headers: {
        Authorization: "Bearer " + bearerToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
