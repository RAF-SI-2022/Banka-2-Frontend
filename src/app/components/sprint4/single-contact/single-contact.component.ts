import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {CompanyAccount, CompanyContract} from "../../../models/stock-exchange.model";
import { StockService } from 'src/app/services/stock.service';
import { Currency } from '../../../models/stock-exchange.model';
import { User } from 'src/app/models/users.model';
@Component({
  selector: 'app-single-contact',
  templateUrl: './single-contact.component.html',
  styleUrls: ['./single-contact.component.css']
})
export class SingleContactComponent  {

  @Output() editCompanyAccountEmitter = new EventEmitter<any>();

  user: any = null;
  account: any = null;
  editCompanyContactForm: FormGroup;
  isFormValid: boolean = false;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {

    this.editCompanyContactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.editCompanyContactForm.valueChanges.subscribe(() => {
      this.isFormValid = this.editCompanyContactForm.valid;
    });

  }


  resetForm(){

  }

  submitEditCompanyContact(){

    // this.editCompanyAccountEmitter.emit(companyAccount);
    this.account = null;

  }

}
