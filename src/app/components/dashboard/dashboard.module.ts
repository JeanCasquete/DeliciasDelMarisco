import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AppModule } from 'src/app/app.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { Productos2Component } from './productos2/productos2.component';
import { AdminclientComponent } from './Administracion/adminclient/adminclient.component';
import { AdminComprasComponent } from './Administracion/admin-compras/admin-compras.component';
import { FooterComponent } from './footer/footer.component';
import { PruebitasComponent } from './pruebitas/pruebitas.component';




@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    ProductosComponent,
    CarritoComponent,
    Productos2Component,
    AdminclientComponent,
    AdminComprasComponent,
    FooterComponent,
    PruebitasComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
    
  ]
})
export class DashboardModule { }
