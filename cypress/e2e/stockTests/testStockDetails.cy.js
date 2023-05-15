import {LoginTestComponents} from "../../../src/app/components/sprint1/login/loginTestComponents";
import {StockDetailsTestComponents} from "../../../src/app/components/sprint2/stocks/stock-details/stockDetailsTestComponents";

const loginComponents = new LoginTestComponents()
const stockDetailsComponents = new StockDetailsTestComponents()

it("testStockDetails", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/stocks')
  cy.wait(500)
  stockDetailsComponents.testStockDetails(loginComponents.id)
})
