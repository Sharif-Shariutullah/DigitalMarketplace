import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product';


const url = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ProductAPIService {




  constructor(private http : HttpClient) { }

  getProduct(){
    return this.http.get<Product[]>(url+"/products/productsWithImage")
  }

  createProduct(data: Product){
    return this.http.post(url+'/products', data)
  }

  postProductImage(id : number, data:FormData){
    return this.http.post(url+"/products/productImage/"+id,data)
  }


  getProductCategories(){
    return this.http.get<any[]>(url+"/productCategorys");
  }

  // upload(file: File): Observable<FileDetails> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);

  //   return this.httpClient.post<FileDetails>(`${this.basUrl}/simple-form-upload-mvc`, formData);
  // }
}
