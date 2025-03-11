import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest, LoginSuccess } from '../../model/login.model';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RequestFailed } from 'src/app/shared/model/request.failed';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  protected loginForm : FormGroup;

  constructor(
    private _formBuilder : FormBuilder,
    private _loginService: LoginService,
    private _router: Router,
    private _toast: ToastrService
  ){
    this.loginForm = _formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //Permite el login de un usuario
  login(): void {
    if(this.loginForm.valid){
      //Construir la solicitud de login
      let loginRequest : LoginRequest = {
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value
      }
      //Enviar la solicitud
      this._loginService.login(loginRequest).subscribe({
        next: (loginSuccess : LoginSuccess) => {                 
          localStorage.setItem('accessToken', loginSuccess.accessToken);
          localStorage.setItem('refreshToken', loginSuccess.refreshToken);
          this._toast.success('Bienvenido', 'Login exitoso');
          this._router.navigate(['/dashboard']);
        },
        //MANEJO DE ERRORES
        error: (error: HttpErrorResponse) => {
          let requestFailed : RequestFailed = error.error;
          this._toast.error(
            requestFailed.errors.join(','),
            'Login fallido'
          );
        }
      })
    }else{
      this._toast.error("Falta llenar datos correctamente", "Error");
    }
  }

  //PERMITE SABER SI HAY ALGUN ERROR EN LOS CAMPOS PROPORCIONADOS
  public hasError(field: string, errorType: string){
    return this.loginForm.get(field)?.touched && this.loginForm.get(field)?.hasError(errorType);
  }


}
