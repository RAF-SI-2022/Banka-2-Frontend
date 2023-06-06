export class StockSellTableTestComponents {
    openStockAndLogout(){
        let waitTime = 500
        cy.log("STOCK SELL AND LOGOUT TEST------------------------------")

        cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').click()
        cy.wait(waitTime)
        cy.get('.p-dialog-header-icons > .p-ripple').click()
        cy.wait(waitTime)
        cy.get('#navbarDarkDropdownMenuLink > .pi').click()
        cy.wait(waitTime)
        cy.get(':nth-child(2) > .dropdown-item').click()


    }
}