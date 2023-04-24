import { Component } from '@angular/core';

@Component({
  selector: 'app-future-contract',
  templateUrl: './future-contract.component.html',
  styleUrls: ['./future-contract.component.css']
})
export class FutureContractComponent {

  futureContracts : any[];

  constructor() {

  }

  ngOnInit() {
    // Test podaci 
    this.futureContracts = [
      {
        oznaka: 'ABC',
        berza: 'NYSE',
        kolicinaUvlasnistvu: 10,
        cena: 100,
        vrednost: 1000,
        vrednostRSD: 100000
      },
      {
        oznaka: 'XYZ',
        berza: 'NASDAQ',
        kolicinaUvlasnistvu: 5,
        cena: 200,
        vrednost: 1000,
        vrednostRSD: 100000
      }
    ];
  }

}
