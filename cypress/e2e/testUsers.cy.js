import {LoginTestComponents} from "../../src/app/components/login/loginTestComponents";
import {UsersTestComponents} from "../../src/app/components/users/usersTestComponents";

const loginComponents = new LoginTestComponents()
const usersComponents = new UsersTestComponents()


it("checkToken", function (){
  loginComponents.loginAdmin(loginComponents.admin)
  loginComponents.checkToken()
})

it("testUsersPage", function (){
  loginComponents.loginAdmin(loginComponents.admin)

  usersComponents.testRouterButton()

  usersComponents.testListFilter()

  // cy.get('#emailFilter').click()//todo uradi test za mini search filter
  // cy.wait(500)
  // cy.get("input[placeholder=\"Unesite email]\"")

  usersComponents.testActivity(1)//id elementa liste

  usersComponents.testEditUser(1)

  // usersComponents.testDelete(1)

  usersComponents.testAddUser()


})
