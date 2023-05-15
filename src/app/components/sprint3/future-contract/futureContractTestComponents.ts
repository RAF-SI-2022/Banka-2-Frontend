
export class FutureContractTestComponents{
  testBuyFutureContract(id: number){

    let waitTime = 500
    cy.log("FUTURE CONTRACT TEST------------------------------")

    cy.get('[ng-reflect-router-link="/future/corn"]').click()
    cy.wait(waitTime)
    cy.get(':nth-child(1) > :nth-child(5) > .btn-i').click() // klik ikonice za kupovinu
    cy.wait(waitTime*2)
    cy.get('[aria-selected="false"] > .p-ripple').click() // klik na moji terminski ugovori
    cy.wait(waitTime*4)
  }

  testSellFutureContract() {
    let waitTime = 500
    cy.log("FUTURE CONTRACT SELL TEST------------------------------")

    cy.get('[ng-reflect-router-link="/future/corn"]').click()
    cy.wait(waitTime)
    cy.get('[aria-selected="false"] > .p-ripple').click() // klik na moji terminski ugovori
    cy.wait(waitTime)
    cy.get(':nth-child(1) > :nth-child(5) > div.ng-star-inserted > .me-1').click() // klik na prodaja ugovora
    cy.wait(waitTime);
    cy.get('form.ng-untouched > :nth-child(2) > .p-ripple').click() // klik na prodaj dugme
    cy.wait(waitTime * 2)
    cy.get(':nth-child(1) > :nth-child(5) > div.ng-star-inserted > .btn-i').click()
  }

  testSellFutureContractWithLimit() {

    let waitTime = 500
    cy.log("FUTURE CONTRACT SELL WITH LIMIT TEST------------------------------")

    cy.get('[ng-reflect-router-link="/future/corn"]').click()
    cy.wait(waitTime)
    cy.get('[aria-selected="false"] > .p-ripple').click() // klik na moji terminski ugovori
    cy.wait(waitTime)
    cy.get(':nth-child(1) > :nth-child(5) > div.ng-star-inserted > [title="Prodaj sa limitom"] > span > .bi').click() // klik na prodaj sa limitom
    cy.wait(waitTime)
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').click() // klik na drugo polje
    cy.get(':nth-child(2) > .p-inputwrapper > .p-inputnumber > #integeronly').type('100') // unos 100 u drugo polje
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').click() // klik na trece polje
    cy.get(':nth-child(3) > .p-inputwrapper > .p-inputnumber > #integeronly').type('100') // unos 100 u trece polje

    cy.get('form.ng-touched').click() // klik sa strane zbog validacije

    cy.get(':nth-child(4) > .p-ripple').click() // klik na prodaj

    cy.wait(waitTime)

    cy.get(':nth-child(1) > :nth-child(5) > .ng-star-inserted > .btn-i > span > .bi').click() // klik na skini sa cekanja



  }
}
