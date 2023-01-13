import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComprasComponent } from './Administracion/admin-compras/admin-compras.component';
import { AdminclientComponent } from './Administracion/adminclient/adminclient.component';
import { AdminempleadoComponent } from './Administracion/adminempleado/adminempleado.component';
import { AdministracionComponent } from './Administracion/administracion/administracion.component';
import { MenuadminComponent } from './Administracion/menuadmin/menuadmin.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DashboardComponent } from './dashboard.component';
import { HistorialComponent } from './historial/historial.component';
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
    { path: 'administracion/empleados', component: AdminempleadoComponent },
    { path: 'prueba', component: PruebitasComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'menuempleado', component: MenuadminComponent },
    { path: 'historial', component: HistorialComponent },




  ]  
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
