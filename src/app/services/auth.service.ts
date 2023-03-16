import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../models/auth.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${environment.apiAuthServerUrl}/login`, { email: email, password: password }, {observe: 'response'});
  }

  resetPassword(email: string) {
    return this.httpClient.post<any>(`${environment.apiForgotPassUrl}`, { email: email }, {observe: 'response'});
  }

  submitNewPassword(password: string, token: string) {
    return this.httpClient.post<any>(`${environment.apiPasswordRestoreUrl}`, { token: token, newPassword: password}, {observe: 'response'});
  }


}
