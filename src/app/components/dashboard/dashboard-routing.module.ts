import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductosComponent } from './productos/productos.component';
import { Productos2Component } from './productos2/productos2.component';
import { PruebaComponent } from './prueba/prueba.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'productos2', component: Productos2Component },
    { path: 'prueba', component: PruebaComponent },

  ]  
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
