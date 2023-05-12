import {LoginTestComponents} from "../../src/app/components/sprint1/login/loginTestComponents";
import {ForexTestComponents} from "../../src/app/components/sprint2/forex/forexTestComponents";

const loginComponents = new LoginTestComponents()
const forexComponents = new ForexTestComponents()

it("testForex", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/forex')
  cy.wait(500)
  forexComponents.testForex(loginComponents.id)
})
