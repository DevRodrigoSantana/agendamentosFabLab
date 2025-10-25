import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';
import jwtDecode, { JwtPayload } from 'jwt-decode'; // <- import padrão

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const token = auth.getAccessToken();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    // Corrigido: sem ponto extra
    const decoded: JwtPayload = jwtDecode(token);

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      auth.logout();
      router.navigate(['/login']);
      return false;
    }

    return true;
  } catch (err) {
    auth.logout();
    router.navigate(['/login']);
    return false;
  }
};
