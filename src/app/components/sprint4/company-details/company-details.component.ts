import {Component, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../services/user-service.service";
import {StockService} from "../../../services/stock.service";
import {NavigationExtras, Router} from "@angular/router";
import {CompanyAccount, CompanyContract} from "../../../models/stock-exchange.model";
import {Permission, User} from "../../../models/users.model";
import {AddUserComponent} from "../../sprint1/add-user/add-user.component";
import {CreateCompanyContractComponent,} from "../create-company-contract/create-company-contract.component";

import {CreateCompanyAccountComponent} from "../create-company-account/create-company-account.component";
import { SingleAccountComponent } from '../single-account/single-account.component';
import { SingleContractComponent } from '../single-contract/single-contract.component';
import { ContractService } from 'src/app/services/contract.service';
import { CreateCompanyContactComponent } from '../create-company-contact/create-company-contact.component';
import { SingleContactComponent } from '../single-contact/single-contact.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent {

  
  @ViewChild(CreateCompanyContractComponent, {static: true}) createCompanyContractComponent: CreateCompanyContractComponent
  @ViewChild(CreateCompanyAccountComponent, {static: true}) createCompanyAccountComponent: CreateCompanyAccountComponent
  @ViewChild(SingleAccountComponent, {static: true}) singleAccountComponent: SingleAccountComponent
  @ViewChild(SingleContactComponent, {static: true}) singleContactComponent: SingleContactComponent
  @ViewChild(CreateCompanyContactComponent, {static: true}) createCompanyContactComponent: CreateCompanyContactComponent

 
  breadcrumbItems: MenuItem[];
  loading: boolean = false; // TODO: promeniti na true
  isFormValid = true;

  companyAccounts: CompanyAccount[];
  

  companyContracts: CompanyContract[] = [
    {
      id: 1,
      referenceNumber: 111,
      description: 'Description1',
      status: 'DRAFT',
      created: new Date(),
      modified: new Date()
    },

    {
      id: 2,
      referenceNumber: 222,
      status: 'DRAFT',
      description: 'Description2',
      created: new Date(),
      modified: new Date()
    },
    {
      id: 3,
      referenceNumber: 333,
      status: 'ACCEPTED',
      description: 'Description3',
      created: new Date(),
      modified: new Date()
    },
  ];

  contactUsers: User[];



  constructor(private toastr: ToastrService, private userService: UserService,
              private stockService: StockService, private router: Router,
              private contractService: ContractService) {

  }

  ngOnInit() {

    this.contractService.contract$.subscribe((contract: CompanyContract | null) => {
      if(contract){

        const index = this.companyContracts.findIndex(item => item.id === contract.id);
        if(index !== -1) {
          this.companyContracts[index] = contract;
        }
      }

    });

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Kompanije', routerLink: ['/companies']},
      // TODO: ovde treba promeniti u pravi naziv kompanije
      {label: 'Kompanija1', routerLink: ['/companies']}
    ]

    // TODO: skloniti kad stigne back, placeholder
    this.companyAccounts = [
      {
        id: 1,
        currency: {
          currencyName: 'RSD',
          currencyCode: 'RSD',
          currencySymbol: 'RSD',
          polity: 'RSD'
        },
        active: true,
        accountNumber: '1111111',
        bank: 'Banka'
      }
    ];



    this.contactUsers = [
      {
        id: 1,
        email: "email@gmail.com",
        firstName: "Ime",
        lastName: "Prezime",
        password: "pass",
        jmbg: '1111',
        phone: '252525',
        jobPosition: 'ADMIN',
        active: true,
        dailyLimit: 1000,
        defaultDailyLimit: 1000,
        permissions: [
          {
            id: 1,
            permissionName: 'Permisija'
          }
        ]
      }
    ]
  }

  submitEditCompany() {

  }

  openCreateCompanyAccountDialog() {
    this.createCompanyAccountComponent.createCompanyAccountVisible = true;
  }

  openAccountDetailsDialog(account: CompanyAccount) {
    this.singleAccountComponent.account = account;
    console.log(account)
  }

  openCreateCompanyContractDialog() {
    // TODO: otvoriti popup za kreiranje novog racuna
    this.createCompanyContractComponent.createCompanyContractVisible = true;
  }


  openContractDetailsDialog(contract: CompanyContract) {
    const navigationExtras: NavigationExtras = {
        state: {
            contract: contract
        }
    };
    console.log(contract)
    this.router.navigate(['company', '1', 'contract', contract.id], navigationExtras);
  }


  openAddContactUserDialog() {
    this.createCompanyContactComponent.createCompanyContactVisible = true;
  }

  openUserDetailsDialog(user: User) {
    this.singleContactComponent.user = user;
    console.log(user)
  }

  submitCreateCompanyContact(contract: CompanyContract){

  }

  submitCreateCompanyContract(contract: CompanyContract) {
    // TODO: poslati ovo na stock service metodu za kreiranje contract-a kada uradi back
    this.companyContracts.push(contract)
    // console.log(contract);
  }

  submitCreateCompanyAccount(account: CompanyAccount){
    console.log(account)
  }

  submitEditCompanyAccount(account: CompanyAccount){
    console.log(account)
  }


  

}
