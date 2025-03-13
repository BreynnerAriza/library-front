import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { Module } from '../../model/module';
import { RequestFailed } from 'src/app/shared/model/request.failed';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  public modules? : Module[] | null;
  public isOpen : Boolean = false;

  constructor(
    private _dashboardService: DashboardService,
    private _router: Router,
    private _toast: ToastrService
  ){}

  ngOnInit(): void {
    this._dashboardService.listModule().subscribe({
      next: (data: Module []) => {
        this.modules = data;
      }
    });
  }

  public menuToggle(): void{
    this.isOpen = !this.isOpen;
  }

  public logout(): void{
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    this._toast.success('Vuelve pronto!', 'Logout');
    this._router.navigate([""]);
  }

}
