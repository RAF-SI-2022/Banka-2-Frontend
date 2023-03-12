import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from '../../services/user-service.service';
import {MenuItem} from "primeng/api";
import {Permission, User} from "../../models/users.model";
import {ToastrService} from "ngx-toastr";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {AddUserComponent} from "../add-user/add-user.component";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  @ViewChild(AddUserComponent, {static : true}) addUserChild : AddUserComponent
  @ViewChild(EditUserComponent, {static : true}) editUserChild : EditUserComponent
  // Globalni search
  @ViewChild('dt') dt: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


  users: User[]; // prazno da ne bi bacalo greske //todo PROMENI USERA DA KORISTI IZ users.model.ts A NE model.ts DA BI SVI IMALI ISTI MODEL

  selectedPermissions: Permission[];
  permissions: Permission[];
  displayDialog: boolean = false;
  displayAddUserDialog: boolean = false;
  // Breadcrumbs za navigaciju (Pocetna > Users)
  breadcrumbItems: MenuItem[];
  // editingUser: User;
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

  toggleAddUserDialog() {
    this.displayAddUserDialog = !this.displayAddUserDialog;
  }

  ngOnInit(){

    this.breadcrumbItems = [
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

  showToastDelete(){
    this.toastr.error("Korisnik obrisan")
  }

  showToastAdd(){
    this.toastr.success("Korisnik dodat")
  }

  // Dovlacenje svih usera
  getUsers(){
    this.userService.getAllUsers()
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

  openDeleteConfirmationDialog(id: number){
    this.displayConfirmationDialog = true;
    this.selectedUserId = id
  }

  closeDeleteConfirmationDialog(){
    this.selectedUserId = -1
    this.displayConfirmationDialog = false;
  }

  // TODO: back treba da ovo implementira
  deleteUser() {
    if(this.selectedUserId === -1){
      alert("greska")
      return;
    }
    this.userService.deleteUser(this.selectedUserId)
      .subscribe({
        next: val =>{
          console.log(val)
          // this.getUsers()
          this.users = this.users.filter(user => user.id != this.selectedUserId);
          this.showToastDelete()
          this.closeDeleteConfirmationDialog()
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
    this.userService.activateUser(id)
    .subscribe({
      next: val=>{
        for(const item of this.users){
          if(item.id == id){
            item.active = true;
            this.userService.activateUser(id)
          }
        }
      },
      error: err=>{
        alert(err)
      }
    })
  }

  deactivateUser(id:number){
    this.userService.deactivateUser(id)
    .subscribe({
      next: val=>{
        console.log("kurac")
        console.log(val)
        for(const item of this.users){
          if(item.id == id){
            item.active = false;
            this.userService.deactivateUser(id)
          }
        }
      },
      error: err=>{
        alert(err.toString())
      }
    })
  }

  // Otvaramo AddUserComponent komponentu (child)
  callAddUserChild() {
    this.addUserChild.open();
  }

  // Prosledjivanje id-a user-a child-u (komponenti EditUser)
  callEditUserChild(id: number){
    const user = this.users.find(user => user.id === id) // iz liste svih user-a uzimamo onog sa prosledjenim id
    this.editUserChild.open(user); // editUserChild je referenca na child komponentu (EditUserComponent)
  }

  // Event stize iz child komponente (EditUserComponent)
  editUser($event: any) {
    const editedUser = $event
    this.userService.updateUser(
      editedUser.id,
      editedUser.email,
      editedUser.firstName,
      editedUser.lastName,
      editedUser.jobPosition,
      editedUser.phone,
      editedUser.active
    )
      .subscribe({
        next: val =>{
          // TODO LOGIKA ZA SORTIRANJE
          this.editUserChild.close()
          this.getUsers()
        },
        error: err =>{
          console.log(err);

        }
      })
  }


  // Event stize iz child komponente (AddUserComponent), event je objekat User-a
  addUser($event: any) {
    this.userService.createNewUser(
      $event.firstName,
      $event.lastName,
      $event.email,
      $event.password,
      [],
      "master baiter",
      $event.active,
      $event.jmbg,
      $event.phone
    ).subscribe({
      next: val =>{
        console.log(val)

        // TODO push novog user u array zameniti sa getUsers

        // this.users.push(val)
        this.getUsers()
        this.showToastAdd()
        this.addUserChild.close()
        //strpati sve podatke u listu usera
      },
      error: err =>{
        //alertovati error
      }
    })
  }
}
