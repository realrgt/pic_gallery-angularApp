import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly KEY  = 'authToken';

  constructor() { }

  hasToken() {
    return !!this.getToken();
  }

  setToken(token: string) {
    window.localStorage.setItem(this.KEY, token);
  }

  getToken() {
    return window.localStorage.getItem(this.KEY);
  }

  removeToken() {
    window.localStorage.removeItem(this.KEY);
  }

}
