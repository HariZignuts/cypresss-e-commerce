// Generic getter helper
export const $ = (selector: string) => () => cy.get(selector);

// ----------------------
// ALL SELECTORS
// ----------------------
export const selectors = {
  cart: {
    item: 'div[data-test="inventory-item"]',
    itemName: 'div[data-test="inventory-item-name"]',
    removeBtn: "button",
    checkoutBtn: 'button[data-test="checkout"]',
  },

  checkout: {
    firstName: 'input[data-test="firstName"]',
    lastName: 'input[data-test="lastName"]',
    postalCode: 'input[data-test="postalCode"]',
    continueBtn: 'input[data-test="continue"]',
    finishBtn: 'button[data-test="finish"]',
  },

  header: {
    appLogo: ".app_logo",
    cartLink: 'a[data-test="shopping-cart-link"]',
    cartBadge: 'span[data-test="shopping-cart-badge"]',
    logoutBtn: 'a[data-test="logout-sidebar-link"]',
    getMenuBtn: 'button[id="react-burger-menu-btn"]',
  },

  inventory: {
    item: 'div[data-test="inventory-item"]',
    itemName: 'div[data-test="inventory-item-name"]',
    addBtn: "button",
  },

  login: {
    username: 'input[data-test="username"]',
    password: 'input[data-test="password"]',
    loginBtn: 'input[data-test="login-button"]',
    logo: ".login_logo",
  },
};

// ----------------------
// DIRECT SELECTOR GETTERS
// ----------------------

export const CartSelectors = {
  items: $(selectors.cart.item),
  checkoutBtn: $(selectors.cart.checkoutBtn),

  removeButton(productName: string) {
    return cy
      .contains(selectors.cart.itemName, productName)
      .closest(selectors.cart.item)
      .find(selectors.cart.removeBtn);
  },
};

export const CheckoutSelectors = {
  firstName: $(selectors.checkout.firstName),
  lastName: $(selectors.checkout.lastName),
  postalCode: $(selectors.checkout.postalCode),
  continueBtn: $(selectors.checkout.continueBtn),
  finishBtn: $(selectors.checkout.finishBtn),
};

export const HeaderSelectors = {
  logo: $(selectors.header.appLogo),
  cartLink: $(selectors.header.cartLink),
  cartBadge: $(selectors.header.cartBadge),
  logoutBtn: $(selectors.header.logoutBtn),
  getMenuBtn: $(selectors.header.getMenuBtn),
};

export const InventorySelectors = {
  addToCart(productName: string) {
    return cy
      .contains(selectors.inventory.itemName, productName)
      .closest(selectors.inventory.item)
      .find(selectors.inventory.addBtn);
  },
};

export const LoginSelectors = {
  username: $(selectors.login.username),
  password: $(selectors.login.password),
  loginBtn: $(selectors.login.loginBtn),
  logo: $(selectors.login.logo),
};
