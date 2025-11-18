import { CheckoutSelectors, selectors } from "../selectors";
import { TestUtils } from "../utils/TestUtils";

export class CheckoutPage {
  visit(step: number = 1) {
    if (step === 1) {
      cy.visit("/checkout-step-one.html", { failOnStatusCode: false });
      cy.url().should("include", "/checkout-step-one.html");
    } else if (step === 2) {
      cy.visit("/checkout-step-two.html", { failOnStatusCode: false });
      cy.url().should("include", "/checkout-step-two.html");
    }
    return this;
  }

  fillFirstName(firstName: string) {
    CheckoutSelectors.firstName()
      .clear()
      .type(firstName)
      .should("have.value", firstName);
    return this;
  }

  fillLastName(lastName: string) {
    CheckoutSelectors.lastName()
      .clear()
      .type(lastName)
      .should("have.value", lastName);
    return this;
  }

  fillPostalCode(postalCode: string) {
    CheckoutSelectors.postalCode()
      .clear()
      .type(postalCode)
      .should("have.value", postalCode);
    return this;
  }

  fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    this.fillFirstName(firstName);
    this.fillLastName(lastName);
    this.fillPostalCode(postalCode);
    return this;
  }

  clickContinue() {
    CheckoutSelectors.continueBtn().click();
    cy.url().should("include", "/checkout-step-two.html");
    return this;
  }

  completeCheckout(firstName?: string, lastName?: string, postalCode?: string) {
    const userData = TestUtils.generateRandomUserData();
    const fname = firstName || userData.firstName;
    const lname = lastName || userData.lastName;
    const pcode = postalCode || userData.postalCode;
    this.fillCheckoutForm(fname, lname, pcode);
    this.clickContinue();
    this.clickFinish();
    return this;
  }

  clickFinish() {
    CheckoutSelectors.finishBtn().click();
    cy.url().should("include", "/checkout-complete.html");
    return this;
  }
}
