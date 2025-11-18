// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import { LoginPage } from "./page-objects/LoginPage";
import { selectLoginLogo } from "./selectors/loginSelectors";

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(username?: string, password?: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (username?: string, password?: string) => {
  const user = username?.trim() || Cypress.env("USERNAME");
  const pass = password?.trim() || Cypress.env("PASSWORD");

  if (!user || !pass) {
    throw new Error(
      "cy.login(): username and password must be provided or set in Cypress.env (USERNAME / PASSWORD)"
    );
  }

  // create a unique key for the session
  const loginKey = `login-${user}`;

  cy.session(
    loginKey,
    () => {
      const loginPage = new LoginPage();
      loginPage.visit();
      // Check login page initial state (logo visible)
      selectLoginLogo().should("be.visible").and("contain.text", "Swag Labs");
      // Perform UI login using page object
      loginPage.login(user, pass);
      // Verify successful login by checking URL
      cy.url().should("include", "/inventory.html");
    },
    {
      cacheAcrossSpecs: true,
      validate: () => {
        cy.getCookie("session-username").should("exist");
      },
    }
  );
});
