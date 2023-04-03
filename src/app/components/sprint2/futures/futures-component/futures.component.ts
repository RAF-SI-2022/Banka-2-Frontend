import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Future } from '../../../../models/stock-exchange.model';
import { StockService } from '../../../../services/stock.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-futures-component',
  templateUrl: './futures.component.html',
  styleUrls: ['./futures.component.css']
})
export class FuturesComponent implements OnInit {

  futuresMap = new Map<string, Future[]>();
  futuresSingleMap = new Map<string, Future[]>();
  agricultureFutures: Future[] = [];

  breadcrumbItems: MenuItem[];

  constructor(private httpClient: HttpClient, private stockService: StockService) {}

  ngOnInit(): void {

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Terminski ugovori', routerLink: ['/futures']},
    ];

    this.initializeFuturesMaps();
    this.getFuturesFromBack();
  }

  private initializeFuturesMaps(): void {
    const futureTypes = ['AGRICULTURE', 'ENERGY', 'METALS', 'SOFTS', 'MEATS'];
    futureTypes.forEach(type => {
      this.futuresMap.set(type, []);
      this.futuresSingleMap.set(type, []);
    });
  }

  private getFuturesFromBack(): void {
    this.stockService.getAllFutures().subscribe({
      next: (futures: Future[]) => {
        futures.forEach(futureItem => {
          this.futuresMap.get(futureItem.type)?.push(futureItem);
        });
        this.populateFuturesSingleMap();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  private populateFuturesSingleMap(): void {
    const futureTypes = ['AGRICULTURE', 'ENERGY', 'METALS', 'SOFTS', 'MEATS'];
    futureTypes.forEach(type => {
      const futures = this.futuresMap.get(type)!;
      for (const future of futures) {
        if (this.isUniqueFuture(future, type)) {
          this.futuresSingleMap.get(type)?.push(future);
        }
      }
    });
    // console.log(this.futuresSingleMap);
  }

  private isUniqueFuture(future: Future, type: string): boolean {
    return this.futuresSingleMap.get(type)!.filter(f => f.futureName === future.futureName).length === 0;
  }

  toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt: string) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
