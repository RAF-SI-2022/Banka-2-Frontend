import {HomeTestComponents} from "../../src/app/components/sprint1/home/homeTestComponents";
import {LoginTestComponents} from "../../src/app/components/sprint1/login/loginTestComponents";

const homeComp = new HomeTestComponents()
const loginComponents = new LoginTestComponents()

it('testHomePage', () => {
  loginComponents.testSessionLogin(loginComponents.admin)
  homeComp.home()
  homeComp.berzaButton()
  homeComp.goToUsers()
  homeComp.goToStocks()
  homeComp.goToForex()
  homeComp.goToFutures()
  homeComp.goToCapital()
  homeComp.goToPurchases()
  homeComp.goToProfile()
  homeComp.endCircle()
})
