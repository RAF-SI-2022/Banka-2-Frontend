import {LoginTestComponents} from "../../src/app/components/login/loginTestComponents";
import {UsersTestComponents} from "../../src/app/components/users/usersTestComponents";

const loginComponents = new LoginTestComponents()
const usersComponents = new UsersTestComponents()


it("testLogin", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  loginComponents.logout()

  loginComponents.testRememberLogin(loginComponents.admin)
  loginComponents.logout()

  loginComponents.testBadCredentials()
})


it("testUsersPage", function (){
  loginComponents.testSessionLogin(loginComponents.admin)

  usersComponents.testAddUser("firstTest2@gmail.com")//kreiramo test usera
  cy.reload()

  cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
      .then(text => {
        loginComponents.id = parseInt(text)
        cy.log("ID USERA = " + loginComponents.id)

        usersComponents.testListFilter()
        usersComponents.testActivateDeactivate(loginComponents.id)//id elementa liste
        usersComponents.testActivateDeactivate(loginComponents.id)
        usersComponents.testEditUser(loginComponents.id)
        usersComponents.testDelete(loginComponents.id)
        usersComponents.testAddUser("test@gmail.com")
    });
})


it("testProfilePage", function (){
  loginComponents.testSessionLogin(loginComponents.testUser)
  usersComponents.testEditProfile()
  usersComponents.testChangePassword()
})
