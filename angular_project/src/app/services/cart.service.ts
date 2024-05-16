import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 
  cartItemListKey ='CART_ITEMS';
  productListKey ='CART_PRODUCTS';

  
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }


  updateProducts(cartItemListP : any[]){
    window.sessionStorage.setItem(this.cartItemListKey,JSON.stringify(cartItemListP));
    window.sessionStorage.setItem(this.productListKey,JSON.stringify(cartItemListP));
  }
  getProducts(){

    const storeProductList = window.sessionStorage.getItem(this.productListKey);
    const storeCartItemList = window.sessionStorage.getItem(this.cartItemListKey);

    if (storeProductList && storeCartItemList) {
      const pList :any[] = JSON.parse(storeProductList)
      const cList :any[] = JSON.parse(storeCartItemList)
    this.cartItemList = cList;
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    }

    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  
  
  findP = 0;

  addtoCart(product : any){

    product.products = product.id;

    const storeProductList = window.sessionStorage.getItem(this.productListKey);
    const storeCartItemList = window.sessionStorage.getItem(this.cartItemListKey);

    if (storeProductList && storeCartItemList) {
      
      const pList :any[] = JSON.parse(storeProductList)
      const cList :any[] = JSON.parse(storeCartItemList)
      this.findP =0;
      cList.forEach(element => {
        if(element.id===product.id){


          element.quantity+=product.quantity;
          element.total =  element.quantity *  element.unitPrice;
          this.findP =1;
        }
      });

      if( this.findP === 0){
        pList.push(product);
        cList.push(product);
      }

    this.cartItemList = cList;
    window.sessionStorage.setItem(this.cartItemListKey,JSON.stringify(this.cartItemList));
    window.sessionStorage.setItem(this.productListKey,JSON.stringify(pList));

    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)

    }else{

      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);

      window.sessionStorage.setItem(this.cartItemListKey,JSON.stringify(this.cartItemList));
      window.sessionStorage.setItem(this.productListKey,JSON.stringify(this.cartItemList));
      this.getTotalPrice();
      console.log(this.cartItemList)
    }

  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){

    const storeProductList = window.sessionStorage.getItem(this.productListKey);
    const storeCartItemList = window.sessionStorage.getItem(this.cartItemListKey);

    if (storeProductList && storeCartItemList) {
      const cList :any[] = JSON.parse(storeCartItemList)
    this.cartItemList = cList;
    }
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    window.sessionStorage.setItem(this.cartItemListKey,JSON.stringify(this.cartItemList));
    window.sessionStorage.setItem(this.productListKey,JSON.stringify(this.cartItemList));
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
