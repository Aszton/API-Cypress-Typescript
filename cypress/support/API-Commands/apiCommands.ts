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
    cy.wrap(bearerToken).as("token");
    expect(response.status).to.eq(200);
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
      expect(response.status).within(200, 299);
    } catch {
      let responseMessage: string;
      responseMessage =
        "--------------------------------------" +
        "Service Issue" +
        "--------------------------------------\n" +
        "Request URL: " +
        String(response.allRequestResponses[0]["Request URL"]) +
        "\n" +
        "Response Status: " +
        String(response.status) +
        " " +
        String(response.statusText) +
        "\n" +
        "Response Body: " +
        String(response.allRequestResponses[0]["Response Body"]) +
        "\n \n \n";
      cy.writeFile("reports/apiLogs.json", responseMessage, {
        flag: "a+",
      }).then(() => {
        throw new Error("Fail");
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
    expect(response.status).to.eq(200);
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
    try {
      expect(response.status).within(200, 299);
    } catch {
      let responseMessage: string;
      responseMessage =
        "--------------------------------------" +
        "Service Issue" +
        "--------------------------------------\n" +
        "Request URL: " +
        String(response.allRequestResponses[0]["Request URL"]) +
        "\n" +
        "Response Status: " +
        String(response.status) +
        " " +
        String(response.statusText) +
        "\n" +
        "Response Body: " +
        String(response.allRequestResponses[0]["Response Body"]) +
        "\n \n \n";
      cy.writeFile("reports/apiLogs.json", responseMessage, {
        flag: "a+",
      }).then(() => {
        throw new Error("Fail");
      });
    }
  });
});
