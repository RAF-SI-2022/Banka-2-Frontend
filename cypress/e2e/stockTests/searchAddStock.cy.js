import {StocksTestComponents} from "../../../src/app/components/sprint2/stocks/stocks-table/stocksTestComponents";

import {LoginTestComponents} from "../../../src/app/components/sprint1/login/loginTestComponents";



Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })


  const loginComponents = new LoginTestComponents()
  const stockComponents = new StocksTestComponents()

it("serachAddStock", function (){
    loginComponents.testSessionLogin(loginComponents.admin)
    cy.wait(500)
    cy.visit('http://localhost:4200/stocks')
    cy.wait(500)

    stockComponents.validSearch()
    cy.wait(5000)
    stockComponents.validSearchFail()
    cy.wait(5000)
    stockComponents.invalidSearch()
    cy.wait(5000)

})




