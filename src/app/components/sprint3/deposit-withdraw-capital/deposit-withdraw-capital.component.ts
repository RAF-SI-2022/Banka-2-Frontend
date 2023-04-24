import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposit-withdraw-capital',
  templateUrl: './deposit-withdraw-capital.component.html',
  styleUrls: ['./deposit-withdraw-capital.component.css']
})
export class DepositWithdrawCapitalComponent {

  depositWithdrawForm: FormGroup;
  visible: boolean = false;
  isFormValid = false;
  valute =[{name:"RSD"},{name:"USD"},{name:"EUR"},{name:"CHF"}]


  constructor(private formBuilder: FormBuilder) {
    this.depositWithdrawForm = this.formBuilder.group({
      iznos: [null, Validators.required],
      valuta: [null, Validators.required],
    });

  }

  submit(){

  }

  resetForm() {
    this.depositWithdrawForm.get('iznos')?.reset();
    this.depositWithdrawForm.get('valuta')?.reset();
  }

  open() {
    this.visible = true;
  }
}
