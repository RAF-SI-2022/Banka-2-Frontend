
export class SellStockTestComponents {

  testSellStock(id: number){
    cy.log("SELL STOCK TEST------------------------------")

    let waitTime = 500

    cy.get(':nth-child(1) > :nth-child(5) > .btn-i').click()
    cy.wait(waitTime)
    cy.get(':nth-child(1) > .p-inputwrapper > .p-inputnumber > #integeronly').type("1")
    cy.wait(waitTime)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(waitTime)
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type("0")
    cy.wait(waitTime+500)
    cy.get('small').click()
    cy.wait(waitTime)
    cy.get(':nth-child(6) > .p-ripple').click()
    cy.wait(waitTime*2)

  }

}
