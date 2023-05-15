import {LoginTestComponents} from "../../../src/app/components/sprint1/login/loginTestComponents";
import {SellStockTestComponents} from "../../../src/app/components/sprint2/stocks/sell-stock/sellStockTestComponents";

const loginComponents = new LoginTestComponents()
const sellStockComponents = new SellStockTestComponents()

it("testSellStocks", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/stocks')
  cy.wait(500)
  cy.visit('http://localhost:4200/stocks-table/sell')
  cy.wait(500)
  sellStockComponents.testSellStock(loginComponents.id)


  
})
