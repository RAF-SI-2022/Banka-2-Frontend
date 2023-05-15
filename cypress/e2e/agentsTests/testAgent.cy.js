import { AddUserTestComponents } from "../../../src/app/components/sprint1/add-user/addUserTestComponents"
import { LoginTestComponents } from "../../../src/app/components/sprint1/login/loginTestComponents"
import { BuyStockTestComponents } from "../../../src/app/components/sprint2/stocks/buy-stock/buyStockTestComponents"
import { AgentTestComponents } from "../../../src/app/components/sprint3/agents/agentTestComponent"



const loginComponents = new LoginTestComponents()
const addUserComponents = new AddUserTestComponents()
const buyStockComponents = new BuyStockTestComponents()
const agentComponents = new AgentTestComponents()

it("testAgent", function (){

    // Creating all users

    // loginComponents.testSessionLogin(loginComponents.admin)

    // cy.wait(500)
    // cy.visit('http://localhost:4200/users')
    // cy.wait(500)


    // addUserComponents.goToAddButton()
    // addUserComponents.addSupervisor()


    // addUserComponents.goToAddButton()
    // addUserComponents.addAgent()

    // loginComponents.logout()

    // login in as supervisor for limit testing

    loginComponents.testSessionLogin(loginComponents.supervisorUser)

    cy.wait(500)
    cy.visit('http://localhost:4200/agents')
    cy.wait(500)
    

    cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
      .then(text => {
        loginComponents.id = parseInt(text)
        cy.log("ID USERA = " + loginComponents.id)

        
        agentComponents.editAgentLimitAbove(loginComponents.id)
        agentComponents.resetAgentLimit(loginComponents.id)

        agentComponents.editAgentLimitBelow(loginComponents.id)

    });


    loginComponents.logout()

    // login in as agent so supervisor can reset limit

    loginComponents.testSessionLogin(loginComponents.agentUser)

    cy.wait(500)
    cy.visit('http://localhost:4200/stocks')
    cy.wait(500)


    buyStockComponents.testBuyStock(1) // 1 bi trebao biti aapl


    loginComponents.logout()

    // login in as supervisor to reset agents limit

    loginComponents.testSessionLogin(loginComponents.supervisorUser)

    cy.wait(500)
    cy.visit('http://localhost:4200/agents')
    cy.wait(500)

    cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
    .then(text => {
      loginComponents.id = parseInt(text)
      cy.log("ID USERA = " + loginComponents.id)

      
      agentComponents.resetAgentLimit(loginComponents.id)


  });

    loginComponents.logout()

    // Deleting all users

    // loginComponents.testSessionLogin(loginComponents.admin)

    // cy.wait(500)
    // cy.visit('http://localhost:4200/users')
    // cy.wait(500)

    // cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
    // .then(text => {
    //   loginComponents.id = parseInt(text)
    //   cy.log("ID USERA = " + loginComponents.id)
    //   cy.wait(500)
    //   // usersComponents.testListFilter()
    //   addUserComponents.testDelete(loginComponents.id)
    // });
    // cy.get('.p-datatable-tbody > :nth-child(1) > :nth-child(1)').invoke('text')//dobijamo prvog slobodnog usera
    // .then(text => {
    //   loginComponents.id = parseInt(text)
    //   cy.log("ID USERA = " + loginComponents.id)
    //   cy.wait(500)
    //   // usersComponents.testListFilter()
    //   addUserComponents.testDelete(loginComponents.id)
    // });


  })
  