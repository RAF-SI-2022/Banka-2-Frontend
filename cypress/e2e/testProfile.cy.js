import {ProfileTestComponents} from "../../src/app/components/sprint1/profile/profileTestComponents";
import {LoginTestComponents} from "../../src/app/components/sprint1/login/loginTestComponents";
import {UsersTestComponents} from "../../src/app/components/sprint1/users/usersTestComponents";


const profileComponents = new ProfileTestComponents()
const loginComponents = new LoginTestComponents()
const userComponents = new UsersTestComponents()


it("testProfilePage", function () {
  loginComponents.login(loginComponents.admin)
  cy.wait(500)
  cy.visit('http://localhost:4200/users')

  profileComponents.addUser(loginComponents.profileTestUser.mail)
  loginComponents.logout()
  loginComponents.login(loginComponents.profileTestUser)

  profileComponents.testEditProfile()
  profileComponents.testChangePassword()

  // Brisemo usera za testiranje
  loginComponents.logout()
  loginComponents.testSessionLogin(loginComponents.admin)
  cy.wait(200);
  cy.visit('http://localhost:4200/users')

  cy.get('[psortablecolumn="id"]').click().click()
  cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
    .then(text => {
      loginComponents.id = parseInt(text)
      cy.log("ID USERA = " + loginComponents.id)
      userComponents.testDelete(loginComponents.id)

    })
  });


