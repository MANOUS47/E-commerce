import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private readonly router = inject(Router);

  userData: any = null;

  baseUrl: string = 'https://ecommerce.routemisr.com';

  sendRegisterForm(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/signup`, data);
  }

  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/auth/signin`, data);
  }

  saveUserData(): void {
    if (localStorage.getItem('userToke') !== null) {
      this.userData = jwtDecode(localStorage.getItem('userToken')!);

      console.log(this.userData);
    }
  }

  signOut(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this.router.navigate(['/login']);
  }

  goRegister(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/register']);
  }

  goLogin(): void {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  sendEmailVerify(data: object): Observable<any> {
    return this.httpClient.post(
      ` ${this.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  sendCodeVerify(data: object): Observable<any> {
    return this.httpClient.post(
      `  ${this.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }
  sendResetPassword(data: object): Observable<any> {
    return this.httpClient.put(
      `    ${this.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
