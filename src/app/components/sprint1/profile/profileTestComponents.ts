import {waitForAngularReady} from "@angular/cdk/testing/selenium-webdriver";

export class ProfileTestComponents {

  testEditProfile() {
    cy.log("EDIT PROFILE TEST------------------------------")

    cy.get('#navbarDarkDropdownMenuLink').click()//open profile
    cy.get(':nth-child(1) > .dropdown-item').click()

    cy.get('.right > #editBtn').click()//test input reset
    cy.get('#name-input').clear().type('testName')
    cy.get('#surname-input').clear().type('testLastname')
    // cy.get('#email-input').clear().type('testEmail@gmai.com')//todo vrati kadnije kada resimo problem emaila
    cy.get('#phone-input').clear().type('1112224455')
    cy.get('.p-dialog-header-icons > .p-ripple').click()

    cy.get('.right > #editBtn').click()//test data change
    cy.get('#name-input').clear().type('testName')
    cy.get('#surname-input').clear().type('testLastname')
    // cy.get('#email-input').clear().type('testEmail@gmai.com')//todo vrati kadnije kada resimo problem emaila
    cy.get('#phone-input').clear().type('1112224455')
    cy.get('.edit-user-form > .p-ripple').click()
  }


  testChangePassword() {
    cy.log("CHANGE PASSWORD TEST------------------------------")

    cy.get('#navbarDarkDropdownMenuLink').click()//open profile
    cy.get(':nth-child(1) > .dropdown-item').click()

    cy.get('.left > #editBtn').click()
    cy.get('#name-input').clear().type("NewPassword1")
    cy.get('#surname-input').clear().type("NewPassword1")
    cy.get('.edit-user-form > .p-ripple').click()
  }


  addUser(email: string) {
    cy.log("ADD USER TEST------------------------------")

    cy.get('#addUserBtn').click()

    cy.get('#name-input').type('TestName')
    cy.get('#surname-input').type('TestLastname')
    cy.get('#email-input').type(email)
    cy.get('#password-input').type('@Testpassword1')
    cy.get('#phone-input').type('123123123')
    cy.get('#jmbg-input').type('1234567890123')
    cy.get('.p-dropdown').click()
    cy.get('[ng-reflect-label="AGENT"] > .p-ripple').click()

    cy.get('.edit-user-form > .p-ripple').click()
  }

}
