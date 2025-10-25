import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const auth = inject(Auth);
  const http = inject(HttpClient);

  const token = auth.getAccessToken();
  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) return throwError(() => error);

      const refresh$ = auth.refreshToken();
      if (!refresh$) {
        auth.logout();
        return throwError(() => error);
      }

      return refresh$.pipe(
        switchMap((tokens: any) => {
          const newAccess = tokens.accessToken || auth.getAccessToken();
          if (!newAccess) {
            auth.logout();
            return throwError(() => error);
          }

          const retryReq = req.clone({
            setHeaders: { Authorization: `Bearer ${newAccess}` }
          });
          return next(retryReq);
        }),
        catchError(err => {
          auth.logout();
          return throwError(() => err);
        })
      );
    })
  );
};
