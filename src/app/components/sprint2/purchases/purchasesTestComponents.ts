
export class PurchasesTestComponents {

  testListFilter() {
    cy.log("TABLE TEST------------------------------")

    //test pretrage
    cy.get('.search-bar').click()
    cy.get('.p-inputtext').type("firstTest")
    cy.get('.p-inputtext').click()
    cy.get('.p-inputtext').clear()

    //test pretrage po poslu
    cy.get('[psortablecolumn="jobPosition"] > .flex > .icon-container > .ml-auto > .p-column-filter > .p-column-filter-menu-button').click()
    cy.get('.p-dropdown').click()
    cy.get('[ng-reflect-label="Administrator"] > .p-ripple').click()
    cy.get('[ng-reflect-label="Apply"]').click()
    //clear pretrage po poslu
    cy.get('[psortablecolumn="jobPosition"] > .flex > .icon-container > .ml-auto > .p-column-filter > .p-column-filter-menu-button').click()
    cy.get('.p-button-outlined').click()

    //test sortiranja
    cy.get('[psortablecolumn="email"]').click().click()
    cy.get('[psortablecolumn="id"]').click().click()
  }

  testEditUser(id: number) {
    cy.log("EDIT USER TEST------------------------------")

    cy.get("#buttons" + id).then($body => {    //od usera dobijamo dugmice
      if ($body.find('#editBtn' + id).length > 0) {
        cy.get('#editBtn' + id).click()
      }
      cy.get('#name-input').clear().type("NewName")
      cy.wait(500)
      cy.get('#surname-input').clear().type("NewLastname")
      cy.wait(500)
      cy.get('#email-input').clear().type("new@gmail.com")
      cy.wait(500)
      cy.get('#phone-input').clear().type("455555")
      cy.wait(500)
      cy.get('.p-dropdown').click()
      cy.wait(500)

      cy.get('[ng-reflect-label="AGENT"] > .p-ripple').click()
      // cy.get('.p-checkbox-box').click()
      cy.wait(500)
      cy.get('#limit-input').clear().type("15000")
      cy.get('.edit-user-form > .p-ripple').click()
    });
  }

  // testActivateDeactivate(id: number){
  //   cy.get("#buttons" + id).then($body => {    //od usera dobijamo dugmice
  //     if ($body.find('#deactivateBtn' + id).length > 0) {
  //       cy.get('#deactivateBtn' + id).click()
  //     }
  //     else if ($body.find('#activateBtn' + id).length > 0) {
  //       cy.get('#activateBtn' + id).click()
  //     }
  //   });
  // }

  testActivate(id: number) {
    cy.get("#buttons" + id).then($body => {    //od usera dobijamo dugmice
      if ($body.find('#activateBtn' + id).length > 0) {
        cy.get('#activateBtn' + id).click()
      }
    });
    cy.wait(3000)
  }

  testDeactivate(id: number) {
    cy.get("#buttons" + id).then($body => {    //od usera dobijamo dugmice
      if ($body.find('#deactivateBtn' + id).length > 0) {
        cy.get('#deactivateBtn' + id).click()
      }
    });
    cy.wait(500)
  }

  testDelete(id: number) {
    cy.log("DELETE TEST------------------------------")

    cy.get("#deleteBtn" + id).click()
    cy.get('.text-start > .p-ripple').click()
  }

  testAddUser(email: string) {
    cy.log("ADD USER TEST------------------------------")

    cy.get('#addUserBtn').click()

    cy.get('#name-input').type('TestName')
    cy.wait(500)
    cy.get('#surname-input').type('TestLastname')
    cy.wait(500)
    cy.get('#email-input').type(email)
    cy.wait(500)
    cy.get('#password-input').type('@Testpassword1')
    cy.wait(500)
    cy.get('#phone-input').type('123123123')
    cy.wait(500)
    cy.get('#jmbg-input').type('1234567890123')
    cy.wait(500)
    cy.get('.p-dropdown').click()
    cy.wait(500)
    cy.get('[ng-reflect-label="AGENT"] > .p-ripple').click()
    cy.wait(500)
    cy.get('#limit-input').clear().type("10000")
    cy.wait(500)
    cy.get('.edit-user-form > .p-ripple').click()
    cy.wait(500)
  }


}
