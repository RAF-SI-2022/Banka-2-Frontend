import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-element-creation',
  templateUrl: './transaction-element-creation.component.html',
  styleUrls: ['./transaction-element-creation.component.css']
})
export class TransactionElementCreationComponent {

  receivedItem: any;

  constructor(private router: Router){
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
       
        if ('stock' in navigation.extras.state) {
            this.receivedItem = navigation.extras.state['stock'];
            console.log(this.receivedItem);
            
        } else if ('userStock' in navigation.extras.state) {
            this.receivedItem = navigation.extras.state['contract'];
            console.log(this.receivedItem);
            
        } 
        
        
    }


}

}
