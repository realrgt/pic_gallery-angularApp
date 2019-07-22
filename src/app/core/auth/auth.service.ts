import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  authenticate(userName: string, password: string) {
    return this.http
      .post(this.API_URL + '/user/login', { userName, password }, { observe: 'response' } )
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        this.tokenService.setToken(authToken);
        console.log(`User ${userName} authenticated with token ${authToken}`);
      }));
  }

}
