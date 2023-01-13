import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { EmpleadoService } from 'src/app/components/shared/empleado.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private empleadito: EmpleadoService) {}

  ngOnInit(): void {

  }


}