import user from "../fixtures/user.json";
import { env, requestsURL } from "../support/API-Commands/apiData";

describe("API tests", () => {
  before("Generate token and validate its response", () => {
    cy.generateAuthToken(env + requestsURL.token, user.username, user.password);
  });

  it("Get all books", () => {
    cy.GETrequest200(env + requestsURL.getBooks);
  });

  it("Login to the bookstore", () => {
    cy.POSTlogin200(env + requestsURL.login, user.username, user.password);
  });

  it("verify user uuid", () => {
    cy.GETuserUUID200(env + requestsURL.user + user.uuid);
  });
});
