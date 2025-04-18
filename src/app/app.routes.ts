// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
// import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
// import { LoginComponent } from './pages/login/login.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { HomeComponent } from './pages/home/home.component';
// import { CartComponent } from './pages/cart/cart.component';
// import { ProductsComponent } from './pages/products/products.component';
// import { BrandsComponent } from './pages/brands/brands.component';
// import { NotfoundComponent } from './pages/notfound/notfound.component';
// import { WishlistComponent } from './pages/wishlist/wishlist.component';
// import { CategoriesComponent } from './pages/categories/categories.component';
// import { DetailsComponent } from './pages/details/details.component';
// import { CheckoutComponent } from './pages/checkout/checkout.component';

// export const routes: Routes = [
//     {path:"",redirectTo:"home" , pathMatch:"full"},

//     {path:'', component:AuthLayoutComponent ,

//         children:[
//         {path:'login' , component:LoginComponent ,title:"Login"},
//         {path:'register' , component:RegisterComponent , title:"Register"},
//     ] },

//     {path:'', component:BlankLayoutComponent ,

//         children:[
//         {path:"home", component:HomeComponent , title:"Home"},
//         {path:"cart", component:CartComponent, title:"Cart"},
//         {path:"products", component:ProductsComponent , title:"Products"},
//         {path:"brands", component:BrandsComponent , title:"Brands"},
//         {path:"wishlist", component:WishlistComponent, title:"WishList"},
//         {path:"categories", component:CategoriesComponent , title:"Categories"},
//         {path:"details", component:DetailsComponent , title:"Details"},
//         {path:"checkout", component:CheckoutComponent, title:"CheckOut"},
//         {path:"**", component:NotfoundComponent, title:"NotFound"},
//     ] },

// ];

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./pages/forget-password/forget-password.component').then(
            (m) => m.ForgetPasswordComponent
          ),
        title: 'Forget Password',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'Details',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
        title: 'Checkout',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
        title: 'Wishlist',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'AllOrders',
      },
      { path: '**', component: NotfoundComponent },
    ],
  },
];
