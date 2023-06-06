
export class AgentTestComponents {

    editAgentLimitAbove(id : number){
        cy.log("AGENT------------------------------")

        cy.get('#editBtn' + id).click()
        cy.wait(500)

        cy.get('#limit-input').clear()
        cy.get('#limit-input').type("20000")


        cy.get('.edit-user-form > .p-ripple').click()

    }
    editAgentLimitBelow(id : number){
        cy.log("AGENT------------------------------")

        cy.get('#editBtn' + id).click()
        cy.wait(500)

        cy.get('#limit-input').clear()
        cy.get('#limit-input').type("10000")


        cy.get('.edit-user-form > .p-ripple').click()
    }
    resetAgentLimit(id : number){
        cy.log("AGENT------------------------------")

        cy.get('#resetLimitBtn'+ id).click()
        cy.wait(500)

    }


}
    