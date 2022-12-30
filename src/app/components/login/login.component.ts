import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AutenticacionService } from '../shared/autenticacion.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   
  form: FormGroup;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    
  }

  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar,private afAuth: AngularFireAuth,
    private Loginprd:AutenticacionService, private router: Router) {
    this.form = this.fb.group({
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      password:['',[Validators.required]]
    });
  }

  ingresar() {
    if(this.form.invalid) {
      return this.error('Llena los datos correctamente')
    }else{
      const email = this.form.value.email;
      const password = this.form.value.password;
      this.afAuth.signInWithEmailAndPassword(email,password).then((user)=>{
        console.log(user);
        this.router.navigate(['dashboard'])

      }).catch((error)=> {
        this.error(this.Loginprd.codeError(error.code));
        
      })
    }
  }

  error(msj: string) {
    this._snackBar.open(msj, 'Ok', {
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'bottom',

    }) 
  }


}
