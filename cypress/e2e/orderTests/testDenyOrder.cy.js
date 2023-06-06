import {PurchasesTestComponents} from "../../../src/app/components/sprint2/purchases/purchasesTestComponents";

const purchasesTestComponents = new PurchasesTestComponents()


it("testLogin", function (){
  loginComponents.testSessionLogin(loginComponents.admin) //admin ulogovan
  cy.wait(500)
  cy.visit('http://localhost:4200/users')
  cy.wait(500)
  cy.get('#addUserBtn').click()
  cy.wait(500)
  addUserComponents.addSupervisor() //dodajemo supervizora
  cy.wait(500)
  cy.get('#addUserBtn').click()
  cy.wait(500)
  addUserComponents.addAgent() //dodajemo agenta
  cy.wait(500)
  loginComponents.logout()
  cy.wait(500)
  loginComponents.testSessionLogin(loginComponents.agentUser) //uloguje se agent
  cy.wait(500)

  // cy.get('#capitalButton').click()
  // cy.wait(1000)
  // loginComponents.logout()
  // cy.wait(500)
  // loginComponents.testSessionLogin(loginComponents.admin)
  // cy.wait(500)
  // cy.visit('http://localhost:4200/users')
  // cy.wait(500)
  // cy.get('[psortablecolumn="id"]').click().click()
  // cy.wait(500)
  // cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
  //   .then(text => {
  //     loginComponents.id = parseInt(text)
  //     cy.log("ID USERA = " + loginComponents.id)
  //     usersComponents.testDelete(loginComponents.id)
  //   });
  // cy.wait(500)
  // loginComponents.logout()
})
