export class LoginTestComponents {

  admin = {
    mail: "anesic3119rn+banka2backend+admin@raf.rs",
    password: "admin"
  }

  testUser = {
    mail: "test@gmail.com",
    password: "@Testpassword1"
  }

  profileTestUser = {
    mail: "profileTest@gmail.com",
    password: "@Testpassword1"
  }

  agentTestUser = {
    mail: "agentTest@gmail.com",
    password: "@Testpassword1"
  }

  id: number

  testSessionLogin(user: { mail: string; password: string }) {
    cy.visit('http://localhost:4200/')
    cy.get('#email').type(user.mail)
    cy.get('#password').type(user.password)
    cy.get('.p-ripple').click()

    cy.window().its('sessionStorage.token')
      .should('not.be.null')
      .should('not.be.empty')
  }

  testRememberLogin(user: { mail: string; password: string }) {
    cy.visit('http://localhost:4200/')
    cy.get('#email').type(user.mail)
    cy.get('#password').type(user.password)
    cy.get('.p-checkbox-box').click()
    cy.get('.p-ripple').click()

    cy.window().its('localStorage.token')
      .should('not.be.null')
      .should('not.be.empty')
  }

  testBadCredentials() {
    cy.visit('http://localhost:4200/')
    cy.get('#email').type("badCredentials@mail.com")
    cy.get('#password').type("badCredentials")

    !cy.get('.p-ripple').should('not.be.disabled')
    cy.get('.p-ripple').click()

    cy.get('.ng-trigger').should("have.length", 1);

  }

  logout() {
    cy.get('#navbarDarkDropdownMenuLink > .pi').click()
    cy.get(':nth-child(2) > .dropdown-item').click()
  }

  login(user: { mail: string; password: string }) {
    cy.visit('http://localhost:4200/')
    cy.get('#email').type(user.mail)
    cy.get('#password').type(user.password)
    cy.get('.p-ripple').click()
  }

}
