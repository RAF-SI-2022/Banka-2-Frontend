import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Permission, User } from 'src/app/models/users.model';
import { MenuItem } from 'primeng/api';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeAgentLimitComponent } from '../change-agent-limit/change-agent-limit.component';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent {

  @ViewChild(ChangeAgentLimitComponent, {static: true}) editUserChild: ChangeAgentLimitComponent
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


  constructor(private userService: UserService, private toastr: ToastrService, private formBuilder: FormBuilder) {
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

  ngOnInit() {

    this.breadcrumbItems = [
      {label: 'Početna', routerLink: ['/home']},
      {label: 'Agenti', routerLink: ['/agents']}
    ];

    this.roles = [
      {label: 'Administrator', value: 'ADMINISTRATOR'},
      {label: 'Supervisor', value: 'SUPERVISOR'},
      {label: 'Agent', value: 'AGENT'}
    ]
    this.getUsers()
  }

  showToastDelete() {
    this.toastr.error("Korisnik obrisan")
  }

  showToastAdd() {
    this.toastr.success("Korisnik dodat")
  }

  // Dovlacenje svih usera
  getUsers() {
    this.userService.getAllUsers()
      .subscribe({
        next: val => {
          this.users = val;

          this.userService.getUserData()
            .subscribe({
              next: res => {
                // console.log(res)

                const currentUser = res
                this.loading = true
                this.users = this.users.filter(user => user.email !== currentUser.email)
              },
              error: err => {
                this.toastr.error(err.error)
              }
            })
          //strpati sve podatke u listu usera
        },
        error: err => {
          //alertovati error
        }
      })
  }

  // Prosledjivanje id-a user-a child-u (komponenti EditUser)
  callEditUserChild(id: number) {
    const user = this.users.find(user => user.id === id) // iz liste svih user-a uzimamo onog sa prosledjenim id
    this.editUserChild.open(user); // editUserChild je referenca na child komponentu (EditUserComponent)
  }

  // Event stize iz child komponente (EditUserComponent)
  editUser($event: any) {
    const editedUser = $event
    // console.log(editedUser)
    this.userService.changeUsersDailyLimit(
      editedUser.id,
      editedUser.dailyLimit
    )
      .subscribe({
        next: val => {
          this.editUserChild.close()
          this.getUsers()
          this.toastr.info("Korisnikov limit uspesno promenjen.")
        },
        error: err => {
          this.toastr.error(err.error)
        }
      })
  }
  resetUserLimit(id: number) {
    this.userService.resetUserLimit(id).subscribe({
      next: value => {
        this.getUsers();
        this.toastr.info("Limit uspesno resetovan.")
      },
      error: err => {
        this.toastr.error(err.error)
      }
    })
  }
}
