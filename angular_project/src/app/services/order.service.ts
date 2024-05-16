import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import { Order } from '../interface/order';
import { StorageService } from '../auth/services/storage.service';
import { Observable } from 'rxjs';


const url = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  token!: string ;

 


  constructor(private http : HttpClient, private storageService: StorageService) {
  }

  getOrders(){
    return this.http.get<Order[]>(url+"/orderss" )
  }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     // 'Authorization': 'Bearer '+ this.token,

  //     'Authorization': 'HTTP_TOKEN '+'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEyMyIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWQiOjEsImlhdCI6MTY4OTkwODEwOSwiZXhwIjoxNjg5OTk0NTA5fQ.G98G_a1gRRM8CLhjedRTLyMB925SCxQMt3DeetTgMzo',
  //     'Cookie': 'my-ecommerce=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjEyMyIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWQiOjEsImlhdCI6MTY4OTkwODEwOSwiZXhwIjoxNjg5OTk0NTA5fQ.G98G_a1gRRM8CLhjedRTLyMB925SCxQMt3DeetTgMzo'
  //   })
  // }

  

  createOrder(data: Order){
    this.token = this.storageService.getToken();    
    
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${this.token}`
});
console.log(headers);

const requestOptions = { headers: headers };

    return this.http.post(url+'/orderss', data, requestOptions)
  }

 

  getOrderList(uId: any) {

    this.token = this.storageService.getToken();    
    console.log("Token---",this.token);
    console.log(this.token);


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    console.log(headers);
    
    const requestOptions = { headers: headers };

    return this.http.get<any[]>(url+"/orderss/orderList/"+ uId, requestOptions )
  }
 
  

  // upload(file: File): Observable<FileDetails> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);

  //   return this.httpClient.post<FileDetails>(`${this.basUrl}/simple-form-upload-mvc`, formData);
  // }
}
