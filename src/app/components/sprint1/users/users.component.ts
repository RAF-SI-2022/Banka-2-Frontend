import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { UserService } from '../../../services/user-service.service';
import {MenuItem} from "primeng/api";
import {Permission, User} from "../../../models/users.model";
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

  users: User[];
  selectedPermissions: Permission[];
  permissions: Permission[];
  displayDialog: boolean = false;
  displayAddUserDialog: boolean = false;
  // Breadcrumbs za navigaciju (Pocetna > Users)
  breadcrumbItems: MenuItem[];
  addUserForm: FormGroup;
  roles!: any[];
  selectedRole!: any
  loading: boolean = false;
  displayConfirmationDialog: boolean = false;
  selectedUserId: number = -1



  currentUserRoles: string


  constructor(private userService: UserService, private toastr: ToastrService, private formBuilder: FormBuilder){
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
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Korisnici', routerLink: ['/users']}
    ];

    this.roles = [
      {label: 'Administrator', value: 'ADMINISTRATOR'},
      {label: 'Supervisor', value: 'SUPERVISOR'},
      {label: 'Agent', value: 'AGENT'}
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

        this.userService.getUserData()
        .subscribe({
          next: res=>{
            // console.log(res)

            const currentUser = res
            this.loading = true
            this.users = this.users.filter(user => user.email !== currentUser.email)
          },
          error: err=>{

          }
        })
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
            // this.userService.activateUser(id)
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
        console.log(val)
        for(const item of this.users){
          if(item.id == id){
            item.active = false;
            //this.userService.deactivateUser(id)
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
      editedUser.permissions,
      editedUser.firstName,
      editedUser.lastName,
      editedUser.jobPosition,
      editedUser.dailyLimit,
      editedUser.phone,
      editedUser.active
    )
    
      .subscribe({
        next: val =>{
          this.editUserChild.close()
          this.getUsers()
        },
        error: err =>{
          this.toastr.error("Pogresno uneti podaci!")
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
      $event.permissions,
      $event.dailyLimit,
      $event.jobPosition,
      $event.active,
      $event.jmbg,
      $event.phone
    ).subscribe({
      next: val =>{
        this.getUsers()
        this.showToastAdd()
        this.addUserChild.close()
        //strpati sve podatke u listu usera
      },
      error: err =>{
        this.toastr.error("Pogresno uneti podaci!")
      }
    })
  }
}
