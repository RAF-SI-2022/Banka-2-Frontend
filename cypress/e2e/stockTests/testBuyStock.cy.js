import {LoginTestComponents} from "../../../src/app/components/sprint1/login/loginTestComponents";
import {BuyStockTestComponents} from "../../../src/app/components/sprint2/stocks/buy-stock/buyStockTestComponents";

const loginComponents = new LoginTestComponents()
const buyStockComponents = new BuyStockTestComponents()

it("testBuyStocks", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/stocks')
  cy.wait(500)
  buyStockComponents.testBuyStock(loginComponents.id)
})
