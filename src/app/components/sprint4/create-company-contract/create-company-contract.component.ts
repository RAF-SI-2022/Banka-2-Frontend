import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {StockService} from "../../../services/stock.service";
import {CompanyAccount, CompanyContract} from "../../../models/stock-exchange.model";
import { OtcService } from 'src/app/services/otc.service';
import { descriptors } from 'chart.js/dist/core/core.defaults';
import { ActivatedRoute } from '@angular/router';

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
  companyId: string = '';
  desc: string = '';
  ref: string = '';

  constructor(private route: ActivatedRoute, private otcService: OtcService, private toastr: ToastrService, private formBuilder: FormBuilder, private stockService: StockService) {
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

     this.desc = this.createCompanyContractForm.get("description")?.value
     this.ref = this.createCompanyContractForm.get("referenceNumber")?.value


    this.route.paramMap.subscribe(params => {
      this.companyId = params.get('id')!;
    });

    let contract:any= {
      companyId: this.companyId,
      contractStatus: 'DRAFT',
      contractNumber: this.ref,
      description:  this.desc,

    }

    this.companyContractEmitter.emit(contract)
    this.createCompanyContractVisible = false

    // this.otcService.openCompanyContract(this.companyId, 'DRAFT', this.ref, this.desc)
    // .subscribe
    // ({
    //     next:value=>{
    //       this.toastr.success("Uspesno dodat ugovor")
    //       this.createCompanyContractVisible = false;
    //       this.companyContractEmitter.emit('refresh')
    //     },
    //     error: err => {
    //       this.toastr.error(err.error)
    //     }
      
    // })



    

  }
}
