
export class CapitalTestComponents{

  testCapital(id: number){

    let waitTime = 500
    cy.log("CAPITAL TEST------------------------------")

    cy.get('.add-employee-btn-lg').click()
    cy.wait(waitTime)
    cy.get('.p-dropdown-trigger').click()
    cy.wait(waitTime)
    cy.get('[ng-reflect-label="RSD"] > .p-ripple').click()
    cy.wait(waitTime)
    cy.get('#integeronly').type("1000")
    cy.wait(waitTime)
    cy.get(':nth-child(2) > .mb-1').click()
    cy.wait(waitTime)
    cy.get(':nth-child(3) > .p-ripple').click()
    cy.wait(waitTime)
    cy.get('.p-dialog-header-close-icon').click()
    cy.wait(waitTime)
    cy.get('#pr_id_2-table > .p-datatable-tbody > :nth-child(1) > :nth-child(1)').click()

  }

}
