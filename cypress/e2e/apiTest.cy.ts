import user from "../fixtures/user.json";
import { requestsURL } from "../support/API-Commands/apiData";

describe("API tests", function () {
  before("Generate token and validate its response", () => {
    cy.generateAuthToken(requestsURL.token, user.userName, user.password);
  });

  it("Get all books", function () {
    cy.GETrequest200(requestsURL.getBooks);
  });

  it("Login to the bookstore", function () {
    cy.POSTlogin200(requestsURL.login, user.userName, user.password);
  });

  it("verify user uuid", function () {
    cy.GETrequest200withToken(requestsURL.user + user.uuid, this.token);
  });
});
