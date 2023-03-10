import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from '../../services/user-service.service';
import {MenuItem} from "primeng/api";
import {Permission, UserModel} from "../../models/users.model";
import {ToastrService} from "ngx-toastr";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: UserModel[]; // prazno da ne bi bacalo greske //todo PROMENI USERA DA KORISTI IZ users.model.ts A NE model.ts DA BI SVI IMALI ISTI MODEL

  selectedPermissions: Permission[];
  permissions: Permission[];
  displayDialog: boolean = false;
  displayAddUserDialog: boolean = false;
  items: MenuItem[];
  editingUser: UserModel;

  addUserForm: FormGroup;




  roles!: any[];
  selectedRole!: any

  loading: boolean = true;

  displayConfirmationDialog: boolean = false;
  selectedUserId: number = -1



  constructor(private userService: UserService, private toastr: ToastrService, private formBuilder: FormBuilder){
    this.selectedPermissions = [];
    this.permissions = [
      {
        id: 1,
        permissionName: "ADMIN_USER"
      },
      {
        id: 1,
        permissionName: "CREATE_USERS"
      },
      {
        id: 1,
        permissionName: "CREATE_USERS"
      },
      {
        id: 1,
        permissionName: "CREATE_USERS"
      }
    ]

    this.addUserForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      permissions: new FormArray([]),
      jobPosition: '',
      active: false,
      jmbg: '',
      phone: '',

    });

  }

  printPermissions(){
    console.log(this.selectedPermissions);

  }

  toggleConfirmationDialog(id: number){
    this.displayConfirmationDialog = !this.displayConfirmationDialog;
    this.selectedUserId = id
  }


  toggleDialog(id: number) {
    this.userService.getUserById(id).subscribe({
      next: val =>{
        console.log(val)
        this.editingUser = val;
        //strpati sve podatke u listu usera
      },
      error: err =>{
        //alertovati error
      }
    })
    this.displayDialog = !this.displayDialog;
  }

  toggleAddUserDialog() {
    this.displayAddUserDialog = !this.displayAddUserDialog;
  }

  updateUser() {

  }

  ngOnInit(){


    this.items = [
      {label: 'Početna', routerLink: ['/']},
      {label: 'Korisnici', routerLink: ['/users']}
    ];

    // TODO promeniti labele i value na role
    this.roles = [
      {label: 'Doktor', value: 'Doktor'},
      {label: 'Lider', value: 'Lider'},
      {label: 'Debil', value: 'Debil'}
  ]


    this.getUsers()
  }

  // ToastrService.success/error/warning/info/show()
  showToastDelete(){
    this.toastr.error("Korisnik obrisan")
  }

  showToastAdd(){
    this.toastr.success("Korisnik dodat")
  }

  // Filtriranje globalno
  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  // Dovlacenje svih usera
  getUsers(){

    this.userService.getAllUsers()     //todo PROMENI USERA DA KORISTI IZ users.model.ts A NE model.ts DA BI SVI IMALI ISTI MODEL
    .subscribe({
      next: val =>{
        this.users = val;
        this.loading = true
        //strpati sve podatke u listu usera
      },
      error: err =>{
        //alertovati error
      }
    })

  }

  clearSelectedUserId(){
    this.selectedUserId = -1
    this.displayConfirmationDialog = !this.displayConfirmationDialog
  }

  deleteUser() {
    if(this.selectedUserId === -1){
      alert("greska")
      return;
    }
    this.userService.deleteUser(this.selectedUserId)     //todo PROMENI USERA DA KORISTI IZ users.model.ts A NE model.ts DA BI SVI IMALI ISTI MODEL
      .subscribe({
        next: val =>{
          console.log(val)
          this.users = this.users.filter(user => user.id != this.selectedUserId);
          this.showToastDelete()
          //strpati sve podatke u listu usera
        },
        error: err =>{
          console.log(err)
          this.selectedUserId = -1
          this.displayConfirmationDialog = !this.displayConfirmationDialog
        }
      })
  }

  activateUser(id:number){
    for(const item of this.users){
      if(item.id == id){
        item.active = true;
      }
    }

    // this.userService.activateUser(id)
    // .subscribe({
    //   next: val=>{
    //     alert("success")
    //     for(const item of this.users){
    //       if(item.id == id){
    //         item.aktivan = 2;
    //       }
    //     }
    //   },
    //   error: err=>{
    //     alert("greska")
    //   }
    // })
    // alert(id)
  }
  deactivateUser(id:number){
    for(const item of this.users){
      if(item.id == id){
        item.active = false;
      }
    }

    // this.userService.deactivateUser(id)
    // .subscribe({
    //   next: val=>{
    //     alert("success")
    //     for(const item of this.users){
    //       if(item.id == id){
    //         item.aktivan = 2;
    //       }
    //     }
    //   },
    //   error: err=>{
    //     alert("greska")
    //   }
    // })
    // alert(id)
  }

  addUser(){

    // TODO premisije i pozicije

    this.userService.createNewUser(
      this.addUserForm.get('firstName')?.value,
      this.addUserForm.get('lastName')?.value,
      this.addUserForm.get('email')?.value,
      this.addUserForm.get('password')?.value,
      [],
      "master baiter",
      this.addUserForm.get('active')?.value,
      this.addUserForm.get('jmbg')?.value,
      this.addUserForm.get('phone')?.value

    ).subscribe({
      next: val =>{
        console.log(val)

    // TODO push novog user u array

        // this.users.push(val)
        this.getUsers()
        this.showToastAdd()

        this.displayAddUserDialog = false
        //strpati sve podatke u listu usera
      },
      error: err =>{
        //alertovati error
      }
    })



  }

}
