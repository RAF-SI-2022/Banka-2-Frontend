export class StockDetailsTestComponents {


  testStockDetails(id: number) {

    cy.log("STOCK DETAILS TEST------------------------------")

    cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').click()
    cy.wait(4000)
    //cy.scrollTo(100, 100).wait(0)
    cy.get('[aria-labelledby="6m"]').click()
    cy.wait(4000)
    // cy.get('.details-container').scrollTo(0, 500)
    cy.get('.details-container').scrollIntoView()
    cy.wait(2000)
    cy.get('.p-button-label').click()
    cy.wait(1000)
    cy.get('.p-dropdown-trigger').click()
    cy.wait(1000)
    cy.get('[ng-reflect-option="2023-05-19"] > .p-ripple').click()
    cy.wait(1000)
    cy.get('#pr_id_6-table > .p-datatable-tbody > :nth-child(2) > .stock-symbol').click()
    cy.get('#integeronly').type("1").type('{enter}');
    cy.get('form.ng-touched > :nth-child(2) > .p-ripple').click()
    cy.wait(1000);
    cy.get('[aria-selected="false"] > .p-ripple > .p-menuitem-text')
  }

}
