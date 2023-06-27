import {Component, EventEmitter, Output} from '@angular/core';
import {MenuItem} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/users.model";
import {BusinessAccount, Client, ForeignAccount, LocalAccount} from "../../../models/client.model";
import {UserService} from "../../../services/user-service.service";
import {ToastrService} from "ngx-toastr";
import {CompanyService} from "../../../services/company.service";
import {ClientService} from "../../../services/client.service";
import {error} from "cypress/types/jquery";

@Component({
  selector: 'app-add-user-account',
  templateUrl: './add-user-account.component.html',
  styleUrls: ['./add-user-account.component.css']
})
export class AddUserAccountComponent {

  @Output() addAccountEmitter = new EventEmitter<any>();

  visible: boolean = false;
  items: MenuItem[];
  activeIndex: number = 0;
  firstVisible: boolean = true;
  secondVisible: boolean = false;
  thirdVisible: boolean = false;
  type: string;

  types: [
    { name: string, value: string },
    { name: string, value: string },
    { name: string, value: string },
    { name: string, value: string }
  ];
  businessAcountTypes: [
    { name: string; value: string },
    { name: string; vlaue: string }
  ]

  isLocalFormValid: boolean = false;
  isForeignFormValid: boolean = false;
  clients: User[];
  currencies: string[];
  selectedCurrencies: any[] = [];
  baseCurrency: any
  selectedClient: Client
  loggedInAgent: User

  createLocalAccountForm: FormGroup;
  createForeignAccountForm: FormGroup;
  createBusinessAccountForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private toastr: ToastrService, private clientService: ClientService) {
  }

  onActiveIndexChange(event: any) {
    this.activeIndex = event;
  }

  ngOnInit() {

    this.types = [
      {name: 'Lični', value: 'PERSONALNI'},
      {name: 'Štedni', value: 'STEDNI'},
      {name: 'Penzionerski', value: 'PENZIONERSKI'},
      {name: 'Isplata plata', value: 'ISPLATA_PLATA'}
    ];

    this.businessAcountTypes = [
      {name: 'Kupovni', value: 'KUPOVNI'},
      {name: 'Potrošni', vlaue: 'POTROSNI'}
    ]
    this.initSteps();
    this.initForms();
    this.initData();
  }

  initForms() {
    this.createLocalAccountForm = this.formBuilder.group({
      user: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.createBusinessAccountForm = this.formBuilder.group({
      user: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.createForeignAccountForm = this.formBuilder.group({
      user: ['', Validators.required],
      baseCurrency: ['', Validators.required],
      additionalCurrencies: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.createLocalAccountForm.valueChanges.subscribe(() => {
      this.isLocalFormValid = this.createLocalAccountForm.valid;
    });

    this.createBusinessAccountForm.valueChanges.subscribe(() => {
      this.isLocalFormValid = this.createBusinessAccountForm.valid;
    });

    this.createForeignAccountForm.valueChanges.subscribe(() => {
      this.isForeignFormValid = this.createForeignAccountForm.valid;
    });
  }

  initSteps() {
    this.items = [
      {
        label: 'Vrsta računa',
        command: (event: any) => {
          this.firstVisible = true;
          this.secondVisible = false;
          this.thirdVisible = false;
        }
      },
      {
        label: 'Detalji računa',
        command: (event: any) => {
          this.firstVisible = false;
          this.secondVisible = true;
          this.thirdVisible = false;
        },
        disabled: this.firstVisible
      },
      {
        label: 'Potvrda',
        command: (event: any) => {
          this.firstVisible = false;
          this.secondVisible = false;
          this.thirdVisible = true;
        },
        disabled: this.firstVisible
      },
    ];
  }

  initData() {

    // this.currencies = ['EUR', 'CHF', 'USD', 'GBP', 'JPY', 'CAD', 'AUD']

    this.currencies = ['EUR', 'USD']

    this.userService.getUserData()
      .subscribe({
        next: val => {
          this.loggedInAgent = val
        },
        error: err => {
          this.toastr.error(err.error)
        }
      })

    this.clientService.getAllClients()
      .subscribe({
        next: value => {
          this.clients = value;
        },
        error: err => {
          console.log(err);
        }
      })

  }

  incrementPage(targetPage: number) {
    this.activeIndex++;
    if (targetPage === 2) {
      this.firstVisible = false;
      this.secondVisible = true;
      this.thirdVisible = false;

      this.items[1].disabled = false;

    } else if (targetPage === 3) {
      this.firstVisible = false;
      this.secondVisible = false;
      this.thirdVisible = true;

      if (this.createForeignAccountForm.get('user')?.value !== "") {
        this.selectedClient = this.createForeignAccountForm.get('user')?.value;
        this.baseCurrency = this.createForeignAccountForm.get('baseCurrency')?.value;
      } else if (this.createBusinessAccountForm.get('user')?.value !== "") {
        this.selectedClient = this.createBusinessAccountForm.get('user')?.value
      } else {
        this.selectedClient = this.createLocalAccountForm.get('user')?.value;
      }

      this.items[1].disabled = false;
      this.items[2].disabled = false;

    }

  }

  submitCreateLocalAccount() {

    // TODO: dodati dva inputa za poslednje dve vrednosti

    const localAccount: LocalAccount = {
      id: "1",
      registrationNumber: "",
      ownerId: this.selectedClient.id.toString(),
      balance: 0,
      availableBalance: 0,
      assignedAgentId: this.loggedInAgent.id,
      creationDate: 1,
      type: "LOCAL",
      expirationDate: "",
      currency: "RSD",
      balanceStatus: "",
      balanceType: this.createLocalAccountForm.get('type')?.value.value,
      interestRatePercentage: 1,
      accountMaintenance: 1
    }

    this.addAccountEmitter.emit({value: localAccount, type: 'Local', client: this.selectedClient})
  }

  submitCreateForeignAccount() {

    const foreignAccount: ForeignAccount = {
      id: "1",
      registrationNumber: "",
      ownerId: this.selectedClient.id.toString(),
      // ownerId: "",
      balance: 0,
      availableBalance: 0,
      assignedAgentId: this.loggedInAgent.id,
      creationDate: 1,
      type: "FOREIGN",
      expirationDate: "",
      currency: this.baseCurrency,
      balanceStatus: "",
      balanceType: this.createForeignAccountForm.get('type')?.value.value,
      interestRatePercentage: 1,
      accountMaintenance: 1,
      defaultCurrency: true,
      allowedCurrencies: this.selectedCurrencies
    }

    this.addAccountEmitter.emit({value: foreignAccount, type: 'Foreign', client: this.selectedClient})
  }

  submitCreateBusinessAccount() {
    const businessAccount: BusinessAccount = {
      id: "1",
      registrationNumber: "",
      ownerId: this.selectedClient.id.toString(),
      // ownerId: "",
      balance: 0,
      availableBalance: 0,
      assignedAgentId: this.loggedInAgent.id,
      creationDate: 1,
      type: "BUSINESS",
      expirationDate: "",
      currency: "RSD",
      balanceStatus: "",
      businessAccountType: this.createBusinessAccountForm.get('type')?.value
    }

    this.addAccountEmitter.emit({value: businessAccount, type: 'Business', client: this.selectedClient});
  }

  close() {
    this.activeIndex = 0;
    this.firstVisible = true;
    this.secondVisible = false;
    this.thirdVisible = false;

    this.items[1].disabled = true;
    this.items[2].disabled = true;

    this.initForms();

    this.visible = false;
  }
}
