
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AutenticacionService } from 'src/app/shared/autenticacion.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public myForm!:FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  ngOnInit(): void {
    this.myForm=this.createMyForms();
  }
   constructor(private fb:FormBuilder,
    private afAuth:AngularFireAuth,
    private router:Router,
    private _snackBar: MatSnackBar,
    private registeprd: AutenticacionService) {}
  private createMyForms():FormGroup {
    return this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      date1:['',[Validators.required]],
      date2:['',[Validators.required]],
      password:['',[Validators.required]],
      password2:['',[Validators.required]]

    });

  }

  public enviarform() {
     if(this.myForm.invalid) 
     {
        return this.errorExiste('Llena todos los datos')
     } else 
     {
      const email = this.myForm.value.email;
      const password = this.myForm.value.password;
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Éxito
        console.log(user)
        this.router.navigate(['/login']);

      })
      .catch((error) => {
        // Error
        this.errorExiste(this.registeprd.codeError(error.code))
      });
     } 
     }

     errorExiste(mensaje:string) {
      this._snackBar.open(mensaje, 'OK', {
        duration:5000,
        horizontalPosition:'center',
        verticalPosition:'bottom',
        panelClass: ['blue-snackbar']
  
  
      }) 
    }
  }

