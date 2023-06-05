import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem} from "primeng/api";
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import {CompanyAccount, CompanyContract, Future, TransactionElement} from "../../../models/stock-exchange.model";
import { OtcService } from 'src/app/services/otc.service';
import {ToastrService} from "ngx-toastr";

enum Status {
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  DRAFT = 'DRAFT'
}

@Component({
  selector: 'app-single-contract',
  templateUrl: './single-contract.component.html',
  styleUrls: ['./single-contract.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class SingleContractComponent {



  contractName:string="Ugovor Template"
  elements: TransactionElement[]
  contractForm: FormGroup;
  contract: CompanyContract;
  breadcrumbItems: MenuItem[];
  visible: boolean;
  disable: boolean;
  showStocks: boolean = false;
  showFutures: boolean = true;
  showOptions: boolean = false;
  futures: Future[] // za prikaz
  futuresLoading: boolean = false;
  contractId: string

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private contractService: OtcService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {

    // ovde contractId
    this.route.paramMap.subscribe(params => {
      this.contractId = params.get('contractId')!;
    });


    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
        this.contract = navigation.extras.state['contract'];
    }

    this.contractForm = this.formBuilder.group({
      status: [this.contract.contractStatus, Validators.required],
      referenceNumber: [this.contract.contractNumber, Validators.required],
      created: [this.contract.creationDate, Validators.required],
      modified: [this.contract.lastUpdatedDate, Validators.required],
      description: [this.contract.description, Validators.required],
    });
  }

  ngOnInit(){

    this.isDraft()

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Kompanije', routerLink: ['/companies']},
      // TODO: ovde treba promeniti u pravi naziv kompanije
      {label: 'Kompanija1', routerLink: ['/companies']}
    ]

    this.getAllContractElements();
  }


  getAllContractElements() {
    this.contractService.getAllContractElements(this.contract.id).subscribe({
      next: value => {
        this.elements = value;
      },

      error: err => {

      }
    })
  }

  update(){

    this.isDraft()

    this.contractForm = this.formBuilder.group({
      status: [this.contract.contractStatus, Validators.required],
      referenceNumber: [this.contract.contractNumber, Validators.required],
      created: [this.contract.creationDate, Validators.required],
      modified: [this.contract.lastUpdatedDate, Validators.required],
      description: [this.contract.description, Validators.required],
    });

  }


  isDraft(){
    if(this.contract.contractStatus.includes(Status.DRAFT)){
      this.disable=false;
    } else{
      this.disable=true;
    }
  }

  finalizeContract(){
    this.contract.contractStatus = Status.ACCEPTED;

     // salje se update-ovani contract na back, kad se vrati zove se ovaj notify i updateuje se (ovo ispod je template)

    this.contractService.notify(this.contract)
    this.update()

    this.contractService.closeCompanyContract(this.contractId).subscribe({
        next: val=>{
          alert("val")
        },
        error: err=>{
          alert("eror")
        }
    })

    console.log(this.contract)
  }

  editContract(){
    this.contract.contractNumber = this.contractForm.get('referenceNumber')?.value
    this.contract.description = this.contractForm.get('description')?.value
    this.contract.lastUpdatedDate = new Date()

    // salje se update-ovani contract na back, kad se vrati zove se ovaj notify i updateuje se (ovo ispod je template)

    //this.contractService.notify(this.contract)
    //this.update()

    console.log(this.contract);

    this.contractService.editCompanyContract(
      this.contractId,
      this.contract.contractStatus,
      this.contract.contractNumber.toString(),
      this.contract.description
      ).subscribe({
        next:val=>{
          alert("val")
        },
        error: err=>{
          alert("err")
          console.log(err);

        }
      })


    console.log(this.contract)


  }

  rejectContract(){
    this.contract.contractStatus = Status.REJECTED;

    // salje se na back odavde da se update sa REJECTED statusom, kad se vrati zove se ovaj notify i updateuje se (ovo ispod je template)

    this.contractService.notify(this.contract)
    this.update()

    console.log(this.contract)

  }


  confirm1() {
    this.confirmationService.confirm({
        message: 'Da li ste sigurni da želite da odbacite ugovor?',
        header: 'Potvrda',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.rejectContract();
            //this.messageService.add({ severity: 'info', summary: 'Završeno', detail: 'Uspešno ste odbacili ugovor' });
            this.toastr.success("Uspešno ste odbacili ugovor")
        },
        reject: () => {
          this.toastr.info("Niste odbacili ugovor")
          //this.messageService.add({ severity: 'error', summary: 'Odbijeno', detail: 'Niste odbacili ugovor' });
        }
    });
  }

  confirm2() {
    this.confirmationService.confirm({
        message: 'Da li ste sigurni da želite da izmenite ugovor?',
        header: 'Potvrda',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.editContract();
            //this.messageService.add({ severity: 'info', summary: 'Izmenjeno', detail: 'Uspešno ste izmenili ugovor' });
            this.toastr.success("Uspešno ste izmenili ugovor")
        },
        reject: () => {
          //this.messageService.add({ severity: 'error', summary: 'Odbijeno', detail: 'Niste izmenili ugovor' });
          this.toastr.info("Niste izmenili ugovor")
        }
    });
  }


  confirm3() {
    this.confirmationService.confirm({
        message: 'Da li ste sigurni da želite da finalizujete ugovor?',
        header: 'Potvrda',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.finalizeContract();
            //this.messageService.add({ severity: 'info', summary: 'Završeno', detail: 'Uspešno ste finalizovali ugovor' });
            this.toastr.success("Uspešno ste finalizovali ugovor")
        },
        reject: () => {
          //this.messageService.add({ severity: 'error', summary: 'Odbijeno', detail: 'Niste finalizovali ugovor' });
          this.toastr.info("Niste finalizovali ugovor")
        }
    });
  }

  deleteElement(elementId: string) {
    this.contractService.deleteElement(this.contract.id, elementId).subscribe({
      next: value => {

      },
      error: err => {
        if (err.error.text === 'Rezervacija uspesno sklonjena') {
          this.toastr.success("Uspešno obrisana rezervacija")
          this.getAllContractElements();
        } else {
          this.toastr.error("Greška prilikom brisanja rezervacija")
        }
      }
    })
  }
}
