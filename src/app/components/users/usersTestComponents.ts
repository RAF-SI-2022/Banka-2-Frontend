export class UsersTestComponents{


  testRouterButton(){
    cy.log("------------------------------")

    cy.get('#navbarNav').children().get("#homeButton").click()
    cy.get('#navbarNav').children().get("#usersButton").click()
  }

  testListFilter(){
    cy.log("------------------------------")

    //test pretrage
    cy.get('#searchDiv').children().get('#search').type("admin@gmail.com")
    cy.get('#searchDiv').children().get('#search').clear()

    //test filtriranja liste
    cy.get('[psortablecolumn="email"] > .flex > p-sorticon.p-element > .p-sortable-column-icon').click().click()

  }

  testEditUser(id: number){
    cy.log("------------------------------")

    cy.get("#buttons" + id).then($body => {    //od usera dobijamo dugmice
      if ($body.find('#editBtn' + id).length > 0) {
        cy.get('#editBtn' + id).click()
      }
      cy.get('#name-input').clear().type("NewName")
      cy.get('#surname-input').clear().type("NewLastname")
      cy.get('#email-input').clear().type("new@gmail.com")
      cy.get('#phone-input').clear().type("111111111")
      cy.get('.p-dropdown').click()
      cy.get('.p-checkbox-box').click()

      cy.get('.edit-user-form > .p-ripple').click()
      cy.get('.p-dialog-header-icons').click()
    });
  }

  testActivity(id: number){
    cy.log("------------------------------")

    cy.get("#buttons" + id).then($body => {    //od usera dobijamo dugmice
      if ($body.find('#deactivateBtn' + id).length > 0) {
        cy.get('#deactivateBtn' + id).click()
      }
      else if ($body.find('#activateBtn' + id).length > 0) {
        cy.get('#activateBtn' + id).click()
      }
    });
  }

  testDelete(id: number){
    cy.log("------------------------------")

    cy.get("#deleteBtn" + id).click()
  }

  testAddUser(){
    cy.log("------------------------------")

    cy.get('#addUserBtn').click()

    cy.get('#name-input').type('TestName')
    cy.get('#surname-input').type('TestLastname')
    cy.get('#email-input').type('test@gmail.com')
    cy.get('#password-input').type('test')
    cy.get('#phone-input').type('123123123')
    cy.get('#jmbg-input').type('1234567890123')

    // cy.get('.p-dropdown').click() //todo ovo dodaj kada se implementuju poslovi
    cy.get('.p-checkbox-box').click()

    cy.get('.edit-user-form > .p-ripple').click()
    cy.get('.p-dialog-header-icons > .p-ripple').click()
  }


}
