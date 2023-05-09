
export class ForexTestComponents{

  testForex(id: number) {
    let waitTime = 500
    cy.log("FOREX TEST------------------------------")

    cy.get('.p-inputgroup > .p-inputtext').type("100")
    cy.wait(500)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
    cy.wait(500)
    cy.get('[ng-reflect-label="USD"] > .p-ripple').click()
    cy.wait(500)
    cy.get(':nth-child(4) > .p-inputwrapper > .p-dropdown > .p-dropdown-label').click()
    cy.wait(500)
    cy.get('.p-dropdown-filter').type("CHF")
    cy.wait(500)
    cy.get('.p-ripple').click()
    cy.wait(500)
    cy.get('.p-button-label').click()

  }

}
