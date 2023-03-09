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


}
