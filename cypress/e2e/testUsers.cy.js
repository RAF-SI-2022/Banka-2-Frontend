import {LoginTestComponents} from "../../src/app/components/sprint1/login/loginTestComponents";
import {UsersTestComponents} from "../../src/app/components/sprint1/users/usersTestComponents";

const usersComponents = new UsersTestComponents()
const loginComponents = new LoginTestComponents()


it("testUsersPage", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/users')
  usersComponents.testAddUser(loginComponents.testUser.mail)//kreiramo test usera
  cy.reload()
  cy.get('[psortablecolumn="id"]').click().click()

  cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
      .then(text => {
        loginComponents.id = parseInt(text)
        cy.log("ID USERA = " + loginComponents.id)

        // usersComponents.testListFilter()
        usersComponents.testDeactivate(loginComponents.id)//id elementa liste
        usersComponents.testActivate(loginComponents.id)
        usersComponents.testEditUser(loginComponents.id)
        usersComponents.testDelete(loginComponents.id)
    });
})

