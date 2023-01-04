import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {AngularFireAuth} from '@angular/fire/compat/auth';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase) {}

  ngOnInit(): void {

  }
}