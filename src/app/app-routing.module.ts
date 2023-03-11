import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import { UsersComponent } from './components/users/users.component';
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./guards/auth-guard/auth.guard";
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canDeactivate: [LoginGuard],
    canActivate: [LoginGuard]
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "home",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**', redirectTo: 'home'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
