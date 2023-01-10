import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AutenticacionService } from '../shared/autenticacion.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { AngularFireDatabase } from '@angular/fire/compat/database';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [
        animate(500, style({opacity: 0}))
      ])
    ])
  ]
})

export class LoginComponent implements OnInit {
   
  showContent1 = true;
  showContent2 = false;
  form: FormGroup;
  registerForm: FormGroup;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  ngOnInit(): void {
    
  }

  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar,private afAuth: AngularFireAuth,
    private Loginprd:AutenticacionService, private router: Router,private afDatabase: AngularFireDatabase) {
    this.form = this.fb.group({
      email:['',[Validators.required,Validators.pattern(this.emailPattern)]],
      password:['',[Validators.required]]
    });
    this.registerForm = this.fb.group({
      Nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]

    });
  }

  ingresar() {
    if (this.form.invalid) {
      return this.error('Llena los datos correctamente')
    } else {
      const email = this.form.value.email;
      const password = this.form.value.password;
      this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
        if (user && user.user) { // Comprobar si el objeto de usuario es null
          console.log(user);
          this.afDatabase.object<{username: string}>('users/' + user.user.uid).valueChanges().subscribe(userData => {
            if (userData) {
              console.log(userData.username); // Mostrar el nombre de usuario en la consola
              this.router.navigate(['/dashboard']);
            }
          });
        }
      }).catch((error) => {
        this.error(this.Loginprd.codeError(error.code));
      });
    }
  }

  
  async onSubmit() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const username = this.registerForm.value.Nombre;
  
    this.afAuth.createUserWithEmailAndPassword(email, password).then((result) => {
      if (result.user) {
        const userId = result.user.uid;
        this.afDatabase.object('users/' + userId).set({
          username: username
        });
  
        this.afDatabase.object<{username: string}>('users/' + userId).valueChanges().subscribe(user => {
          if (user) {
            console.log(user.username);
          }
        });
      }
    }).catch((error) => { 
      this.error(this.Loginprd.codeError(error.code));
      console.log(error);
    });
  }


  error(msj: string) {
    this._snackBar.open(msj, 'Ok', {
      duration:5000,
      horizontalPosition:'center',
      verticalPosition:'bottom',

    }) 
  }




}
