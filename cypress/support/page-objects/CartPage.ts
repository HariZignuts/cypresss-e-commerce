import { CartSelectors } from "../selectors";

export class CartPage {
  visit() {
    cy.visit("/cart.html", { failOnStatusCode: false });
    cy.url().should("include", "/cart.html");
    return this;
  }

  validateCartItemsCount(expectedCount: number) {
    CartSelectors.items().should("have.length", expectedCount);
    return this;
  }

  removeItemFromCart(itemName: string) {
    CartSelectors.removeButton(itemName).click();
    cy.wait(500); // wait for the item to be removed from the cart
    return this;
  }

  clickCheckout() {
    CartSelectors.checkoutBtn().click();
    cy.url().should("include", "/checkout-step-one.html");
    return this;
  }
}
