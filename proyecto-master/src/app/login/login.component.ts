import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AutenticacionService } from 'src/app/shared/autenticacion.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    this.myForm=this.createMyForms()
  }
  public myForm!:FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   constructor(private fb:FormBuilder,
    private afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    private loginprd: AutenticacionService,
    private router:Router) {}

  private createMyForms():FormGroup {
    return this.fb.group({
      password:['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]]
    });
  }

  public enviarform() {
    if(this.myForm.invalid)
    {
     return alert('Llena todos los datos');
    }else {
      const email = this.myForm.value.email;
      const password = this.myForm.value.password;
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Éxito
        console.log(user);
        this.router.navigate(['/menu']);

      })
      .catch((error) => {
        // Error
        this.errorExiste(this.loginprd.codeError(error.code))
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
