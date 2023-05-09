import {LoginTestComponents} from "../../src/app/components/sprint1/login/loginTestComponents";
import {AddUserTestComponents} from "../../src/app/components/sprint1/add-user/addUserTestComponents";

const loginComponents = new LoginTestComponents()
const addUserComponents = new AddUserTestComponents()

it('addUserTest', () => {
  loginComponents.testSessionLogin(loginComponents.admin)
  addUserComponents.goToUsers()
  addUserComponents.goToAddButton()
  addUserComponents.addAdmin()
  cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
    .then(text => {
      loginComponents.id = parseInt(text)
      cy.log("ID USERA = " + loginComponents.id)

      // usersComponents.testListFilter()
      addUserComponents.testDelete(loginComponents.id)
    });
  //addUserComponents.testDelete(loginComponents.id)
  addUserComponents.goToAddButton()
  addUserComponents.addSupervisor()
  cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
    .then(text => {
      loginComponents.id = parseInt(text)
      cy.log("ID USERA = " + loginComponents.id)

      // usersComponents.testListFilter()
      addUserComponents.testDelete(loginComponents.id)
    });
  addUserComponents.goToAddButton()
  addUserComponents.addAgent()
  cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
    .then(text => {
      loginComponents.id = parseInt(text)
      cy.log("ID USERA = " + loginComponents.id)

      // usersComponents.testListFilter()
      addUserComponents.testDelete(loginComponents.id)
    });
})
