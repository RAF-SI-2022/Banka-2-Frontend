
export class FutureContractTestComponents{
  testFutureContract(id: number){

    let waitTime = 500
    cy.log("FUTURE CONTRACT TEST------------------------------")

    cy.get('[ng-reflect-router-link="/future/soybean oil"]').click()
    // cy.get('[ng-reflect-router-link="/future/corn"]').click()
    cy.wait(waitTime)
    cy.get(':nth-child(1) > :nth-child(5) > .btn-i').click()
    cy.wait(waitTime*2)
    cy.get('[aria-selected="false"] > .p-ripple').click()
    cy.wait(waitTime*4)
    cy.get(':nth-child(1) > :nth-child(5) > div.ng-star-inserted > .me-1').click()
    cy.wait(waitTime)
    cy.get('#integeronly').clear().type("1000")
    cy.wait(waitTime)
    cy.get('.text-center > .mb-1').click()
    cy.wait(waitTime)
    // cy.get("#buttons" + id).then($body => {    //od usera dobijamo dugmice
    //   if ($body.find('#editBtn' + id).length > 0) {
    //     cy.get('#editBtn' + id).click()
    //   }
    // });
    cy.get('form.ng-touched > :nth-child(2) > .p-ripple').click()
    cy.wait(waitTime)
  }
}
