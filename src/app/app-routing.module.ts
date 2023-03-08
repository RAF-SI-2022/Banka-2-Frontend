import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login-component/login.component";
import { UsersComponent } from './components/users-component/users.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "users",
    component: UsersComponent
  },
  { path: '**', redirectTo: 'users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
