export class HomeTestComponents {

  admin = {
    mail: "anesic3119rn+banka2backend+admin@raf.rs",
    password: "admin"
  }

  id: number

  // testSessionLogin(user: { mail: string; password: string }) {
  //   cy.visit('http://localhost:4200/')
  //   cy.get('#email').type(user.mail)
  //   cy.get('#password').type(user.password)
  //   cy.get('.p-ripple').click()
  //
  //   cy.window().its('sessionStorage.token')
  //     .should('not.be.null')
  //     .should('not.be.empty')
  // }

  home() {
    cy.visit('http://localhost:4200/home')
    cy.wait(500)
  }

  berzaButton(){
    cy.get('.p-ripple').click()
    cy.wait(1000)
  }

  goToUsers(){
    cy.get('#usersButton').click()
    cy.wait(800)
  }

  goToStocks(){
    cy.get('#stockButton').click()
    cy.wait(1000)
  }

  goToForex(){
    cy.get('#forexButton').click()
    cy.wait(800)
  }

  goToFutures(){
    cy.get('#futuresButton').click()
    cy.wait(800)
  }

  goToCapital(){
    cy.get('#capitalButton').click()
    cy.wait(800)
  }

  goToPurchases(){
    cy.get('#purchasesButton').click()
    cy.wait(800)
  }

  goToProfile(){
    cy.get('#navbarDarkDropdownMenuLink').click()
    cy.wait(800)
    cy.get(':nth-child(1) > .dropdown-item').click()
    cy.wait(800)
  }

  endCircle(){
    cy.get('.navbar-brand').click()
  }


}
