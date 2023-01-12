import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaleriaComponent } from './galeria/galeria.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';
import { RegistroComponent } from './registro/registro.component';
import { VisionComponent } from './vision/vision.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'recuperacion', component: RecuperacionComponent},
  {path: 'vision', component: VisionComponent},
  {path: 'promociones', component: PromocionesComponent},
  {path: 'galeria', component: GaleriaComponent},
  {path: 'perfiles', component: PerfilesComponent},
  {path: '**', redirectTo: 'login',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
