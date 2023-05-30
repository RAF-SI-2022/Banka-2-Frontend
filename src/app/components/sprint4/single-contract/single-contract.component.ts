import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MenuItem} from "primeng/api";




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
  contract: any = null;
  breadcrumbItems: MenuItem[];



  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
  ) {

    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
        this.contract = navigation.extras.state['contract'];
    }

    console.log(this.contract)

    this.contractForm = this.formBuilder.group({
      status: [this.contract.status, Validators.required],
      delovodniBroj: [this.contract.referenceNumber, Validators.required],
      kreiran: [this.contract.created, Validators.required],
      izmenjen: [this.contract.modified, Validators.required],
      opis: [this.contract.description, Validators.required],
    });
  }

  ngOnInit(){
    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Kompanije', routerLink: ['/companies']},
      // TODO: ovde treba promeniti u pravi naziv kompanije
      {label: 'Kompanija1', routerLink: ['/companies']}
    ]
  }

  
  
  isDraft(){
    if(this.contractForm.status.includes("DRAFT")){
      this.disabled=false;
    } else{
      this.disabled=true;
    }
  }

  confirmEdit() {
    
  }

  confirm(){

  }

  reject(){

  }
  
  accept(){

  }

}
