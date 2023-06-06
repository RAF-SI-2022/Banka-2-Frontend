import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {MenuItem} from "primeng/api";
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import {CompanyAccount, CompanyContract, Future, TransactionElement} from "../../../models/stock-exchange.model";
import { OtcService } from 'src/app/services/otc.service';
import {ToastrService} from "ngx-toastr";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { UserService } from 'src/app/services/user-service.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

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

  status: string;

  isAuthorised: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private contractService: OtcService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userService: UserService
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

    this.getCompanyContractById()

  }

  getCompanyContractById(){
    this.contractService.getCompanyContractById(this.contractId).subscribe({
      next:val=>{
        this.contractForm = this.formBuilder.group({
          status: [val.contractStatus, Validators.required],
          referenceNumber: [val.contractNumber, Validators.required],
          created: [val.creationDate, Validators.required],
          modified: [val.lastUpdatedDate, Validators.required],
          description: [val.description, Validators.required],
        });
        this.status = val.contractStatus
      },
      error: err=>{
        this.toastr.error("Doslo je do neocekivane greske")
        this.router.navigate(['/companies'])
        // alert("erorr");
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
    //this.contract.contractStatus = Status.ACCEPTED;

     // salje se update-ovani contract na back, kad se vrati zove se ovaj notify i updateuje se (ovo ispod je template)

    this.contractService.notify(this.contract)
    this.update()

    //todo upload

    this.contractService.finalizeCompanyContract(this.contractId).subscribe({
        next: val=>{
          // alert("val")
          this.contract.contractStatus = Status.ACCEPTED;
          this.toastr.success("Ugovor uspesno kompletiran")
          this.getCompanyContractById()
          
        },
        error: err=>{
          if(err.error.text === "Ugovor uspesno kompletiran"){
            this.contract.contractStatus = Status.ACCEPTED;
            this.toastr.success("Ugovor uspesno kompletiran")
            this.getCompanyContractById()
          }else{
            this.toastr.error("Doslo je do neocekivane greske")
          }
          
        }
    })

    //console.log(this.contract)
  }

  editContract(){
    this.contract.contractNumber = this.contractForm.get('referenceNumber')?.value
    this.contract.description = this.contractForm.get('description')?.value
    this.contract.lastUpdatedDate = new Date()

    // salje se update-ovani contract na back, kad se vrati zove se ovaj notify i updateuje se (ovo ispod je template)

    this.contractService.notify(this.contract)
    this.update()

    //console.log(this.contract);
    
    this.contractService.editCompanyContract(
      this.contractId,
      this.contract.contractStatus,
      this.contract.contractNumber,
      this.contract.description
      ).subscribe({
        next:val=>{
          this.getCompanyContractById()
          this.toastr.success("Ugovor je uspesno promenjen")
        },
        error: err=>{
          if(err.error.text === "Ugovor je uspesno promenjen"){
            this.getCompanyContractById()
            this.toastr.success("Ugovor je uspesno promenjen")
          }
          else{
            this.toastr.error("Doslo je do neocekivane greske")
          }

        }
      })


    //console.log(this.contract)


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
            //this.rejectContract();
            this.deleteContract();
            //this.messageService.add({ severity: 'info', summary: 'Završeno', detail: 'Uspešno ste odbacili ugovor' });
            //this.toastr.success("Uspešno ste odbacili ugovor")
        },
        reject: () => {
          this.toastr.info("Niste izbrisali ugovor")
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
            //this.toastr.success("Uspešno ste izmenili ugovor")
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
            //this.toastr.success("Uspešno ste finalizovali ugovor")
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

  deleteContract(){
    this.contractService.deleteCompanyContract(this.contractId).subscribe({
      next:val=>{
        console.log(val);
        
          this.toastr.success("Uspesno obrisan ugovor")
          this.router.navigate(['/companies'])
      },
      error:err=>{
        console.log(err);
        
          if(err.error.text==="Ugovor uspesno izbrisan"){
            this.toastr.success("Uspesno obrisan ugovor")
            this.router.navigate(['/companies'])
          }
          else{
            this.toastr.error("Doslo je do greske pri brisanju ugovor")
          }
      }
    })
  }

  elementiString: string = 'Elementi:\n '

  generateElementsToString(){
    this.elements.forEach(element=>{
      this.elementiString += "Tip hartije " +element.transactionElement + ' '
      this.elementiString += "Tip " +element.buyOrSell + ' '
      this.elementiString += "Cena jednog " +element.priceOfOneElement + ' '
      this.elementiString += "Kolicina " +element.amount + ' '
      this.elementiString += "Balans " +element.balance + ' '
      this.elementiString += "Valuta " + element.currency + '\n'
    })
  }
  getS(){
    console.log(this.elements)
    this.generateElementsToString()
    console.log(this.elementiString);
    
    
  }

  generatePDF() {
    this.generateElementsToString()
    // download()
    this.contractService.getCompanyContractById(this.contractId).subscribe({
      next:val=>{
        this.contractForm = this.formBuilder.group({
          status: [val.contractStatus, Validators.required],
          referenceNumber: [val.contractNumber, Validators.required],
          created: [val.creationDate, Validators.required],
          modified: [val.lastUpdatedDate, Validators.required],
          description: [val.description, Validators.required],
        });
        console.log(val);
        
        const documentDefinition = {
          content: [
            'Status: '+val.contractStatus,
            'Delovodni broj: '+val.contractNumber,
            'Zadnje modifikovan: '+val.lastUpdatedDate,
            'Deskripcija: '+val.description,
            '',
            this.elementiString

          ],
          defaultStyle: {
            font: 'Roboto', // Replace with your desired font name
          },
        };
      
        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.download(val.contractNumber+'.pdf');
      },
      error: err=>{
        alert("erorr");
      }
    })
  }

  getAgentPerm():boolean{
    // console.log(localStorage.getItem("permissions"));
    // console.log(sessionStorage.getItem("permissions")?.includes("READ_USERS"));
    // console.log(!sessionStorage.getItem("permissions")?.includes("ADMIN_USER"));
    // console.log(sessionStorage.getItem("permissions")?.includes("READ_USERS") && !sessionStorage.getItem("permissions")?.includes("ADMIN_USER"));
    
    if (localStorage.getItem("remember") !== null) {
      if (!localStorage.getItem("permissions")?.includes("UPDATE_USERS") && !localStorage.getItem("permissions")?.includes("ADMIN_USER"))
        return false
    } else {
      if (!sessionStorage.getItem("permissions")?.includes("UPDATE_USERS") && !sessionStorage.getItem("permissions")?.includes("ADMIN_USER"))
        return false
   }
    return true
  }
}
