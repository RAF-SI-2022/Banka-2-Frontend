import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';

interface Gender {
  name: string;
  code: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  signUpButton: HTMLElement;
  signInButton: HTMLElement;
  container: HTMLElement;

  loginForm: FormGroup;
  isLoading: boolean = false;
  isLoginFormValid: boolean = false;

  registerForm: FormGroup
  isRegisterFormValid: boolean = false
  genders: Gender[];

  validationForm: FormGroup
  isValidationFormValid: boolean = false

  passwordForm: FormGroup
  isPasswordFormValid: boolean = false



  items: MenuItem[]
  firstVisible = true;
  secondVisible = false;
  thirdVisible = false;
  activeIndex: number = 0;



  constructor(private formBuilder: FormBuilder, private toastr: 
    ToastrService, private router: Router){
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        remember: false
      });

      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        address: ['', [Validators.required]],
        dateOfBirth: ['', [Validators.required]],
        selectedGender: new FormControl<Gender | null>(null),
      });

      this.validationForm = this.formBuilder.group({
        code: ['', Validators.required],
      });

      this.passwordForm = this.formBuilder.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      });

      this.passwordForm.valueChanges.subscribe(()=>{
        if(this.passwordForm.valid){
          if(this.passwordForm.get('password')?.value === this.passwordForm.get('confirmPassword')?.value){
            this.isPasswordFormValid = true;
          }
          else{
            this.isPasswordFormValid = false;
          }
        }
        else{
          this.isPasswordFormValid = false
        }
      })

      this.validationForm.valueChanges.subscribe(()=>{
        this.isValidationFormValid = this.validationForm.valid
      })

      this.loginForm.valueChanges.subscribe(() => {
        this.isLoginFormValid = this.loginForm.valid;
      });

      this.registerForm.valueChanges.subscribe(() => {
        this.isRegisterFormValid = this.registerForm.valid;
      });

      this.genders = [
        { name: 'Musko', code: 'Male' },
        { name: 'Zensko', code: 'Female' },
        { name: 'Helikopter 🚁', code: 'Helicopter' },
        { name: 'Radije ne bih reko :)', code: 'None' } 
    ];


      this.initSteps()

  }

  ngOnInit() {
    this.container = document.getElementById('container')!;
  }
  changeSignUp(){
    this.container.classList.add("right-panel-active");
  }
  
  changeSignIn(){
    this.container.classList.remove("right-panel-active");
  }

  login(){
    console.log(this.loginForm);
    
  }

  initSteps() {
    this.items = [
      {
        label: 'Osnovni podaci',
        command: (event: any) => {
          this.firstVisible = true;
          this.secondVisible = false;
          this.thirdVisible = false;
        }
      },
      {
        label: 'Validacija email-a',
        command: (event: any) => {
          this.firstVisible = false;
          this.secondVisible = true;
          this.thirdVisible = false;
        },
        disabled: this.firstVisible
      },
      {
        label: 'Kreiranje sifre',
        command: (event: any) => {
          this.firstVisible = false;
          this.secondVisible = false;
          this.thirdVisible = true;
        },
        disabled: this.firstVisible
      },
    ];
  }
  onActiveIndexChange(event: any) {
    this.activeIndex = event;
  }

  registerPart1()
  {
    // console.log(this.registerForm);  
    // console.log(this.registerForm.get('selectedGender')?.value.code);
    // console.log(this.registerForm.get('email')?.value);
    this.firstVisible = false;
    this.secondVisible = true;
    this.activeIndex++
    this.items[1].disabled = false
    this.items[0].disabled = true

  //  this.servis?.sendEmailVerification(this.registerForm.get('email')?.value).subscribe({
  //     next: val =>{
  //       this.toastr.info("Poslat vam je kod na email")
  //       // todo prebaciti na 2. korak
  //     },
  //     error: err=>{
  //       this.toastr.error("Doslo je do greske pri slanju verifikacionog koda")
  //     }
  //   })
  }

  registerPart2()
  {
    console.log(this.registerForm.get('email')?.value);
    console.log(this.validationForm.get('code')?.value);
    this.secondVisible = false;
    this.thirdVisible = true;
    this.activeIndex++
    this.items[0].disabled = true
    this.items[1].disabled = true
    this.items[2].disabled = false

  //  this.servis?.sendVerificationCode(
  // this.registerForm.get('email')?.value, 
  // this.validationForm.get('code')?.value
  // ).subscribe({
  //     next: val =>{
  //       this.toastr.info("Uspesno ste validirali email")
  //       // todo prebaciti na 2. korak
  //     },
  //     error: err=>{
  //       this.toastr.error("Kod nije ispravan")
  //     }
  //   })
  }
  registerPart3(){
    console.log(this.passwordForm.get('password')?.value);
    console.log(this.registerForm);  

    // this.servis?.sendVerificationCode(
    //   this.registerForm.get('firstName')?.value,
    //   this.registerForm.get('lastName')?.value,
    //   this.registerForm.get('dateOfBirth')?.value,
    //   this.registerForm.get('selectedGender')?.value.code,
    //   this.registerForm.get('email')?.value,
    //   this.registerForm.get('phone')?.value,
    //   this.registerForm.get('address')?.value,
    //   this.registerForm.get('password')?.value
    // ).subscribe({
    //     next: val =>{
    //       this.toastr.info("Uspesno ste kreirali nalog")
    //       // todo mozda refresh i da mu kazemo da se sad loginuje?
    //     },
    //     error: err=>{
    //       this.toastr.error("Doslo je do greske pri kreiranju naloga")
    //     }
    //   })
    
  }

}
