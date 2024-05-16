import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { AddProductsComponent } from './components/product/add-products/add-products.component';
import { AddProductImageComponent } from './components/product/add-product-image/add-product-image.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { UserDashboardComponent } from './components/dashboards/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/dashboards/admin-dashboard/admin-dashboard.component';

const routes: Routes = [  
{path:'', redirectTo:'home',pathMatch:'full'},
{path:'home', component: HomeComponent},
{path:'cart', component: CartComponent},
{path:'product', component: ListProductComponent},
{path:'addProduct', component: AddProductsComponent},
{path:'addProductImage', component: AddProductImageComponent},
{path:'login', component: LoginComponent},
{path:'signup', component: SignUpComponent},
{path:'userDasboard', component: UserDashboardComponent},
{path:'adminDasboard', component: AdminDashboardComponent},

{path:'**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
