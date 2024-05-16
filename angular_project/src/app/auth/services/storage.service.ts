import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';


const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public userDetail = new BehaviorSubject<any>([]);


  setUserDetail(userDetaail: any) {

    // const user2 = JSON.parse(userDetaail);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(userDetaail.jwtToken);
    this.userDetail.next(decodedToken);
  }

  getUserDetail() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      const user2 = JSON.parse(user);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(user2.jwtToken);
      // Other functions
      const expirationDate = helper.getTokenExpirationDate(user2.jwtToken);
      const isExpired = helper.isTokenExpired(user2.jwtToken);
      this.userDetail.next(decodedToken);
    }
    return this.userDetail.asObservable();
  }

  removeUserDetailsa() {
    this.userDetail.next(null);
  }

  constructor() { }

  public getToken(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      const userToken = JSON.parse(user)
      return userToken.jwtToken;
    }

    return {};
  }

  clean(): void {

    console.log(this.userDetail);
    
    this.userDetail.next(null);
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    // this.userDetail.next(userDetaail);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      const user2 = JSON.parse(user);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(user2.jwtToken);
      // Other functions
      const expirationDate = helper.getTokenExpirationDate(user2.jwtToken);
      const isExpired = helper.isTokenExpired(user2.jwtToken);
      return decodedToken;
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
