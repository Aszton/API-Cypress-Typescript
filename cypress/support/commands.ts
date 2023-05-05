import addContext from "mochawesome/addContext";
export {};
declare global {
  namespace Cypress {
    interface Chainable {
      addContext(context: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("addContext", (context) => {
  cy.once("test:after:run", (test) => addContext({ test }, context));
});
