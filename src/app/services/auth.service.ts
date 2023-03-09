import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../components/models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  // TODO: izdvojiti URL-ove za API pozive
  // TODO: proveriti sa back timom sta vraca Login
  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/users/login', { email: email, password: password }, {observe: 'response'});
  }
}
