export const loginSelectors = {
  usernameInput: 'input[data-test="username"]',
  passwordInput: 'input[data-test="password"]',
  loginButton: 'input[data-test="login-button"]',
  loginLogo: ".login_logo",
};

export const selectUsernameInput = () => cy.get(loginSelectors.usernameInput);
export const selectPasswordInput = () => cy.get(loginSelectors.passwordInput);
export const selectLoginButton = () => cy.get(loginSelectors.loginButton);
export const selectLoginLogo = () => cy.get(loginSelectors.loginLogo);
