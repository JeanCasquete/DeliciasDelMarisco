import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, map, Observable } from 'rxjs';
import { EmpleadoService } from 'src/app/components/shared/empleado.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-adminempleado',
  templateUrl: './adminempleado.component.html',
  styleUrls: ['./adminempleado.component.css']
})
export class AdminempleadoComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email','tipo','actions'];

  adminform: FormGroup;
  users: any[] = []; // User es el tipo de dato que has importado.
  constructor(private formBuilder: FormBuilder, private empleadito: EmpleadoService) {
    this.adminform = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.empleadito.verificarempleado();
    this.empleadito.usersRef.snapshotChanges().pipe(map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )).subscribe(users => {
      this.users = users.filter(user => user.tipo != null);
    });

    
  
  }
   
  addempleado(){
    if (this.adminform.valid) {
      const email = this.adminform.value.email;
      const password = this.adminform.value.password;
      const username = this.adminform.value.name;
      this.empleadito.onSubmit(email,password, username);
  }
}
deleteUser(key: string) {
  this.empleadito.usersRef.remove(key);

}

getUsers() {
  this.empleadito.usersRef.snapshotChanges().pipe(map(changes =>
    changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  )).subscribe(users => {
    this.users = users.filter(user => user.tipo != null);
  });
}

}
