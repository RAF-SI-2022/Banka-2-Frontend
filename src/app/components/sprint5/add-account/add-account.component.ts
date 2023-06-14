import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {

  @Output() addAccountEmitter = new EventEmitter<any>();

  addAccountVisible: boolean = false;
  form: FormGroup;

  currenciesMain: any[] = [
      { name: 'USD', key: 'USD' },
      { name: 'RSD', key: 'RSD' },
      { name: 'EUR', key: 'EUR' },
  ];

  currenciesAll: any[] = [
    { name: 'USD', key: 'USD' },
    { name: 'RSD', key: 'RSD' },
    { name: 'EUR', key: 'EUR' },
  ];

  accountTypes: any[] = [
    { name: 'Tekući račun', key: 'tekuci' },
    { name: 'Devizni račun', key: 'devizni' },
    { name: 'Poslovni racun', key: 'poslovni' },
  ];

  constructor(private formBuilder: FormBuilder) {
    const group: any = {};
  
    for (const currency of this.currenciesAll) {
      group[currency.key] = new FormControl(false);
    }
  
    this.form = this.formBuilder.group({
      currencyMain: [this.currenciesMain[0], Validators.required],
      ...group,
      accountType: [this.accountTypes[0], Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      this.addAccountEmitter.emit(this.form)
      this.addAccountVisible = false;
    }
  }
}
