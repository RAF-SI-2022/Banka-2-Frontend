import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/users.model";

@Component({
  selector: 'app-stepper-test',
  templateUrl: './stepper-test.component.html',
  styleUrls: ['./stepper-test.component.css']
})
export class StepperTestComponent {

  addAccountVisible: boolean = false;
  items: MenuItem[];
  activeIndex: number = 0;
  firstVisible: boolean = true;
  secondVisible: boolean = false;
  thirdVisible: boolean = false;
  type: string;
  types: [{ name: string }, { name: string }];
  isLocalFormValid: boolean = false;
  isForeignFormValid: boolean = false;
  users: User[];
  currencies: string[];
  selectedCurrencies: any[] = [];
  baseCurrency: any
  selectedUser: User

  createLocalAccountForm: FormGroup;
  createForeignAccountForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  onActiveIndexChange(event: any) {
    this.activeIndex = event;
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Vrsta računa',
        command: (event: any) =>  {
          this.firstVisible = true;
          this.secondVisible = false;
          this.thirdVisible = false;
        }
      },
      {
        label: 'Detalji računa',
        command: (event: any) => {
          this.firstVisible = false;
          this.secondVisible = true;
          this.thirdVisible = false;
        },
        disabled: this.firstVisible
      },
      {
        label: 'Potvrda',
        command: (event: any) => {
          this.firstVisible = false;
          this.secondVisible = false;
          this.thirdVisible = true;
        }
      },
    ];

    this.initForms();
    this.initData();
  }

  initData() {
    this.users = [
      {
        id: 1,
        email: "email@gmail.com",
        firstName: "First",
        lastName: "last",
        password: "pass",
        jmbg: "111111111111",
        phone: "12142",
        jobPosition: "pos",
        active: true,
        dailyLimit: 100,
        defaultDailyLimit: 100,
        permissions: []
      },
      {
        id: 1,
        email: "email@gmail.com",
        firstName: "Second",
        lastName: "last",
        password: "pass",
        jmbg: "111111111111",
        phone: "12142",
        jobPosition: "pos",
        active: true,
        dailyLimit: 100,
        defaultDailyLimit: 100,
        permissions: []
      }
    ];

    this.currencies = ['EUR', 'CHF', 'USD', 'GBP', 'JPY', 'CAD', 'AUD']
  }

  initForms() {
    this.createLocalAccountForm = this.formBuilder.group({
      user: ['', Validators.required],
    });

    this.createForeignAccountForm = this.formBuilder.group({
      user: ['', Validators.required],
      baseCurrency: ['', Validators.required],
      additionalCurrencies: ['', Validators.required]
    });

    this.createLocalAccountForm.valueChanges.subscribe(() => {
      this.isLocalFormValid = this.createLocalAccountForm.valid;
    });

    this.createForeignAccountForm.valueChanges.subscribe(() => {
      this.isForeignFormValid = this.createForeignAccountForm.valid;
    });
  }

  incrementPage(targetPage: number) {
    this.activeIndex++;
    if(targetPage === 2) {
      this.firstVisible = false;
      this.secondVisible = true;
      this.thirdVisible = false;


    } else if(targetPage === 3) {
      this.firstVisible = false;
      this.secondVisible = false;
      this.thirdVisible = true;

      if(this.createForeignAccountForm.get('user')?.value !== "") {
        this.selectedUser = this.createForeignAccountForm.get('user')?.value;
        this.baseCurrency = this.createForeignAccountForm.get('baseCurrency')?.value;
      } else {
        this.selectedUser = this.createLocalAccountForm.get('user')?.value;
      }

      console.log(this.selectedUser);

    }

    this.items[1].disabled = false;
  }

  submitCreateLocalAccount() {

  }

  submitCreateForeignAccount() {

  }
}
