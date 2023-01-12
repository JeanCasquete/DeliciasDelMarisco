import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComprasComponent } from './Administracion/admin-compras/admin-compras.component';
import { AdminclientComponent } from './Administracion/adminclient/adminclient.component';
import { AdminempleadoComponent } from './Administracion/adminempleado/adminempleado.component';
import { MenuadminComponent } from './Administracion/menuadmin/menuadmin.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ProductosComponent } from './productos/productos.component';
import { Productos2Component } from './productos2/productos2.component';
import { PruebitasComponent } from './pruebitas/pruebitas.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'administracion/productos', component: Productos2Component },
    { path: 'administracion/pedidos', component: AdminComprasComponent },
    { path: 'administracion/clientes', component: AdminclientComponent },
    { path: 'prueba', component: PruebitasComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'empleados', component: AdminempleadoComponent },
    { path: 'menuempleado', component: MenuadminComponent },



  ]  
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
