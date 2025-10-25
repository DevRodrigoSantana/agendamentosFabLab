import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {
  private apiUrl = '/auth';
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';

  constructor(private http: HttpClient) {}

  // Login
  login(email: string, password: string) {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      tap(tokens => this.saveTokens(tokens.accessToken, tokens.refreshToken))
    );
  }

  // Salvar tokens
  private saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  // Getters
  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  // Setters
  setAccessToken(token: string) {
    localStorage.setItem(this.accessTokenKey, token);
  }
  setRefreshToken(token: string) {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  // Logout
  logout() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  // Refresh token
  refreshToken() {
    const token = this.getRefreshToken();
    if (!token) return null;

    return this.http.post<any>(`${this.apiUrl}/auth/refresh`, { refreshToken: token }).pipe(
      tap(tokens => this.saveTokens(tokens.accessToken, tokens.refreshToken))
    );
  }
}
