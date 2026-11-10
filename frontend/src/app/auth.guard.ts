import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const perfilGuard = (perfil: 'ADMIN' | 'USER'): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // sem token: volta para o login
  if (!auth.estaLogado()) {
    return router.createUrlTree(['/login']);
  }

  // perfil certo: entra
  if (auth.getTipo() === perfil) {
    return true;
  }

  // perfil errado: vai para a área do próprio perfil
  return router.createUrlTree([auth.getTipo() === 'ADMIN' ? '/admin' : '/cliente']);
};