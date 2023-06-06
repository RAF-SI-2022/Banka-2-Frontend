import {LoginTestComponents} from "../../../src/app/components/sprint1/login/loginTestComponents";
import {BuyStockTestComponents} from "../../../src/app/components/sprint2/stocks/buy-stock/buyStockTestComponents";

const loginComponents = new LoginTestComponents()
const buyStockComponents = new BuyStockTestComponents()

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})


it("testBuyStocks", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/stocks')
  cy.wait(500)


  // buyStockComponents.testBuyStockFail(loginComponents.id)



  buyStockComponents.testBuyStock(loginComponents.id)

  // buyStockComponents.testBuyStockWithLimit(loginComponents.id)

  // buyStockComponents.testBuyStockWithStop(loginComponents.id)

  // buyStockComponents.testBuyStockWithLimitAndStop(loginComponents.id)


  // buyStockComponents.testAllOrNoneBuyStockWithLimitAndStop(loginComponents.id)
  // buyStockComponents.testMarginBuyStockWithLimitAndStop(loginComponents.id)

  // buyStockComponents.testAllOrNoneBuyStockWithStop(loginComponents.id)
  // buyStockComponents.testMarginBuyStockWithStop(loginComponents.id)

  // buyStockComponents.testAllOrNoneBuyStockWithLimit(loginComponents.id)
  // buyStockComponents.testMarginBuyStockWithLimit(loginComponents.id)

  // buyStockComponents.testAllOrNoneBuyStock(loginComponents.id)
  // buyStockComponents.testMarginBuyStock(loginComponents.id)

  // buyStockComponents.testAllOrNoneAndMarginBuyStockWithLimitAndStop(loginComponents.id)

})
