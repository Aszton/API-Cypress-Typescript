export {};
declare global {
  namespace Cypress {
    interface Chainable {
      generateAuthToken(
        env: string,
        username: string,
        password: string
      ): Chainable<void>;
      GETrequest200(url: string): Chainable<void>;
      POSTlogin200(
        url: string,
        username: string,
        password: string
      ): Chainable<void>;
      GETuserUUID200(url: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("generateAuthToken", function (url, username, password) {
  let bearerToken: string;
  cy.api({
    method: "POST",
    url: url,
    body: {
      userName: username,
      password: password,
    },
  }).then((response) => {
    bearerToken = response.body.token;
    cy.wrap(bearerToken).as("token");
    expect(response.status).to.eq(200);
    expect(response.body.result).to.eq("User authorized successfully.");
  });
});

Cypress.Commands.add("GETrequest200", function (url) {
  cy.api({
    method: "GET",
    url: url,
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("POSTlogin200", function (url, username, password) {
  cy.api({
    method: "POST",
    url: url,
    body: {
      userName: username,
      password: password,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Cypress.Commands.add("GETuserUUID200", function (url) {
  cy.api({
    method: "GET",
    url: url,
    headers: {
      Authorization: "Bearer " + this.token,
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});
