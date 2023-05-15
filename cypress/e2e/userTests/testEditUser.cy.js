import {LoginTestComponents} from "../../../src/app/components/sprint1/login/loginTestComponents";
import {EditUserTestComponents} from "../../../src/app/components/sprint1/edit-user/editUserTestComponents";
import { AddUserTestComponents } from "../../../src/app/components/sprint1/add-user/addUserTestComponents";

const loginComponents = new LoginTestComponents()
const editUserComponents = new EditUserTestComponents()
const addUserComponents = new AddUserTestComponents()

// OVO JE DA VAM NE BI CRKLO KADA HOCETE NEKI RESPONSE KOJI NIJE 200
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

it('testEditUser', () => {
  loginComponents.testSessionLogin(loginComponents.admin)

  cy.wait(500)
  cy.visit('http://localhost:4200/users')

  cy.wait(500)
  addUserComponents.goToAddButton()
  addUserComponents.addAdmin()
  cy.wait(500)


  cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
      .then(text => {
        loginComponents.id = parseInt(text)
        cy.log("ID USERA = " + loginComponents.id)

        editUserComponents.editUserFail(loginComponents.id)
        editUserComponents.closeDialog()
        editUserComponents.editUser(loginComponents.id)
        addUserComponents.testDelete(loginComponents.id)

    });

})
