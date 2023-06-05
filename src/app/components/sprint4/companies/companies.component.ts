import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../services/user-service.service";
import {StockService} from "../../../services/stock.service";
import {Router} from "@angular/router";
import {Company} from "../../../models/stock-exchange.model";
import {BuyStockComponent} from "../../sprint2/stocks/buy-stock/buy-stock.component";
import {CreateCompanyComponent} from "../create-company/create-company.component";
import {OtcService} from "../../../services/otc.service";
import {CompanyService} from "../../../services/company.service";


import {Stock, UserStock} from 'src/app/models/stock-exchange.model';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {

  @ViewChild(CreateCompanyComponent, {static: true}) createCompanyComponent: CreateCompanyComponent;

  breadcrumbItems: MenuItem[];
  companies: Company[] = []
  loading: boolean = false;
  selectedCompany: any = {}
  

  constructor(private toastr: ToastrService, private userService: UserService,
              private stockService: StockService, private router: Router, private companyService: CompanyService) {
  }

  ngOnInit() {
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Kompanije', routerLink: ['/companies']}
    ]

    // this.getAllCompanies();

  }

  getAllCompanies() {
    this.companyService.getAllCompanies().subscribe(
      {
        next: value => {
          this.companies = value;
          console.log(value);
        },
        error: err => {
          this.toastr.error("Greška prilikom dohvatanja kompanija iz baze.")
          console.log(err);
        }
      }
    )
  }

  openCreateCompanyDialog() {
    this.createCompanyComponent.createCompanyVisible = true;
  }

  createCompany(company: any) {

    console.log(company);

    this.companyService.createCompany(
      company.name,
      company.registrationNumber,
      company.taxNumber,
      company.activityCode,
      company.address
    ).subscribe({
      next: value => {
        this.companyService.getAllCompanies().subscribe(
          {
            next: value1 => {
              this.companies = value1;
            },
            error: err1 => {
              this.toastr.error("Greška prilikom dohvatanja kompanija iz baze.")
              console.log(err1);
            }
          }
        )
      },
      error: err => {
        this.toastr.error("Greška prilikom kreiranja kompanije.")
        console.log(err);
      }
    })
  }
  
}
