export class StocksTestComponents {

    validSearchFail(){ 
        cy.get('.p-inputtext').clear().type("BA") 
        cy.get('.add-stock-container > .p-ripple').click()
        cy.get('.p-inputtext').clear()
    }
    validSearch(){ 
        cy.get('.p-inputtext').clear().type("APLE") 
        cy.get('.add-stock-container > .p-ripple').click()
        cy.get('.p-inputtext').clear()
    }
    invalidSearch(){
        cy.get('.p-inputtext').clear().type("ASD")
        cy.get('.add-stock-container > .p-ripple').click()
        cy.get('.p-inputtext').clear()
    }
}