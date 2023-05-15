import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-single-contract',
  templateUrl: './single-contract.component.html',
  styleUrls: ['./single-contract.component.css']
})
export class SingleContractComponent {
  contractName:string="Ugovor Template"
  stavke:[]=[];
  contractForm: FormGroup;
  disabled:boolean=true;


  constructor(private formBuilder: FormBuilder) {
    this.contractForm = this.formBuilder.group({
      status: ["ACCEPTED", Validators.required],
      delovodniBroj: [1234, Validators.required],
      kreiran: ["6/15/15, 9:03 AM", Validators.required],
      izmenjen: ["6/15/15, 9:03 AM", Validators.required],
      opis: ["Opis nekog ugovora", Validators.required],
    });
  }
  isDraft(){
    if(this.contractForm.status.includes("DRAFT")){
      this.disabled=false;
    } else{
      this.disabled=true;
    }
  }


}
