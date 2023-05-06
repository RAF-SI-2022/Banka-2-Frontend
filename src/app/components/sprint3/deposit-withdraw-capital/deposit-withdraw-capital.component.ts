import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/users.model';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-deposit-withdraw-capital',
  templateUrl: './deposit-withdraw-capital.component.html',
  styleUrls: ['./deposit-withdraw-capital.component.css']
})
export class DepositWithdrawCapitalComponent {

  @Output() dwEmitter = new EventEmitter<any>();


  depositForm: FormGroup;
  withdrawForm: FormGroup;
  visible: boolean = false;
  isFormValid = false;
  isWFormValid = false;
  valute =[{name:"RSD"},{name:"USD"},{name:"EUR"},{name:"CAD"}]
  user: User



  constructor(private formBuilder: FormBuilder,private toastr: ToastrService , private userService: UserService, private  stockService: StockService) {
    this.depositForm = this.formBuilder.group({
      iznos: [null, Validators.required],
      valuta: [null, Validators.required],
    });
    this.withdrawForm = this.formBuilder.group({
      iznos: [null, Validators.required],
      valuta: [null, Validators.required],
    });
    this.withdrawForm.valueChanges.subscribe(() => {
      this.isWFormValid = this.withdrawForm.valid;
    });
    this.depositForm.valueChanges.subscribe(() => {
      this.isFormValid = this.depositForm.valid;
    });
  }

  ngOnInit(){
  }

  submit(){
    if (this.depositForm.valid) {
        this.getUser(1)
    }
  }

  submit2(){
    if (this.withdrawForm.valid) {
        this.getUser(2)
    }
  }

  resetForm() {
    this.depositForm.get('iznos')?.reset();
    this.depositForm.get('valuta')?.reset();
    this.withdrawForm.get('iznos')?.reset();
    this.withdrawForm.get('valuta')?.reset();
  }

  open() {
    this.visible = true;
  }

  deposit(currencyCode:string,userEmail:string,amount:number){
    console.log(userEmail+" "+currencyCode+" "+amount)
    this.stockService.depositBalance(amount,userEmail,currencyCode)
    .subscribe({
      next: val => {
        this.dwEmitter.emit(this.user.email);
      },
      error: err =>{
        this.toastr.error(err.error)
      }
    })
  }

  withdraw(currencyCode:string,userEmail:string,amount:number){
    console.log(userEmail+" "+currencyCode+" "+amount)

    this.stockService.withdrawBalance(amount,userEmail,currencyCode)
    .subscribe({
      next: val => {
        this.dwEmitter.emit(this.user.email);
      },
      error: err =>{
        this.toastr.error(err.error)
      }

    })
  }

  async getUser(flag:number){
    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.user = val
          if(flag===1){
            this.deposit(this.depositForm.value.valuta.name,this.user.email,this.depositForm.value.iznos)
          }
          if(flag===2){
            this.withdraw(this.withdrawForm.value.valuta.name,this.user.email,this.withdrawForm.value.iznos)
          }
        },
        error: err => {
          // console.log(err)
          this.toastr.error(err.error)

        }
      })
  }
}
