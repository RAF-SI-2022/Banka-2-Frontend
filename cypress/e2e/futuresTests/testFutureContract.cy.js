import {LoginTestComponents} from "../../../src/app/components/sprint1/login/loginTestComponents";
import {FutureContractTestComponents} from "../../../src/app/components/sprint3/future-contract/futureContractTestComponents";

const loginComponents = new LoginTestComponents()
const futureContractComponents = new FutureContractTestComponents()

it("testFutureContract", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/futures')
  cy.wait(500)
  futureContractComponents.testFutureContract(loginComponents.id)
})
