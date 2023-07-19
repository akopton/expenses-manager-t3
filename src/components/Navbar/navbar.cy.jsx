import { Navbar } from "./Navbar";
describe("render navbar", () => {
  it("render navbar", () => {
    cy.mount(NextRouter);
    cy.mount(<Navbar />);
  });
});
