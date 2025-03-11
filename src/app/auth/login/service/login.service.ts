import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginSuccess } from '../model/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlBase: string = 'http://localhost:9001/api/library/auth'

  constructor(private _client: HttpClient) {}

  //Metodo que permite el login de usuarios
  public login(loginRequest : LoginRequest): Observable<LoginSuccess>{
    return this._client.post<LoginSuccess>(`${this.urlBase}/login`, loginRequest);
  }

}
