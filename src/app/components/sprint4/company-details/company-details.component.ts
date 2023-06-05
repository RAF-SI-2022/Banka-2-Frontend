import {Component, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../services/user-service.service";
import {StockService} from "../../../services/stock.service";
import {CompanyAccount, CompanyContract, ContactPerson} from "../../../models/stock-exchange.model";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {Permission, User} from "../../../models/users.model";
import {AddUserComponent} from "../../sprint1/add-user/add-user.component";
import {CreateCompanyContractComponent,} from "../create-company-contract/create-company-contract.component";
import {CreateCompanyAccountComponent} from "../create-company-account/create-company-account.component";
import {SingleAccountComponent} from '../single-account/single-account.component';
import {SingleContractComponent} from '../single-contract/single-contract.component';
import {OtcService} from 'src/app/services/otc.service';
import {CreateCompanyContactComponent} from '../create-company-contact/create-company-contact.component';
import {SingleContactComponent} from '../single-contact/single-contact.component';

import {CompanyService} from 'src/app/services/company.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent {

  @ViewChild(CreateCompanyContactComponent, {static: true}) createCompanyContactComponent: CreateCompanyContactComponent
  @ViewChild(CreateCompanyContractComponent, {static: true}) createCompanyContractComponent: CreateCompanyContractComponent
  @ViewChild(CreateCompanyAccountComponent, {static: true}) createCompanyAccountComponent: CreateCompanyAccountComponent
  @ViewChild(SingleAccountComponent, {static: true}) singleAccountComponent: SingleAccountComponent
  @ViewChild(SingleContactComponent, {static: true}) singleContactComponent: SingleContactComponent


  breadcrumbItems: MenuItem[];
  loading: boolean = false; // TODO: promeniti na true
  isFormValid = true;

  companyContacts: ContactPerson[];

  companyAccounts: CompanyAccount[];

  companyContracts: CompanyContract[];

  contactUsers: User[];

  companyId: string;
  companyForm: FormGroup;


  constructor(private toastr: ToastrService, private userService: UserService,
              private stockService: StockService, private router: Router, private route: ActivatedRoute,
              private contractService: OtcService, private companyService: CompanyService,
              private formBuilder: FormBuilder) {

    this.companyForm = this.formBuilder.group({
      name: [null, Validators.required],
      taxNumber: [null, Validators.required],
      address: [null, Validators.required],
      activityCode: [null, Validators.required],
      registrationNumber: [null, Validators.required]
    });

    this.companyForm.valueChanges.subscribe(() => {
      this.isFormValid = this.companyForm.valid;
    });
  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.companyId = params.get('id')!;
    });
    this.getCompanyById()

    this.contractService.contract$.subscribe((contract: CompanyContract | null) => {
      if (contract) {

        const index = this.companyContracts.findIndex(item => item.id === contract.id);
        if (index !== -1) {
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

    this.getAllContracts()
    this.getAllContacts()
    this.getAllAccounts();


  }

  getCompanyById() {
    this.companyService.getCompanyById(this.companyId).subscribe({
      next: value => {
        //console.log(value);
        this.companyForm.setValue({
          name: value.name,
          taxNumber: value.taxNumber,
          address: value.address,
          activityCode: value.activityCode,
          registrationNumber: value.registrationNumber
        });

      },
      error: err => {
        // todo dodati error ako ikad bek to uradi
        this.toastr.error("Doslo je do neocekivane greske pri dohvatanju kompanije")
        this.router.navigate(["companies"]);
      }
    })
  }

  submitEditCompany() {


    this.companyService.changeCompany(
      this.companyId,
      this.companyForm.get('name')?.value,
      this.companyForm.get('taxNumber')?.value,
      this.companyForm.get('address')?.value,
      this.companyForm.get('activityCode')?.value,
      this.companyForm.get('registrationNumber')?.value
    ).subscribe({
      next: value => {
        // console.log(value);
        this.toastr.info("Upsesno izvrsena izmena kompanije")
        // alert("ovde sam")
      },
      error: err => {
        // console.log(err);
        // alert("nisam")
        this.toastr.error("Greska pri izmeni")

      }
    })
  }


  openCreateCompanyAccountDialog() {
    this.createCompanyAccountComponent.createCompanyAccountVisible = true;
  }

  openAccountDetailsDialog(account: CompanyAccount) {
    this.singleAccountComponent.open(account);
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
    this.createCompanyContactComponent.createCompanyContactVisible = true
  }

  openUserDetailsDialog(user: any) {

    this.singleContactComponent.editCompanyContactForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phoneNumber,
      note: user.note,
      selectedJob: user.position
    });
    this.singleContactComponent.userID = user.id
    console.log(user.position)
    if (user.position === ("ADMINISTRATOR")) {
      this.singleContactComponent.selectedJob = this.singleContactComponent.jobs[0]
    }
    if (user.position === ("SUPERVISOR")) {
      this.singleContactComponent.selectedJob = this.singleContactComponent.jobs[1]
    }
    if (user.position === ("AGENT")) {
      this.singleContactComponent.selectedJob = this.singleContactComponent.jobs[2]
    }

    console.log(this.singleContactComponent.selectedJob)
    this.singleContactComponent.contact = user;
    this.singleContactComponent.editCompanyContactVisible = true

  }

  getAllContracts() {

    this.contractService.getAllCompanyContracts().subscribe(
      {
        next: val => {
          console.log(val);
          this.companyContracts = val;
        },
        error: err => {
          this.toastr.error('Greška pri dohvatanju ugovora.');

          console.log(err)
        }
      }
    );
  }


  getAllContacts() {
    this.contractService.getAllCompanyContacts().subscribe(
      {
        next: val => {
          console.log(val);
          this.companyContacts = val;
        },
        error: err => {
          this.toastr.error('Greška pri dohvatanju kontakta.');

          console.log(err)
        }
      }
    );
  }

  submitCreateCompanyContact(contact: any) {
    //console.log(contact.)
    this.contractService.createCompanyContact(
      contact.firstName, contact.lastName, contact.phone,
      contact.email, contact.position, contact.note)
      .subscribe
      ({
        next: value => {

          this.getAllContacts()

          this.toastr.success("Uspesno dodat kontakt")
        },
        error: err => {
          this.toastr.error(err.error)
          console.log(err)
        }

      })

  }

  submitCreateCompanyContract(contract: any) {
    // TODO: poslati ovo na stock service metodu za kreiranje contract-a kada uradi back
    console.log(contract)
    this.contractService.openCompanyContract(
      contract.companyId, contract.contractStatus,
      contract.contractNumber, contract.description)
      .subscribe
      ({
        next: value => {

          this.getAllContracts()

          this.toastr.success("Uspesno dodat ugovor")
        },
        error: err => {
          this.toastr.error(err.error)
          console.log(err)
        }

      })

    //this.companyContracts.push(contract)
    // console.log(contract);
  }

  getAllAccounts() {
    this.companyService.getAllCompanyBankAccounts(this.companyId).subscribe(
      {
        next: value => {
          this.companyAccounts = value;
          console.log(value);
        },
        error: err => {

        }
      }
    )
  }


  submitCreateCompanyAccount(account: CompanyAccount) {
    this.companyService.createCompanyBankAccount(
      this.companyId,
      account.accountNumber,
      account.currency,
      account.bankName)
      .subscribe(
        {
          next: value => {
            this.getAllAccounts();
          },
          error: err => {

          }
        }
      )
  }

  submitEditCompanyAccount(account: CompanyAccount) {
    this.companyService.editCompanyBankAccount(account.id, account.accountNumber, account.currency, account.bankName)
      .subscribe({
        next: value => {
          this.toastr.success('Uspešno izmenjen račun')
          this.getAllAccounts();
        },
        error: err => {
          this.toastr.error('Greška prilikom izmene računa')
        }
      })
  }

  submitEditCompanyContact(contact: any) {
    console.log(contact.id)
    this.contractService.editCompanyContact(
      contact.id, contact.firstName, contact.lastName, contact.phone,
      contact.email, contact.position, contact.note)
      .subscribe
      ({
        next: value => {

          this.getAllContacts()

          this.toastr.success("Uspesno editovan kontakt")
        },
        error: err => {
          this.toastr.error(err.error)
          console.log(err)
        }

      })
  }


}
