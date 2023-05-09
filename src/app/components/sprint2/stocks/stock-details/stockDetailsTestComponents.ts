
export class StockDetailsTestComponents{


  testStockDetails(id: number){

    let waitTime = 2000;
    cy.log("STOCK DETAILS TEST------------------------------")

    cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').click()
    cy.wait(waitTime)
    //cy.scrollTo(100, 100).wait(0)
    cy.get('[aria-labelledby="6m"]').click()
    cy.wait(waitTime+2000)
    // cy.get('.details-container').scrollTo(0, 500)
    cy.get('.details-container').scrollIntoView()
    cy.wait(waitTime)
    cy.get('.p-button-label').click()
    cy.wait(waitTime+2000)
    cy.get('.p-dropdown-trigger').click()
    cy.wait(waitTime+2000)
    cy.get('[ng-reflect-option="2023-05-19"] > .p-ripple').click()
    cy.wait(waitTime)
    cy.get('#pr_id_48-table > .p-datatable-tbody > :nth-child(1) > .stock-symbol').click()
    cy.wait(waitTime)
    cy.get('#integeronly').type("1")
    cy.wait(waitTime)
    cy.get('.ng-submitted > :nth-child(2) > .p-ripple').click()
  }

}
