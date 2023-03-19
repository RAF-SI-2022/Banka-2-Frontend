
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MenuItem} from "primeng/api";
import { ISO, Type } from 'src/app/models/stock-exchange.model';
import { UserService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-buysell',
  templateUrl: './buysell.component.html',
  styleUrls: ['./buysell.component.css']
})
export class BuysellComponent {

  breadcrumbItems: MenuItem[];

  types: Type[];

  iso: ISO[];

  selectedType: Type = {name: 'STOCKS'};

  stateOptions: any[];

  buysell: string = "buy";

  AllorNone: boolean = false;

  Margin: boolean = false;

  buySellForm: FormGroup;

 

  constructor(private formBuilder: FormBuilder,private userService: UserService) {
    this.types = [
        {name: 'STOCKS'},
        {name: 'FOREX'},
        {name: 'FUTURES'},
    ];

    this.iso = [
      {name: 'AED'},{name: 'AFN'},{name: 'ALL'},{name: 'AMD'},{name: 'ANG'},{name: 'AOA'},{name: 'ARS'},{name: 'AUD'},{name: 'AWG'},{name: 'AZN'},{name: 'BAM'},{name: 'BBD'},{name: 'BDT'},{name: 'BGN'},{name: 'BHD'},{name: 'BIF'},{name: 'BMD'},{name: 'BND'},{name: 'BOB'},{name: 'BRL'},{name: 'BSD'},{name: 'BTN'},{name: 'BWP'},{name: 'BZD'},{name: 'CAD'},{name: 'CDF'},{name: 'CHF'},{name: 'CLF'},{name: 'CLP'},{name: 'CNH'},{name: 'CNY'},{name: 'COP'},{name: 'CUP'},{name: 'CVE'},{name: 'CZK'},{name: 'DJF'},{name: 'DKK'},{name: 'DOP'},{name: 'DZD'},{name: 'EGP'},
      {name: 'ERN'},{name: 'ETB'},{name: 'EUR'},{name: 'FJD'},{name: 'FKP'},{name: 'GBP'},{name: 'GHS'},{name: 'GIP'},{name: 'GMD'},{name: 'GNF'},{name: 'GTQ'},{name: 'GYD'},{name: 'HKD'},{name: 'HNL'},{name: 'HRK'},{name: 'HTG'},{name: 'HUF'},{name: 'ICP'},{name: 'IDR'},{name: 'ILS'},{name: 'INR'},{name: 'IQD'},{name: 'IRR'},{name: 'ISK'},{name: 'JEP'},{name: 'JMD'},{name: 'JPY'},{name: 'KES'},{name: 'KGS'},{name: 'KHR'},{name: 'KMF'},{name: 'KPW'},{name: 'KRW'},{name: 'KWD'},{name: 'KYD'},{name: 'KZT'},{name: 'LAK'},{name: 'LBP'},{name: 'LKR'},{name: 'LRD'},{name: 'LSL'},{name: 'LYD'},{name: 'MAD'},{name: 'MDL'},{name: 'MGA'},{name: 'MKD'},{name: 'MMK'},{name: 'MNT'},{name: 'MOP'},{name: 'MRO'},{name: 'MRU'},
      {name: 'MUR'},{name: 'MVR'},{name: 'MWK'},{name: 'MXN'},{name: 'MYR'},{name: 'MZN'},{name: 'NAD'},{name: 'NGN'},{name: 'NOK'},{name: 'NPR'},{name: 'NZD'},{name: 'OMR'},{name: 'PAB'},{name: 'PEN'},{name: 'PGK'},{name: 'PHP'},{name: 'PKR'},{name: 'PLN'},{name: 'PYG'},{name: 'QAR'},{name: 'RON'},{name: 'RSD'},{name: 'RUB'},{name: 'RUR'},{name: 'RWF'},{name: 'SAR'},{name: 'SBDf'},{name: 'SCR'},{name: 'SDG'},{name: 'SEK'},{name: 'SGD'},{name: 'SHP'},{name: 'SLL'},{name: 'SOS'},{name: 'SRD'},{name: 'SYP'},{name: 'SZL'},{name: 'THB'},{name: 'TJS'},{name: 'TMT'},{name: 'TND'},{name: 'TOP'},{name: 'TRY'},{name: 'TTD'},{name: 'TWD'},{name: 'TZS'},{name: 'UAH'},{name: 'UGX'},
      {name: 'USD'},{name: 'UYU'},{name: 'UZS'},{name: 'VND'},{name: 'VUV'},{name: 'WST'},{name: 'XAF'},{name: 'XCD'},{name: 'XDR'},{name: 'XOF'},{name: 'XPF'},{name: 'YER'},{name: 'ZAR'},{name: 'ZMW'},{name: 'ZWL'},
      
    ];

    this.buySellForm = this.formBuilder.group({
      type: [''],
      akcija: [''],
      valuta1: [''],
      valuta2: [''],
      kolicina: [Number],
      buysell: ['buy'],
      limit: [Number],
      stop: [Number],
      allornone: [Boolean] ,
      margin:[Boolean]

    });



   this.stateOptions = [{label: 'Buy', value: 'buy'}, {label: 'Sell', value: 'sell'}];
  }




  ngOnInit() {

    
    
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Porudzbine', routerLink: ['/buysell']}
    ];


  }

  onSubmit(){

    
    
  }

}
