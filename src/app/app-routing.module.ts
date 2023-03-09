import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {LoginComponent} from "./components/login/login.component";
import { UsersComponent } from './components/users/users.component';
import {AddUserComponent} from "./components/add-user/add-user.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  {
    path: "edit-user/:id",
    component: EditUserComponent
  },
  {
    path: "add-user",
    component: AddUserComponent
  },
  {
    path: '**', redirectTo: 'users'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
