import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from '../core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from '../core/auth/login/login.component';
import { RegisterComponent } from '../core/auth/register/register.component';
import { HomeComponent } from '../core/features/home/home.component';
import { CartComponent } from '../core/features/cart/cart.component';
import { ProductsComponent } from '../core/features/products/products.component';
import { BrandsComponent } from '../core/features/brands/brands.component';
import { CategoriesComponent } from '../core/features/categories/categories.component';
import { DetailsComponent } from '../core/features/details/details.component';
import { CheckoutComponent } from '../core/features/checkout/checkout.component';
import { NotfoundComponent } from '../core/features/notfound/notfound.component';
import { authGuard } from '../core/guards/auth-guard';
import { isLoggedGuard } from '../core/guards/is-logged-guard';

export const routes: Routes = [
    { 
        path:'' ,redirectTo:"home",pathMatch:'full'
    },
    {
        path:'' ,
        component:AuthLayoutComponent,
        canActivate:[isLoggedGuard],
        children :[
            {
                path:'login' ,component:LoginComponent ,title:'login Page'
            },
            {
                path:'register' ,component:RegisterComponent ,title:'register Page'
            }
        ]
    },
    {
        path:'' ,
        component:BlankLayoutComponent,
        canActivate:[authGuard],
        children :[
            {
                path:'home' ,component:HomeComponent ,title:'home Page' 
            },
            {
                path:'cart' ,component:CartComponent ,title:'cart Page'
            },
            {
                path:'products' ,component:ProductsComponent ,title:'products Page'
            },
            {
                path:'brands' ,component:BrandsComponent ,title:'brands Page'
            },
            {
                path:'categories' ,component:CategoriesComponent ,title:'categories Page'
            },
            {
                path:'details/:slug/:id' ,component:DetailsComponent ,title:'details Page'
            },
            {
                path:'details/:id' ,component:DetailsComponent ,title:'details Page'
            },
            {
                path:'checkout' ,component:CheckoutComponent ,title:'chekout Page'
            }
        ]
    },
    {
        path:'**' ,component:NotfoundComponent , title:'notfound Page'
    }
];
