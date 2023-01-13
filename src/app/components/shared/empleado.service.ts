import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import {User} from '../dashboard/Administracion/adminempleado/empleado';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  public dataUser!: User;
  usersRef: AngularFireList<User>;
  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase,
    private router: Router) {
    this.usersRef = afDatabase.list('users');
  }


  async onSubmit(email: string, password: string, username: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (result.user) {
        const userId = result.user.uid;

        this.afDatabase.object('users/' + userId).set({
          username: username,
          email: email,
          tipo: 'empleado'
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.afDatabase.object<User>('users/' + user.uid).valueChanges().subscribe(data => {
          if (data && data.tipo) {
            this.dataUser = data;
          } else {
            this.router.navigate(['./login'])
          }
        });
      } else {
        this.router.navigate(['./login'])
      }
    });
  }

  getAllUsers() {
    return this.usersRef.snapshotChanges().pipe(
        map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
    );
}

isLoggedIn(): boolean {
  return this.afAuth.currentUser !== null;
}
getLogueo() {
  this.afAuth.currentUser.then(user => {
    if (user) {
      console.log("estas logueado")
         
    } else {
      console.log("no estas logueado")
    }
  });
}


verificarempleado() {
  this.afAuth.onAuthStateChanged((user) => {
    if (user  ) {
    this.afDatabase.object<{ tipo: string }>('users/' + user.uid).valueChanges().subscribe(userData => {
      if(userData && userData.tipo )
      {
        console.log(userData.tipo);
     }else{
       this.router.navigate(["/dashboard"])

     }
    });

    } else {
      this.router.navigate(["/dashboard"])
    }
  });
}


}
