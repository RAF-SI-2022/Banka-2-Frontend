import {LoginTestComponents} from "../../../src/app/components/sprint1/login/loginTestComponents";
import {CapitalTestComponents} from "../../../src/app/components/sprint3/capital/capitalTestComponents";
import {BuyStockTestComponents} from "../../../src/app/components/sprint2/stocks/buy-stock/buyStockTestComponents";
import {StockSellTableTestComponents} from "../../../src/app/components/sprint2/stocks/stock-sell-table/stockSellTableTestComponents";


const loginComponents = new LoginTestComponents()
const capitalComponents = new CapitalTestComponents()
const buyStockComponents = new BuyStockTestComponents()
const stockSellTableComponents = new StockSellTableTestComponents()


it("testCapital", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/capital')
  cy.wait(500)
  capitalComponents.testCapital(loginComponents.id)
  cy.wait(500)
  cy.visit('http://localhost:4200/stocks')
  cy.wait(500)
  buyStockComponents.testBuyStock(loginComponents.id)
  cy.wait(500)
  cy.visit('http://localhost:4200/capital')
  cy.wait(500)
  capitalComponents.testOpenUSDCapital()
  cy.wait(500)
 // cy.visit('http://localhost:4200/stocks-table/sell')
  stockSellTableComponents.openStockAndLogout()


  
})
