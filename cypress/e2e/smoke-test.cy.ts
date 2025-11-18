describe("My First Test", () => {
  it("Visits the kitchen sink", () => {
    // Cypress recommends their example site to start
    cy.visit("https://example.cypress.io");

    // Find an element by its content
    cy.contains("type").click();

    // Should be on a new URL
    cy.url().should("include", "/commands/actions");

    // Get an input, type into it, and verify the value
    cy.get(".action-email")
      .type("fake@email.com")
      .should("have.value", "fake@email.com");
  });
});
