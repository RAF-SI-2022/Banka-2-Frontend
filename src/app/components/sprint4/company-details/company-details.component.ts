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
import { OtcService } from 'src/app/services/otc.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent {

  @ViewChild(CreateCompanyContractComponent, {static: true}) createCompanyContractComponent: CreateCompanyContractComponent
  @ViewChild(CreateCompanyAccountComponent, {static: true}) createCompanyAccountComponent: CreateCompanyAccountComponent
  @ViewChild(SingleAccountComponent, {static: true}) singleAccountComponent: SingleAccountComponent

  breadcrumbItems: MenuItem[];
  loading: boolean = false; // TODO: promeniti na true
  isFormValid = true;

  companyAccounts: CompanyAccount[];

  companyContracts: CompanyContract[];

  contactUsers: User[];



  constructor(private toastr: ToastrService, private userService: UserService,
              private stockService: StockService, private router: Router,
              private contractService: OtcService) {

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
    /*this.companyAccounts = [
      {
        id: "1",
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
    ];*/

    this.getCompanyContracts().subscribe(
      {
        next: value => {
          console.log(value);
          this.companyContracts = value;
        },
        error: err => {
          this.toastr.error('Greška pri dohvatanju ugovora.');
        }
      }
    );



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

  getCompanyContracts() {
    return this.contractService.getAllCompanyContracts();
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
    // TODO: dodati kontakt osobu
  }

  openUserDetailsDialog(user: any) {

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
