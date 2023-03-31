import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuItem} from "primeng/api";
import {ISO, Type} from 'src/app/models/stock-exchange.model';
import {UserService} from 'src/app/services/user-service.service';


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


  buySellForm: FormGroup;

  stocksForm: FormGroup;

  futuresForm: FormGroup;

  forexForm: FormGroup;

  isStocksValid: boolean = false;

  isFuturesValid: boolean = false;

  isForexValid: boolean = false;

  display: boolean = false;

  


  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.types = [
      {name: 'STOCKS'},
      {name: 'FOREX'},
      {name: 'FUTURES'},
    ];

    this.iso = [
      {name: 'AED'}, {name: 'AFN'}, {name: 'ALL'}, {name: 'AMD'}, {name: 'ANG'}, {name: 'AOA'}, {name: 'ARS'}, {name: 'AUD'}, {name: 'AWG'}, {name: 'AZN'}, {name: 'BAM'}, {name: 'BBD'}, {name: 'BDT'}, {name: 'BGN'}, {name: 'BHD'}, {name: 'BIF'}, {name: 'BMD'}, {name: 'BND'}, {name: 'BOB'}, {name: 'BRL'}, {name: 'BSD'}, {name: 'BTN'}, {name: 'BWP'}, {name: 'BZD'}, {name: 'CAD'}, {name: 'CDF'}, {name: 'CHF'}, {name: 'CLF'}, {name: 'CLP'}, {name: 'CNH'}, {name: 'CNY'}, {name: 'COP'}, {name: 'CUP'}, {name: 'CVE'}, {name: 'CZK'}, {name: 'DJF'}, {name: 'DKK'}, {name: 'DOP'}, {name: 'DZD'}, {name: 'EGP'},
      {name: 'ERN'}, {name: 'ETB'}, {name: 'EUR'}, {name: 'FJD'}, {name: 'FKP'}, {name: 'GBP'}, {name: 'GHS'}, {name: 'GIP'}, {name: 'GMD'}, {name: 'GNF'}, {name: 'GTQ'}, {name: 'GYD'}, {name: 'HKD'}, {name: 'HNL'}, {name: 'HRK'}, {name: 'HTG'}, {name: 'HUF'}, {name: 'ICP'}, {name: 'IDR'}, {name: 'ILS'}, {name: 'INR'}, {name: 'IQD'}, {name: 'IRR'}, {name: 'ISK'}, {name: 'JEP'}, {name: 'JMD'}, {name: 'JPY'}, {name: 'KES'}, {name: 'KGS'}, {name: 'KHR'}, {name: 'KMF'}, {name: 'KPW'}, {name: 'KRW'}, {name: 'KWD'}, {name: 'KYD'}, {name: 'KZT'}, {name: 'LAK'}, {name: 'LBP'}, {name: 'LKR'}, {name: 'LRD'}, {name: 'LSL'}, {name: 'LYD'}, {name: 'MAD'}, {name: 'MDL'}, {name: 'MGA'}, {name: 'MKD'}, {name: 'MMK'}, {name: 'MNT'}, {name: 'MOP'}, {name: 'MRO'}, {name: 'MRU'},
      {name: 'MUR'}, {name: 'MVR'}, {name: 'MWK'}, {name: 'MXN'}, {name: 'MYR'}, {name: 'MZN'}, {name: 'NAD'}, {name: 'NGN'}, {name: 'NOK'}, {name: 'NPR'}, {name: 'NZD'}, {name: 'OMR'}, {name: 'PAB'}, {name: 'PEN'}, {name: 'PGK'}, {name: 'PHP'}, {name: 'PKR'}, {name: 'PLN'}, {name: 'PYG'}, {name: 'QAR'}, {name: 'RON'}, {name: 'RSD'}, {name: 'RUB'}, {name: 'RUR'}, {name: 'RWF'}, {name: 'SAR'}, {name: 'SBDf'}, {name: 'SCR'}, {name: 'SDG'}, {name: 'SEK'}, {name: 'SGD'}, {name: 'SHP'}, {name: 'SLL'}, {name: 'SOS'}, {name: 'SRD'}, {name: 'SYP'}, {name: 'SZL'}, {name: 'THB'}, {name: 'TJS'}, {name: 'TMT'}, {name: 'TND'}, {name: 'TOP'}, {name: 'TRY'}, {name: 'TTD'}, {name: 'TWD'}, {name: 'TZS'}, {name: 'UAH'}, {name: 'UGX'},
      {name: 'USD'}, {name: 'UYU'}, {name: 'UZS'}, {name: 'VND'}, {name: 'VUV'}, {name: 'WST'}, {name: 'XAF'}, {name: 'XCD'}, {name: 'XDR'}, {name: 'XOF'}, {name: 'XPF'}, {name: 'YER'}, {name: 'ZAR'}, {name: 'ZMW'}, {name: 'ZWL'},

    ];

    this.stocksForm = this.formBuilder.group({
      type: [''],
      akcija: ['', Validators.required],
      kolicina: [null,Validators.required],
      buysell: [''],
      limit: [null, Validators.required],
      stop: [null, Validators.required],
      allornone: false,
      margin: false

    });


    this.futuresForm = this.formBuilder.group({
      type: [''],
      akcija: ['', Validators.required],
      kolicina: [null,Validators.required],
      buysell: [''],
      limit: [null, Validators.required],
      stop: [null, Validators.required],
      allornone: false,
      margin: false

    });


    this.forexForm = this.formBuilder.group({
      type: [''],
      valuta1: [ {name: 'AED'}, Validators.required],
      valuta2: [  {name: 'AED'}, Validators.required],
      kolicina: [null, Validators.required],
      buysell: [''],
      limit: [null, Validators.required],
      stop: [null, Validators.required],
      allornone: false,
      margin: false

    });

    this.stocksForm.valueChanges.subscribe(() => {
      this.isStocksValid = this.stocksForm.valid;
    });

    this.futuresForm.valueChanges.subscribe(() => {
      this.isFuturesValid = this.futuresForm.valid;
    });

    this.forexForm.valueChanges.subscribe(() => {
      this.isForexValid = this.forexForm.valid;
    });


    this.stateOptions = [{label: 'Buy', value: 'buy'}, {label: 'Sell', value: 'sell'}];
  }


  ngOnInit() {


    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Porudzbine', routerLink: ['/buysell']}
    ];


  }

  showDialog() {
    this.display = true;
  }

  onSubmit() {

    this.display = false

    if(this.selectedType.name ==="FOREX"){

      console.log(
        "Type:", this.forexForm.get('type')?.value.name,
        " Valuta1:", this.forexForm.get('valuta1')?.value.name,
        " Valuta2:", this.forexForm.get('valuta2')?.value.name,
        " Kolicina:", this.forexForm.get('kolicina')?.value,
        " Limit:", this.forexForm.get('limit')?.value,
        " Stop:", this.forexForm.get('stop')?.value,
        " AON:", this.forexForm.get('allornone')?.value,
      )
    }

    else if(this.selectedType.name ==="STOCKS"){

      console.log(
        "Type:", this.stocksForm.get('type')?.value.name,
        " Akcija:", this.stocksForm.get('akcija')?.value,
        " Kolicina:", this.stocksForm.get('kolicina')?.value,
        " Buy Sell:", this.stocksForm.get('buysell')?.value,
        " Limit:", this.stocksForm.get('limit')?.value,
        " Stop:", this.stocksForm.get('stop')?.value,
        " AON:", this.stocksForm.get('allornone')?.value,
        " Margin:", this.stocksForm.get('margin')?.value,
      )


    }

    else if(this.selectedType.name ==="FUTURES"){

      console.log(
        "Type:", this.futuresForm.get('type')?.value.name,
        " Akcija:", this.futuresForm.get('akcija')?.value,
        " Kolicina:", this.futuresForm.get('kolicina')?.value,
        " Buy Sell:", this.futuresForm.get('buysell')?.value,
        " Limit:", this.futuresForm.get('limit')?.value,
        " Stop:", this.futuresForm.get('stop')?.value,
        " AON:", this.futuresForm.get('allornone')?.value,
        " Margin:", this.futuresForm.get('margin')?.value,
      )


    }


  }


}
