import {Component} from '@angular/core';
import {Future} from "../../../models/stock-exchange.model";
import {StockService} from "../../../services/stock.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-single-future-table',
  templateUrl: './single-future-table.component.html',
  styleUrls: ['./single-future-table.component.css']
})
export class SingleFutureTableComponent {

  loading: boolean = true; // on load setovati na false
  allFutures: Future[] // prosledjuje mi parent
  futures: Future[]
  myFutures: Future[]
  futureName: string = "";

  constructor(private stockService: StockService, private route: ActivatedRoute) {

  }

  ngOnInit() {


    this.route.paramMap.subscribe(params => {
      this.futureName = params.get('name')!;
      console.log(this.futureName);
    });

    //ono get od url-a

    this.getAllFutures()

  }

  getAllFutures() {

    // TODO iz url-a
    //   this.stockService.getFuturesByName(futureName).subscribe(
    //     next: val =>{
    //     allFutures = val
    //
    //     // filter na myFutures i futures
    //     for(const singleFutur of allFutures){
    //       if(allFutures.user === null)//ThisUserID koji nemamo
    //       {
    //         futures.push(singleFutur)
    //       }
    //       else{
    //         myFutures.push(singleFutur)
    //       }
    //     }
    //
    //     loading = false;
    //   },
    //     error: err =>{
    //     console.log(err)
    //   }
    // )

    // this.stockService.getAllFutures().subscribe({
    //   next: val => {
    //     //val filter po futureName
    //     const filtered = val.filter(f => f.name === this.futureName)
    //
    //     this.allFutures.push(filtered)
    //
    //     // filter na myFutures i futures
    //
    //     loading = false;
    //   },
    //   error: err => {
    //     console.log(err)
    //   }
    // }


  }

  buyFuture() {

  }

  sellFuture() {

  }

}
