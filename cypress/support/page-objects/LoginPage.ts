import { LoginSelectors } from "../selectors";

export class LoginPage {
  visit() {
    cy.visit("/");
    return this;
  }

  fillUsername(username: string) {
    LoginSelectors.username()
      .clear()
      .type(username)
      .should("have.value", username);
    return this;
  }

  fillPassword(password: string) {
    LoginSelectors.password()
      .clear()
      .type(password)
      .should("have.value", password);
    return this;
  }

  fillLoginForm(username: string, password: string) {
    this.fillUsername(username);
    this.fillPassword(password);
    return this;
  }

  submitLogin() {
    LoginSelectors.loginBtn().click();
    return this;
  }

  login(username: string, password: string) {
    this.fillLoginForm(username, password).submitLogin();
    return this;
  }
}
