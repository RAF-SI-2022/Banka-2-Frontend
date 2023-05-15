import {LoginTestComponents} from "../../../src/app/components/sprint1/login/loginTestComponents";
import {CapitalTestComponents} from "../../../src/app/components/sprint3/capital/capitalTestComponents";

const loginComponents = new LoginTestComponents()
const capitalComponents = new CapitalTestComponents()

it("testCapital", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/capital')
  cy.wait(500)
  capitalComponents.testCapital(loginComponents.id)
})
