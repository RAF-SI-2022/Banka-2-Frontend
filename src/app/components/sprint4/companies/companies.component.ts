import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../services/user-service.service";
import {StockService} from "../../../services/stock.service";
import {Router} from "@angular/router";
import {Company} from "../../../models/stock-exchange.model";
import {BuyStockComponent} from "../../sprint2/stocks/buy-stock/buy-stock.component";
import {CreateCompanyComponent} from "../create-company/create-company.component";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent {

  @ViewChild(CreateCompanyComponent, {static: true}) createCompanyComponent: CreateCompanyComponent;

  breadcrumbItems: MenuItem[];
  companies: Company[] = [];
  loading: boolean = false;

  selectedCompany: any = {}

  constructor(private toastr: ToastrService, private userService: UserService,
              private stockService: StockService, private router: Router) {
  }

  ngOnInit() {
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Kompanije', routerLink: ['/companies']}
    ]

    // TODO: skloniti ovo kada stigne back
    this.companies.push(
      {
        id: 1,
        name: 'Kompanija1',
        address: 'Adresa1',
        country: 'Drzava1',
        idNumber: '1111i',
        taxNumber: '1111t',
        activityCode: '1111a'
      },
      {
        id: 2,
        name: 'Kompanija2',
        address: 'Adresa2',
        country: 'Drzava2',
        idNumber: '2222i',
        taxNumber: '2222t',
        activityCode: '2222a'
      },
      {
        id: 3,
        name: 'Kompanija3',
        address: 'Adresa3',
        country: 'Drzava3',
        idNumber: '3333i',
        taxNumber: '3333t',
        activityCode: '3333a'
      }
    )
  }

  openCreateCompanyDialog() {
    this.createCompanyComponent.createCompanyVisible = true;
  }
  createCompany(company: any) {
    alert("Inside companies component")
    console.log(company);
  }
}
