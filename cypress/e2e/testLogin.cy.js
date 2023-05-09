import {LoginTestComponents} from "../../src/app/components/sprint1/login/loginTestComponents";

const loginComponents = new LoginTestComponents()


it("testLogin", function (){
  loginComponents.testSessionLogin(loginComponents.admin)
  loginComponents.logout()

  loginComponents.testRememberLogin(loginComponents.admin)
  loginComponents.logout()

  loginComponents.testBadCredentials()
})
