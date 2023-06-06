export class EditUserTestComponents {

  admin = {
    mail: "anesic3119rn+banka2backend+admin@raf.rs",
    password: "admin"
  }

  goToUsers(){
    cy.get('#usersButton').click()
    cy.wait(1000)
  }


  editUser(id: number){
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
      cy.get('#phone-input').clear().type("111111111")
      cy.wait(500)
      cy.get('#limit-input').clear().type("10000")
      cy.wait(500)
      cy.get('.edit-user-form > .p-ripple').click()
    });

  }

  editUserFail(id: number){

    cy.get('#editBtn' + id).click()

    cy.get('#email-input').clear().type("anesic3119rn+banka2backend+admin@raf.rs")
    cy.wait(500)
    cy.get('.edit-user-form > .p-ripple').click()
    cy.get('.ng-trigger').should("have.length", 1);

  }

  closeDialog(){
    cy.wait(2000)
    cy.get('#toast-container > .ng-trigger').click()
    cy.get('.p-dialog-header-close-icon').click()
  }
}
