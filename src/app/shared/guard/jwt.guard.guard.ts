import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const jwtGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyecta Router
  const token = localStorage.getItem('accessToken');

  if (!token) {
    router.navigate(['/']); // Redirige al login
    return false; // Bloquea el acceso si no hay token
  }

  return true; // Permite el acceso si el token existe
};
