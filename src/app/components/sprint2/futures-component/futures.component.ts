import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Future} from "../../../models/stock-exchange.model";
import {StockService} from "../../../services/stock.service";
import {KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-futures-component',
  templateUrl: './futures.component.html',
  styleUrls: ['./futures.component.css']
})
export class FuturesComponent {

  futuresMap: Map<string, Future[]> = new Map<string, Future[]>();
  futuresSingleMap: Map<string, Future[]> = new Map<string, Future[]>();
  agricultureFutures: Future[] = []


  constructor(private httpClient: HttpClient, private stockService: StockService) {
  }

  ngOnInit() {
    this.futuresMap.set("AGRICULTURE", []);
    this.futuresMap.set("ENERGY", []);
    this.futuresSingleMap.set("AGRICULTURE", []);
    this.futuresSingleMap.set("ENERGY", []);

    this.getFuturesFromBack();

  }

  getFuturesFromBack() {
    this.stockService.getAllFutures().subscribe({
      next: value => {
        value.forEach((futureItem: any) => {

          this.futuresMap.get(futureItem.type)!.push(futureItem)


        })

        this.agricultureFutures = this.futuresMap.get("AGRICULTURE")!;
        const energyFutures: Future[] = this.futuresMap.get("ENERGY")!;

        for(const agricultureFuture of this.agricultureFutures) {
          if(this.futuresSingleMap.get("AGRICULTURE")!.filter(future => future.futureName === agricultureFuture.futureName).length === 0) {
            this.futuresSingleMap.get("AGRICULTURE")!.push(agricultureFuture);
          }
        }

        for(const energyFuture of energyFutures) {
          if(this.futuresSingleMap.get("ENERGY")!.filter(future => future.futureName === energyFuture.futureName).length === 0) {
            this.futuresSingleMap.get("ENERGY")!.push(energyFuture);
          }
        }

        console.log(this.futuresSingleMap)

      },
      error: err => {
        console.log(err)
      }
    })
  }

  toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
}
