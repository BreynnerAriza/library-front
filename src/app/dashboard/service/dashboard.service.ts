import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../model/module';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private urlBase: string = 'http://localhost:9001/api/library/v1/modules';

  constructor(private _client: HttpClient) { }

  public listModule(): Observable<Module []>{
    return this._client.get<Module []>(`${this.urlBase}/user`);
  }

}
