import data from "../../fixtures/items.json";
import { InventoryPage } from "../../support/page-objects/InventoryPage";
import { CartPage } from "../../support/page-objects/CartPage";
import { CheckoutPage } from "../../support/page-objects/CheckoutPage";

describe("SauceDemo Purchase Flow", () => {
  beforeEach(() => {
    cy.login();
  });

  afterEach(() => {
    cy.logout();
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it("shoud add items to cart, remove one, and complete purchase", () => {
    // create page object instances
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    // visit inventory page
    inventoryPage.visit();

    // add items to cart from fixture data
    const items = Object.values(data);
    items.forEach((item) => {
      inventoryPage.addItemToCart(item);
    });

    // validate cart count and proceed to checkout
    inventoryPage.getShoppingCartCount().should("eq", items.length);

    // navigate to cart and validate items
    inventoryPage.clickShoppingCart();

    // validate cart items and proceed to checkout
    cartPage.validateCartItemsCount(items.length);

    // remove one item and proceed to checkout
    cartPage.removeItemFromCart(items[0]);

    // validate cart items count after removal
    cartPage.validateCartItemsCount(items.length - 1);

    // proceed to checkout from cart page
    cartPage.clickCheckout();

    // fill in checkout information and complete purchase
    checkoutPage.completeCheckout();
  });
});
