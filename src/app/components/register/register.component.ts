
import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {MatSnackBar} from '@angular/material/snack-bar';
import { AutenticacionService } from '../shared/autenticacion.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth,private afDatabase: AngularFireDatabase) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  async onSubmit() {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const username = this.registerForm.value.username;
  
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
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
    } catch (error) {
      // Maneja cualquier error aquí
    }
  }
}
