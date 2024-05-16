import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AddproductComponent } from './components/product/addproduct/addproduct.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AddProductsComponent } from './components/product/add-products/add-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductImageComponent } from './components/product/add-product-image/add-product-image.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { UserDashboardComponent } from './components/dashboards/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddproductComponent,
    EditProductComponent,
    ListProductComponent,
    CartComponent,
    HomeComponent,
    AddProductsComponent,
    AddProductImageComponent,
    LoginComponent,
    SignUpComponent,
    UserDashboardComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
