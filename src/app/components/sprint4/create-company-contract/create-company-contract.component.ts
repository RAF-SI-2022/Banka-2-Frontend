import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {StockService} from "../../../services/stock.service";
import {CompanyBankAccount, CompanyContract} from "../../../models/stock-exchange.model";

@Component({
  selector: 'app-create-company-contract',
  templateUrl: './create-company-contract.component.html',
  styleUrls: ['./create-company-contract.component.css']
})
export class CreateCompanyContractComponent {

  @Output() companyContractEmitter = new EventEmitter<any>();

  createCompanyContractVisible: boolean = false;
  isFormValid: boolean = false;
  createCompanyContractForm: FormGroup;

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {
    this.createCompanyContractForm = this.formBuilder.group({
      referenceNumber: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.createCompanyContractForm.valueChanges.subscribe(() => {
      this.isFormValid = this.createCompanyContractForm.valid;
    });
  }

  ngOnInit() {

  }
  resetForm() {

  }

  submitCreateCompanyContract() {
    // TODO: promenjeni modeli, srediti
    /*const companyContract: CompanyContract = {
      id: 1,
      referenceNumber: this.createCompanyContractForm.get('referenceNumber')?.value,
      description: this.createCompanyContractForm.get('description')?.value,
      status: 'DRAFT',
      created: new Date(),
      modified: new Date()
    }

    this.companyContractEmitter.emit(companyContract);
    this.createCompanyContractVisible = false;*/
  }
}
