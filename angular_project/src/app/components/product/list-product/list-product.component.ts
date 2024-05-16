import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/interface/cart';
import { Product } from 'src/app/interface/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductAPIService } from 'src/app/services/product-api.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit{

  productList!: Product[];
  product!: Product;


  constructor(private productApi: ProductAPIService, private cartService : CartService){}
  ngOnInit(): void {
    this.getProducts();
  }
  viewProduct(data: Product){
    this.product = data;
    console.log(this.product);
    
  }

  getProducts(){
    this.productApi.getProduct().subscribe({
      next:res =>{
        this.productList = res;
        console.log(this.productList);
        
      }
    })
  }

  qt:number = 1;

  setQt(text: string){
    if(this.qt>=1){
      if(text=='add'){
        this.qt+=1;
      }else{
        this.qt-=1;
      }
    }
  }
  cartItem!: Cart;

  // cartProduct: any[] = [{}];
  addtocart(item: any, qty:number){

  //  this.cartProduct.push(item);
  //  console.log('Cart size: ', this.cartProduct.length);
  //  this.cartProduct.forEach(element => {
  //   console.log(element.productName);
    
  //  });
  this.cartItem = item;
  this.cartItem.quantity = this.qt;
  this.cartItem.total = (this.qt*this.cartItem.unitPrice);
  this.cartItem.product_id =  this.cartItem.id;

  console.log('cart item--', this.cartItem );
  


    this.cartService.addtoCart(this.cartItem);



    alert("A new I item added to your Cart.")
  }
}
