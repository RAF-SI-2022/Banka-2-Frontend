export class AddUserTestComponents {

  admin = {
    mail: "anesic3119rn+banka2backend+admin@raf.rs",
    password: "admin"
  }

  goToUsers(){
    cy.get('#usersButton').click()
    cy.wait(1000)
  }

  goToAddButton(){
    cy.get('#addUserBtn').click()
    cy.wait(800)
  }

  addAdmin(){
    cy.get('#name-input').type("Admin")
    cy.wait(500)
    cy.get('#surname-input').type("Adminic")
    cy.wait(500)
    cy.get('#email-input').type("admin@raf.rs")
    cy.wait(500)
    cy.get('#password-input').type("admin")
    cy.wait(500)
    cy.get('#phone-input').type("0641111111")
    cy.wait(500)
    cy.get('#jmbg-input').type("2209999760025")
    cy.wait(500)
    cy.get('.p-dropdown-label').click()
    cy.wait(500)
    cy.get('[ng-reflect-label="ADMINISTRATOR"] > .p-ripple > .ng-star-inserted').click()
    cy.wait(500)
    cy.get('.edit-user-form > .p-ripple > .p-button-label').click()
    cy.wait(2200)
    //cy.get('.p-dialog-mask').click()
  }

  addSupervisor(){
    cy.get('#name-input').type("Super")
    cy.wait(500)
    cy.get('#surname-input').type("Superko")
    cy.wait(500)
    cy.get('#email-input').type("super@raf.rs")
    cy.wait(500)
    cy.get('#password-input').type("super")
    cy.wait(500)
    cy.get('#phone-input').type("0642111111")
    cy.wait(500)
    cy.get('#jmbg-input').type("2209999760024")
    cy.wait(500)
    cy.get('.p-dropdown-label').click()
    cy.wait(500)
    cy.get('[ng-reflect-label="SUPERVISOR"] > .p-ripple > .ng-star-inserted').click()
    cy.wait(500)
    cy.get('.edit-user-form > .p-ripple > .p-button-label').click()
    cy.wait(2200)
  }

  addAgent(){
    cy.get('#name-input').type("Agentt")
    cy.wait(500)
    cy.get('#surname-input').type("Agenttic")
    cy.wait(500)
    cy.get('#email-input').type("agentt@raf.rs")
    cy.wait(500)
    cy.get('#password-input').type("agentt")
    cy.wait(500)
    cy.get('#phone-input').type("0643111111")
    cy.wait(500)
    cy.get('#jmbg-input').type("2209999760023")
    cy.wait(500)
    cy.get('.p-dropdown-label').click()
    cy.wait(500)
    cy.get('[ng-reflect-label="AGENT"] > .p-ripple > .ng-star-inserted').click()
    cy.wait(500)
    cy.get('#limit-input').type("15000")
    cy.get('.edit-user-form > .p-ripple > .p-button-label').click()
  }

  testDelete(id: number) {
    cy.log("DELETE TEST------------------------------")

    cy.get("#deleteBtn" + id).click()
    cy.get('.text-start > .p-ripple').click()
  }
  closeDialog(){
    cy.wait(2000)
    cy.get('#toast-container > .ng-trigger').click()
    cy.get('.p-dialog-header-close-icon').click()
  }
}
