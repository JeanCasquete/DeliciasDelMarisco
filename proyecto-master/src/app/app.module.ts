import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {AngularFireModule} from '@angular/fire/compat'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { VisionComponent } from './vision/vision.component';
import { MenuComponent } from './menu/menu.component';
import { PromocionesComponent } from './promociones/promociones.component';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';
import { GaleriaComponent } from './galeria/galeria.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { PerfilesComponent } from './perfiles/perfiles.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    VisionComponent,
    MenuComponent,
    PromocionesComponent,
    RecuperacionComponent,
    GaleriaComponent,
    PerfilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    MatNativeDateModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
