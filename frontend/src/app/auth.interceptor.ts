import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const token = auth.getToken();
  const ehLogin = req.url.includes('/public/login');

  // coloca o cabeçalho Authorization: Bearer <token> (menos no login)
  const requisicao =
    token && !ehLogin
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(requisicao).pipe(
    catchError((erro: HttpErrorResponse) => {
      // token expirado ou inválido: desloga e volta para o login
      if (erro.status === 401 && !ehLogin) {
        auth.logout();
        router.navigateByUrl('/login');
      }
      return throwError(() => erro);
    })
  );
};