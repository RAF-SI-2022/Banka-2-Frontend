import {LoginTestComponents} from "../../src/app/components/sprint1/login/loginTestComponents";
import {EditUserTestComponents} from "../../src/app/components/sprint1/edit-user/editUserTestComponents";

const loginComponents = new LoginTestComponents()
const editUserComponents = new EditUserTestComponents()

it('testEditUser', () => {
  loginComponents.testSessionLogin(loginComponents.admin)
  editUserComponents.goToUsers()
  editUserComponents.editUser(loginComponents.id)
})
