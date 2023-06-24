import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MenuItem} from 'primeng/api';
import {Client} from "../../../models/client.model";
import {ClientService} from "../../../services/client.service";
import {cli} from "cypress";
import {UserService} from "../../../services/user-service.service";

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


  constructor(private formBuilder: FormBuilder, private clientService: ClientService,
              private toastr: ToastrService, private router: Router, private userService: UserService) {
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

    this.passwordForm.valueChanges.subscribe(() => {
      if (this.passwordForm.valid) {
        if (this.passwordForm.get('password')?.value === this.passwordForm.get('confirmPassword')?.value) {
          this.isPasswordFormValid = true;
        } else {
          this.isPasswordFormValid = false;
        }
      } else {
        this.isPasswordFormValid = false
      }
    })

    this.validationForm.valueChanges.subscribe(() => {
      this.isValidationFormValid = this.validationForm.valid
    })

    this.loginForm.valueChanges.subscribe(() => {
      this.isLoginFormValid = this.loginForm.valid;
    });

    this.registerForm.valueChanges.subscribe(() => {
      this.isRegisterFormValid = this.registerForm.valid;
    });

    this.genders = [
      {name: 'Muško', code: 'Male'},
      {name: 'Žensko', code: 'Female'},
      {name: 'Helikopter 🚁', code: 'Helicopter'},
      {name: 'Radije ne bih reko :)', code: 'None'}
    ];


    this.initSteps()

  }

  ngOnInit() {
    this.container = document.getElementById('container')!;
  }

  changeSignUp() {
    this.container.classList.add("right-panel-active");
  }

  changeSignIn() {
    this.container.classList.remove("right-panel-active");
  }

  login() {

    let remember = this.loginForm.get('remember')?.value

    this.clientService.loginClient(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .subscribe({
        next: value => {


          let res = JSON.parse(value);
          console.log(JSON.parse(value))
          if(remember) {
            localStorage.setItem("token", res.token)
            this.userService.setToken(res.token)
          } else {
            sessionStorage.setItem("token", res.token)
            this.userService.setToken(res.token)
          }

          this.router.navigate(['home'])
          this.toastr.success('Uspešno ste se ulogovali.')
        },
        error: err => {
          this.toastr.error('Pogrešni kredencijali')
        }
      })
  }

  initSteps() {
    this.items = [
      {
        label: 'Podaci',
        command: (event: any) => {
          this.firstVisible = true;
          this.secondVisible = false;
          this.thirdVisible = false;
        }
      },
      {
        label: 'Validacija',
        command: (event: any) => {
          this.firstVisible = false;
          this.secondVisible = true;
          this.thirdVisible = false;
        },
        disabled: this.firstVisible
      },
      {
        label: 'Šifra',
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

  registerPart1() {
    // console.log(this.registerForm);
    // console.log(this.registerForm.get('selectedGender')?.value.code);
    // console.log(this.registerForm.get('email')?.value);

    this.registerForm.disable()

    this.userService.sendTokenToEmail(this.registerForm.get('email')?.value).subscribe({
      next: val => {
        this.toastr.info("Poslat vam je kod na email")
        this.firstVisible = false;
        this.secondVisible = true;
        this.activeIndex++
        this.items[1].disabled = false
        this.items[0].disabled = true
      },
      error: err => {
        console.log(err);
        this.toastr.error("Doslo je do greske pri slanju verifikacionog koda")
        this.registerForm.enable()
      }
    })
  }

  registerPart2() {
    console.log(this.registerForm.get('email')?.value);
    console.log(this.validationForm.get('code')?.value);


    this.userService.checkToken(
      this.validationForm.get('code')?.value
    ).subscribe({
      next: val => {
        this.toastr.info("Uspesno ste validirali email")
        this.secondVisible = false;
        this.thirdVisible = true;
        this.activeIndex++
        this.items[0].disabled = true
        this.items[1].disabled = true
        this.items[2].disabled = false
      },
      error: err => {
        console.log(err);
        this.toastr.error("Kod nije ispravan")
      }
    })
  }

  registerPart3() {

    let client: Client = {
      id: "",
      name: this.registerForm.get('firstName')?.value,
      lastname: this.registerForm.get('lastName')?.value,
      dateOfBirth: this.registerForm.get('dateOfBirth')?.value,
      gender: this.registerForm.get('selectedGender')?.value.code,
      email: this.registerForm.get('email')?.value,
      telephone: this.registerForm.get('phone')?.value,
      address: this.registerForm.get('address')?.value,
      password: this.passwordForm.get('password')?.value
    }

    this.clientService.registerClient(
      client
    ).subscribe({
      next: val => {
        this.toastr.info("Uspesno ste kreirali nalog")
        window.location.reload();
      },
      error: err => {
        this.toastr.error("Doslo je do greske pri kreiranju naloga")
        console.log(err);
      }
    })

  }

}
