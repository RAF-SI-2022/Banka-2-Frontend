import { AddUserTestComponents } from "../../../src/app/components/sprint1/add-user/addUserTestComponents"
import { LoginTestComponents } from "../../../src/app/components/sprint1/login/loginTestComponents"
import {UsersTestComponents} from "../../../src/app/components/sprint1/users/usersTestComponents";


const loginComponents = new LoginTestComponents()
const addUserComponents = new AddUserTestComponents()
const usersComponents = new UsersTestComponents()


it("testAgent", function (){

    loginComponents.testSessionLogin(loginComponents.admin)
    cy.wait(500)
    cy.visit('http://localhost:4200/users')
    cy.wait(500)
    cy.get('#addUserBtn').click()
    cy.wait(500)
    addUserComponents.addAgent()
    cy.wait(500)
    loginComponents.logout()
    cy.wait(500)
    loginComponents.testSessionLogin(loginComponents.agentUser)
    cy.wait(500)
    cy.get('#capitalButton').click()
    cy.wait(1000)
    loginComponents.logout()
    cy.wait(500)
    loginComponents.testSessionLogin(loginComponents.admin)
    cy.wait(500)
    cy.visit('http://localhost:4200/users')
    cy.wait(500)
    cy.get('[psortablecolumn="id"]').click().click()
    cy.wait(500)
    cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
    .then(text => {
      loginComponents.id = parseInt(text)
      cy.log("ID USERA = " + loginComponents.id)
      usersComponents.testDelete(loginComponents.id)
    });
    cy.wait(500)
    loginComponents.logout()




  })
  