// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
// ***********************************************************

import "./commands";
import { InventoryPage } from "./page-objects/InventoryPage";
import { LoginPage } from "./page-objects/LoginPage";
import { HeaderSelectors, LoginSelectors } from "./selectors";

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (username?: string, password?: string) => {
  const user = (username || Cypress.env("USERNAME"))?.trim();
  const pass = (password || Cypress.env("PASSWORD"))?.trim();

  if (!user || !pass) {
    throw new Error(
      "cy.login(): username and password must be provided or set in Cypress.env (USERNAME / PASSWORD)"
    );
  }

  const loginKey = `login-${user}`;

  cy.session(
    loginKey,
    () => {
      const loginPage = new LoginPage();
      loginPage.visit();

      // Initial page check
      LoginSelectors.logo()
        .should("be.visible")
        .and("contain.text", "Swag Labs");

      // Perform login
      loginPage.login(user, pass);

      // Validate logged-in state
      cy.url().should("include", "/inventory.html");
    },
    {
      cacheAcrossSpecs: true,
      validate: () => {
        // Validate session cookies still valid
        cy.getCookie("session-username").should("exist");
      },
    }
  );
});

Cypress.Commands.add("logout", () => {
  const inventoryPage = new InventoryPage();
  inventoryPage.visit();
  HeaderSelectors.getMenuBtn().click();
  HeaderSelectors.logoutBtn().click();
  cy.url().should("include", "/");
});

Cypress.on("uncaught:exception", () => {
  return false;
});
