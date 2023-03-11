export class LoginTestComponents {


  admin = {
    mail: "admin@gmail.com",
    password: "admin"
  }

  user = {
    mail: "",
    password: ""
  }

  loginAdmin(user: { mail: string; password: string }) {
    cy.visit('http://localhost:4200/login')
    cy.get('#email').type(user.mail)
    cy.get('#password').type(user.password)
    cy.get('.p-ripple').click()
  }

  checkToken(){
    cy.window().its('localStorage.token')
      .should('not.be.null')
      .should('not.be.empty')
  }


}
