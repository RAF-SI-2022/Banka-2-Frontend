
export class BuyStockTestComponents {

  testBuyStock(id: number) {
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get('.p-button-label').click()
    cy.wait(500)

    // cy.get("#buttons" + id).then($body => {    //od usera dobijamo dugmice
    //   if ($body.find('#editBtn' + id).length > 0) {
    //     cy.get('#editBtn' + id).click()
    //   }
    //   cy.get('#name-input').clear().type("NewName")
    //   cy.wait(500)
    //   cy.get('#surname-input').clear().type("NewLastname")
    //   cy.wait(500)
    //   cy.get('#email-input').clear().type("new@gmail.com")
    //   cy.wait(500)
    //   cy.get('#phone-input').clear().type("455555")
    //   cy.wait(500)
    //   cy.get('.p-dropdown').click()
    //   cy.wait(500)
    //
    //   cy.get('[ng-reflect-label="AGENT"] > .p-ripple').click()
    //   // cy.get('.p-checkbox-box').click()
    //   cy.wait(500)
    //   cy.get('#limit-input').clear().type("15000")
    //   cy.get('.edit-user-form > .p-ripple').click()
    // });
  }

  testBuyStockFail(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10000")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get('.p-button-label').click()
    cy.wait(500)
  }

  testBuyStockWithLimit(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
  testBuyStockWithStop(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
  testBuyStockWithLimitAndStop(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
  testMarginBuyStock(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get('.text-start > .p-element > .p-checkbox > .p-checkbox-box').click()
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
  testAllOrNoneBuyStock(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get('.text-end > .p-element > .p-checkbox > .p-checkbox-box').click()
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
  testMarginBuyStockWithLimit(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get('.text-start > .p-element > .p-checkbox > .p-checkbox-box').click()
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
  testAllOrNoneBuyStockWithLimit(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get('.text-end > .p-element > .p-checkbox > .p-checkbox-box').click()
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
  testMarginBuyStockWithStop(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get('.text-start > .p-element > .p-checkbox > .p-checkbox-box').click()
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
  testAllOrNoneBuyStockWithStop(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get('.text-end > .p-element > .p-checkbox > .p-checkbox-box').click()
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
  testMarginBuyStockWithLimitAndStop(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("50")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get('.text-start > .p-element > .p-checkbox > .p-checkbox-box').click()
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
  testAllOrNoneBuyStockWithLimitAndStop(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get('.text-end > .p-element > .p-checkbox > .p-checkbox-box').click()
    cy.get('.p-button-label').click()
    cy.wait(500)
  }
    testAllOrNoneAndMarginBuyStockWithLimitAndStop(id: number){
    cy.log("BUY STOCK TEST------------------------------")

    cy.get(':nth-child(1) > :nth-child(7) > .btn-i').click()
    cy.wait(500)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("10")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("5")
    cy.wait(500)
    cy.get('.text-end > .p-element > .p-checkbox > .p-checkbox-box').click()
    cy.get('.text-start > .p-element > .p-checkbox > .p-checkbox-box').click()

    cy.get('.p-button-label').click()
    cy.wait(500)
  }
}
