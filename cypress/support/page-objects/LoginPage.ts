import {
  selectLoginButton,
  selectPasswordInput,
  selectUsernameInput,
} from "../selectors/loginSelectors";

export class LoginPage {
  visit() {
    cy.visit("/");
    return this;
  }

  fillUsername(username: string) {
    selectUsernameInput().clear().type(username).should("have.value", username);
    return this;
  }

  fillPassword(password: string) {
    selectPasswordInput().clear().type(password).should("have.value", password);
    return this;
  }

  fillLoginForm(username: string, password: string) {
    this.fillUsername(username);
    this.fillPassword(password);
    return this;
  }

  submitLogin() {
    selectLoginButton().click();
    return this;
  }

  login(username: string, password: string) {
    this.fillLoginForm(username, password).submitLogin();
    return this;
  }
}
