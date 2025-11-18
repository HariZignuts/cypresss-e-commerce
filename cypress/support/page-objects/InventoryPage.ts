import { HeaderSelectors, InventorySelectors, selectors } from "../selectors";

export class InventoryPage {
  visit() {
    cy.visit("/inventory.html", { failOnStatusCode: false });
    cy.url().should("include", "/inventory.html");
    return this;
  }

  addItemToCart(itemName: string) {
    cy.log(`Adding item to cart: ${itemName}`);
    this.getShoppingCartCount().as("initialCount");
    InventorySelectors.addToCart(itemName).click();
    cy.get<number>("@initialCount").then((initialCount) => {
      this.getShoppingCartCount().should("eq", initialCount + 1);
    });
    return this;
  }
  getShoppingCartCount = (): Cypress.Chainable<number> => {
    return cy.get("body").then(($body) => {
      const $badge = $body.find(selectors.header.cartBadge);
      // If badge exists, parse text; otherwise return 0
      return $badge.length ? parseInt($badge.text()) : 0;
    });
  };
  clickShoppingCart() {
    HeaderSelectors.cartLink().click();
    cy.url().should("include", "/cart.html");
    return this;
  }
}
