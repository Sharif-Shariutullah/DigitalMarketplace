import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/auth/services/storage.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal !: number;
  public subTotal !: number;

  public isLogedIn = false;

  public tax : number= 0.05;

  public shipping : number = 0.1;

  constructor(private fb: FormBuilder, 
    private cartService : CartService, 
    private orderService : OrderService,
    private storageService: StorageService,
    private router: Router) { }
  orderForm!: FormGroup;  

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.subTotal = this.cartService.getTotalPrice();
      this.grandTotal = (this.subTotal + (this.subTotal*this.tax) + (this.subTotal*this.shipping));
    })


    this.orderForm = this.fb.group({  
      totalPrice: 0,
      lastName: '',
      firstName:'',
      orderAddress1: '',
      orderAddress2: '',
      tax: 0,
      shipping: 0,
      orderCity: '',
      orderState: '',
      zip: '',
      houseNo: '',
      userAdderss: false,
      phone: '',
      email: '',
      totalProductAmount: 0,
      user: 0,
      orderDetails: []  
    }); 
  }

  getTotalPrice() {
    this.subTotal = 0;
    this.products.map((a:any)=>{
      this.subTotal += a.total;
    })
    this.grandTotal = (this.subTotal + (this.subTotal*this.tax) + (this.subTotal*this.shipping));
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
    this.getTotalPrice();
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

  setQt(text: string, id: number){
      if(text=='add'){

        this.products.forEach((e: any) => {
          console.log(e);
          if(e.id == id){
            e.quantity +=1;

            e.total = (e.quantity * e.unitPrice);
          }
        });
        this.cartService.updateProducts(this.products);

        this.getTotalPrice();
      }else{

        this.products.forEach((e: any) => {
          console.log(e);
          if(e.id == id){
            e.quantity -=1;
            e.total = (e.quantity * e.unitPrice);

          }
        });
        this.cartService.updateProducts(this.products);

        this.getTotalPrice();

      }
  }




  postOrder(){

    console.log(this.products);
    
    this.orderForm.value.totalPrice = this.grandTotal;
    this.orderForm.value.tax = this.subTotal* this.tax;
    this.orderForm.value.shipping = this.subTotal* this.shipping;
    this.orderForm.value.totalProductAmount = this.products.length;
    this.orderForm.value.orderDetails = this.products;


    this.isLogedIn = this.storageService.isLoggedIn();


    const user = this.storageService.getUser();
    this.orderForm.value.user = user.user_name;
    console.log('----this.products----',this.products);

    console.log('----order----',this.orderForm.value);


    if(this.isLogedIn){
      this.orderService.createOrder(this.orderForm.value).subscribe({
        next:res=>{
          alert("Order Submited..")
          this.ngOnInit();
        },
        error:console.log
      })
    }else{
      alert("Please Login or SignUp first..")
        this.router.navigateByUrl('/login');
    }


    
  }

}
