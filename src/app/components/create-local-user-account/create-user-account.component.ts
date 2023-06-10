import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Permission, User} from "../../models/users.model";

@Component({
  selector: 'app-create-local-user-account',
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.css']
})
export class CreateUserAccountComponent {

  breadcrumbItems: MenuItem[];
  createLocalAccountForm: FormGroup;
  createForeignAccountForm: FormGroup;
  isLocalFormValid: boolean = false;
  isForeignFormValid: boolean = false;
  types: [{ name: string }, { name: string }];
  users: User[]
  currencies: string[]
  selectedCurrencies: any[] = []

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initData();
    this.initBreadcrumbs();
    this.initForms();
  }


  initData() {
    this.types = [
      {
        name: 'Poslovni'
      },
      {
        name: 'Lični'
      }
    ];

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

  initBreadcrumbs() {
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Računi', routerLink: ['/balance']},
      {label: 'Novi račun', routerLink: ['/create-user-account']}
    ];
  }

  initForms() {
    this.createLocalAccountForm = this.formBuilder.group({
      user: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.createForeignAccountForm = this.formBuilder.group({
      user: ['', Validators.required],
      type: ['', Validators.required],
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

  submitCreateLocalAccount() {
    console.log("Submit local");
    let user = this.createLocalAccountForm.get('user')?.value;
    let type = this.createLocalAccountForm.get('type')?.value;

    console.log(user, type);

  }

  submitCreateForeignAccount() {
    console.log("Submit foreign");
    let user = this.createForeignAccountForm.get('user')?.value;
    let type = this.createForeignAccountForm.get('type')?.value;
    let baseCurrency = this.createForeignAccountForm.get('baseCurrency')?.value;


    console.log(user, type, baseCurrency, this.selectedCurrencies);


  }
}
