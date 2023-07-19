describe("Navigation", () => {
  it("should navigate to expenses page", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.get("a[href='/bills']").click();
    cy.url().should("include", "bills");
    cy.get(".grid > a[href*='/categories']").click();
    cy.url().should("include", "bills/categories");
  });

  it("should navigate to analytics page", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.get("a[href='/analytics']").click();
    cy.url().should("include", "analytics");
  });

  it("should navigate to add-bill page", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.get("a[href*='/add-bill']").click();
    cy.url().should("include", "/add-bill");
    cy.get("#name-input");
  });

  it("should navigate to add-set page", () => {
    cy.visit("http://localhost:3000/dashboard");
    cy.get("a[href*='/bills/sets?id=add-set']").click();
    cy.url().should("include", "/sets");
    cy.get("#set-name");
  });
});
