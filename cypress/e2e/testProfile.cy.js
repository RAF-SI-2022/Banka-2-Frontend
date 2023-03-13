import {ProfileTestComponents} from "../../src/app/components/profile/profileTestComponents";
import {LoginTestComponents} from "../../src/app/components/login/loginTestComponents";


const profileComponents = new ProfileTestComponents()
const loginComponents = new LoginTestComponents()


it("testProfilePage", function (){
  loginComponents.login(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/users')

  profileComponents.addUser(loginComponents.profileTestUser.mail)
  cy.wait(200)
  cy.get('.ng-trigger').click()
  loginComponents.logout()
  loginComponents.login(loginComponents.profileTestUser)

  profileComponents.testEditProfile()
  profileComponents.testChangePassword()
})


