import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../models/auth.model";
import {environment} from "../../environments/environment";
import {Observable, Subject} from 'rxjs';
import {tap} from 'rxjs/operators';
import {UserService} from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginSubject = new Subject<void>();

  constructor(private httpClient: HttpClient, private userService: UserService) {
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<LoginResponse>(`${environment.apiAuthServerUrl}/login`, {
      email: email,
      password: password
    }, {observe: 'response'})
      .pipe(
        tap(response => {
          if (response.status === 200) {
            this.userService.setToken(<string>response.body?.token);
            this.loginSubject.next();
          }
        })
      )
  }

  resetPassword(email: string) {
    return this.httpClient.post<any>(`${environment.apiForgotPassUrl}`, {email: email}, {observe: 'response'});
  }

  submitNewPassword(password: string, token: string) {
    return this.httpClient.post<any>(`${environment.apiPasswordRestoreUrl}`, {
      token: token,
      newPassword: password
    }, {observe: 'response'});
  }

  loginEvent(): Observable<void> {
    return this.loginSubject.asObservable();
  }

}
