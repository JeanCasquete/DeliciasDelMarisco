import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from 'src/app/components/shared/empleado.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactForm!: FormGroup;
  isLogged = false;
  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth, private empleadito: EmpleadoService ) 
  {     
  }


  ngOnInit() {
    this.getLogueo();
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }



  getLogueo() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        console.log("estas logueado")
        this.isLogged = true;
           
      } else {
        console.log("no estas logueado")
      }
    });
  }


}