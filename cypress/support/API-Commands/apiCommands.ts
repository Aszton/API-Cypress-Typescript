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
      GETrequest200withToken(url: string, token: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("generateAuthToken", function (url, username, password) {
  let bearerToken: string;
  cy.request({
    method: "POST",
    url: url,
    body: {
      userName: username,
      password: password,
    },
  }).then((response) => {
    bearerToken = response.body.token;
    cy.wrap(bearerToken, { log: false }).as("token");
    expect(response.status).to.be.within(200, 299);
    expect(response.body).to.have.property("token");
    expect(response.body.result).to.eq("User authorized successfully.");
  });
});

Cypress.Commands.add("GETrequest200", function (url) {
  cy.request({
    failOnStatusCode: false,
    method: "GET",
    url: url,
  }).then((response) => {
    try {
      cy.addContext("status code:" + JSON.stringify(response.status));
      cy.addContext("status text:" + JSON.stringify(response.statusText));
      cy.addContext("response body:" + JSON.stringify(response.body));
      expect(response.status).within(400, 500);
    } catch {
      cy.log("error").then(() => {
        throw new Error("GET request 200 failed");
      });
    }
  });
});

Cypress.Commands.add("POSTlogin200", function (url, username, password) {
  cy.request({
    method: "POST",
    url: url,
    body: {
      userName: username,
      password: password,
    },
  }).then((response) => {
    expect(response.status).to.be.within(200, 299);
  });
});

Cypress.Commands.add("GETrequest200withToken", function (url, token) {
  cy.request({
    method: "GET",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    expect(response.status).within(200, 299);
  });
});
