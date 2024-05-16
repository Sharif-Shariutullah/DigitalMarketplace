import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const url = 'http://localhost:8080/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(private http : HttpClient) { }



  login(username: string, password: string): Observable<any> {
    return this.http.post(
      url + '/signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(signUpForm: any): Observable<any> {
    return this.http.post(
      url + '/signup',
      signUpForm,
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(url + '/signout', { }, httpOptions);
  }

}